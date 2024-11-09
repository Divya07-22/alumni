import express from 'express';
import { Pinecone } from '@pinecone-database/pinecone';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

const indexName = 'alumni-student-index';
const model = 'multilingual-e5-large';

try {
    await pc.createIndex({
        name: indexName,
        dimension: 1024, // Replace with your model dimensions
        metric: 'cosine', // Replace with your model metric
        spec: {
            serverless: {
                cloud: 'aws',
                region: 'us-east-1'
            }
        }
    });
} catch {
    // noop
}

const index = pc.index(indexName);

// Enhanced profile structures with more relevant fields
const createProfileText = (profile) => {
    return `${profile.name} is a ${profile.profession} with ${profile.yearsExperience} years of experience. 
    Their expertise includes ${profile.skills.join(', ')}. 
    They specialize in ${profile.specialization} 
    and have experience in ${profile.industryExperience.join(', ')}. 
    ${profile.type === 'alumni' ? `They can mentor in: ${profile.mentoringTopics.join(', ')}` :
            `They are interested in: ${profile.careerInterests.join(', ')}`}`;
};

// Function to load profiles from JSON files
const loadProfiles = (filePath) => {
    try {
        const fileContent = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading profiles from ${filePath}:`, error);
        return [];
    }
};

// Create embeddings for profiles
const createProfileEmbeddings = async (profiles) => {
    try {
        const profileTexts = profiles.map(profile => createProfileText(profile));

        const embeddings = await pc.inference.embed(
            model,
            profileTexts,
            { inputType: 'passage', truncate: 'END' }
        );

        return profiles.map((profile, i) => ({
            id: profile.id,
            values: embeddings[i].values,
            metadata: {
                name: profile.name,
                type: profile.type,
                profession: profile.profession,
                skills: profile.skills,
                yearsExperience: profile.yearsExperience,
                specialization: profile.specialization,
                industryExperience: profile.industryExperience,
                ...(profile.type === 'alumni' ? {
                    mentoringTopics: profile.mentoringTopics,
                    availabilityHours: profile.availabilityHours
                } : {
                    careerInterests: profile.careerInterests,
                    graduationYear: profile.graduationYear
                })
            }
        }));
    } catch (error) {
        console.error('Error creating profile embeddings:', error);
        throw error;
    }
};

// Store profiles in Pinecone
const storeProfiles = async () => {
    try {
        const studentProfiles = loadProfiles('./data/studentProfiles.json');
        const alumniProfiles = loadProfiles('./data/alumniProfiles.json');

        const studentVectors = await createProfileEmbeddings(studentProfiles);
        const alumniVectors = await createProfileEmbeddings(alumniProfiles);

        // Store profiles in separate namespaces
        await index.namespace('students').upsert(studentVectors);
        await index.namespace('alumni').upsert(alumniVectors);

        console.log('Successfully stored profiles in Pinecone');
    } catch (error) {
        console.error('Error storing profiles:', error);
    }
};

// API Endpoints

// Match students with alumni based on career interests and expertise
app.post('/api/match/student-to-alumni', async (req, res) => {
    const { studentProfile, topK = 5 } = req.body;

    try {
        const queryText = createProfileText(studentProfile);
        const embedding = await pc.inference.embed(model, [queryText], { inputType: 'query' });

        const queryResponse = await index.namespace('alumni').query({
            topK,
            vector: embedding[0].values,
            includeMetadata: true,
            filter: {
                mentoringTopics: {
                    $in: studentProfile.careerInterests
                }
            }
        });

        res.json({ matches: queryResponse.matches });
    } catch (error) {
        console.error('Error matching student to alumni:', error);
        res.status(500).json({ message: 'Failed to find matching alumni' });
    }
});

// Match alumni with students based on mentoring interests
app.post('/api/match/alumni-to-students', async (req, res) => {
    const { alumniProfile, topK = 5 } = req.body;

    try {
        const queryText = createProfileText(alumniProfile);
        const embedding = await pc.inference.embed(model, [queryText], { inputType: 'query' });

        const queryResponse = await index.namespace('students').query({
            topK,
            vector: embedding[0].values,
            includeMetadata: true,
            filter: {
                careerInterests: {
                    $in: alumniProfile.mentoringTopics
                }
            }
        });

        res.json({ matches: queryResponse.matches });
    } catch (error) {
        console.error('Error matching alumni to students:', error);
        res.status(500).json({ message: 'Failed to find matching students' });
    }
});

// Search profiles by skills or interests
app.post('/api/search/profiles', async (req, res) => {
    const { searchQuery, profileType, topK = 10 } = req.body;

    try {
        const embedding = await pc.inference.embed(model, [searchQuery], { inputType: 'query' });

        const queryResponse = await index.namespace(profileType).query({
            topK,
            vector: embedding[0].values,
            includeMetadata: true
        });

        res.json({ matches: queryResponse.matches });
    } catch (error) {
        console.error('Error searching profiles:', error);
        res.status(500).json({ message: 'Failed to search profiles' });
    }
});

// Initialize the server
const initializeServer = async () => {
    try {
        await storeProfiles();

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Alumni-Student Connection Platform running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize server:', error);
        process.exit(1);
    }
};

initializeServer();