// // // require('dotenv').config();
// // // const express = require('express');
// // // const vectorRoutes = require('./routes/vectorRoutes');
// // import { Pinecone } from '@pinecone-database/pinecone';
// // import 'dotenv/config'

// // const pc = new Pinecone({
// //     apiKey: process.env.PINECONE_API_KEY
// // });

// // const indexName = 'quickstart';

// // // await pc.createIndex({
// // //     name: indexName,
// // //     dimension: 1024, // Replace with your model dimensions
// // //     metric: 'cosine', // Replace with your model metric
// // //     spec: {
// // //         serverless: {
// // //             cloud: 'aws',
// // //             region: 'us-east-1'
// // //         }
// // //     }
// // // });

// // const model = 'multilingual-e5-large';

// // const data = [
// //     { id: 'vec1', text: 'Apple is a popular fruit known for its sweetness and crisp texture.' },
// //     { id: 'vec2', text: 'The tech company Apple is known for its innovative products like the iPhone.' },
// //     { id: 'vec3', text: 'Many people enjoy eating apples as a healthy snack.' },
// //     { id: 'vec4', text: 'Apple Inc. has revolutionized the tech industry with its sleek designs and user-friendly interfaces.' },
// //     { id: 'vec5', text: 'An apple a day keeps the doctor away, as the saying goes.' },
// //     { id: 'vec6', text: 'Apple Computer Company was founded on April 1, 1976, by Steve Jobs, Steve Wozniak, and Ronald Wayne as a partnership.' }
// // ];

// // const embeddings = await pc.inference.embed(
// //     model,
// //     data.map(d => d.text),
// //     { inputType: 'passage', truncate: 'END' }
// // );

// // console.log(embeddings[0]);

// // const index = pc.index(indexName);

// // const vectors = data.map((d, i) => ({
// //     id: d.id,
// //     values: embeddings[i].values,
// //     metadata: { text: d.text }
// // }));

// // await index.namespace('ns1').upsert(vectors);

// // const stats = await index.describeIndexStats();

// // console.log(stats)

// // const query = [
// //     'Tell me about the tech company known as Apple.',
// // ];

// // const embedding = await pc.inference.embed(
// //     model,
// //     query,
// //     { inputType: 'query' }
// // );

// // const queryResponse = await index.namespace("ns1").query({
// //     topK: 3,
// //     vector: embedding[0].values,
// //     includeValues: false,
// //     includeMetadata: true
// //   });
  
// //   console.log(queryResponse);

// // // const app = express();

// // // // Middleware to parse JSON request bodies
// // // app.use(express.json());

// // // // Route handler for vector database-related operations
// // // app.use('/api/vector', vectorRoutes);

// // // // Start the server on the specified port
// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => {
// // //     console.log(`Server running on port ${PORT}`);
// // // });

// import express from 'express';
// import { Pinecone } from '@pinecone-database/pinecone';
// import 'dotenv/config';

// const app = express();
// const pc = new Pinecone({
//   apiKey: process.env.PINECONE_API_KEY
// });

// const indexName = 'profile-index'; // Name of the Pinecone index
// const model = 'multilingual-e5-large'; // Use an appropriate model for embeddings

// const index = pc.index(indexName);

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Sample data (this should be dynamically populated from your database in real applications)
// const studentProfiles = [
//   {
//     id: 'student1',
//     name: 'Alice',
//     profession: 'Software Engineer',
//     skills: 'JavaScript, Node.js, React, MongoDB',
//     text: 'Passionate about developing web applications with modern JavaScript frameworks like React.',
//   },
//   {
//     id: 'student2',
//     name: 'Bob',
//     profession: 'Data Scientist',
//     skills: 'Python, Machine Learning, Data Analysis, Pandas',
//     text: 'Experienced in building machine learning models and data pipelines using Python.',
//   },
//   // Add more student profiles here
// ];

// const alumniProfiles = [
//   {
//     id: 'alumni1',
//     name: 'Charlie',
//     profession: 'Product Manager',
//     skills: 'Agile, Product Strategy, Market Research, UX/UI Design',
//     text: 'I have a track record of successfully managing product lifecycles from concept to launch.',
//   },
//   {
//     id: 'alumni2',
//     name: 'David',
//     profession: 'Project Manager',
//     skills: 'Agile, Scrum, Risk Management, Leadership',
//     text: 'Skilled in managing teams and projects, ensuring timely delivery of high-quality products.',
//   },
//   // Add more alumni profiles here
// ];

// // Create embeddings for student profiles (done only once or when profiles change)
// const createProfileEmbeddings = async (profiles) => {
//   const embeddings = await pc.inference.embed(
//     model,
//     profiles.map((profile) => profile.text),
//     { inputType: 'passage', truncate: 'END' }
//   );

//   return profiles.map((profile, i) => ({
//     id: profile.id,
//     values: embeddings[i].values,
//     metadata: { name: profile.name, profession: profile.profession, skills: profile.skills },
//   }));
// };

// // Store student and alumni profile vectors in Pinecone
// const storeProfiles = async () => {
//   const studentVectors = await createProfileEmbeddings(studentProfiles);
//   const alumniVectors = await createProfileEmbeddings(alumniProfiles);

//   await index.namespace('profiles').upsert(studentVectors);
//   await index.namespace('profiles').upsert(alumniVectors);
// };

// // Match profiles based on a query
// app.post('/api/match', async (req, res) => {
//   const { query } = req.body;

//   try {
//     // Get embedding for the query (student or alumni profile description)
//     const embedding = await pc.inference.embed(model, [query], { inputType: 'query' });

//     // Query Pinecone for similar profiles
//     const queryResponse = await index.namespace('profiles').query({
//       topK: 3, // Number of top matches to return
//       vector: embedding[0].values,
//       includeValues: false,
//       includeMetadata: true,
//     });

//     res.json({ matches: queryResponse.matches });
//   } catch (error) {
//     console.error('Error matching profiles:', error);
//     res.status(500).json({ message: 'Failed to match profiles' });
//   }
// });

// // Initialize and store profiles when the server starts
// storeProfiles();

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Now you can use __dirname as usual

import express from 'express';
import { Pinecone } from '@pinecone-database/pinecone';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const app = express();
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const indexName = 'profile-index'; // Name of the Pinecone index
const model = 'multilingual-e5-large'; // Use an appropriate model for embeddings

const index = pc.index(indexName);

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample data can be replaced with loading from files (e.g., `studentProfile.json`, `alumniProfile.json`)
const loadProfiles = (filePath) => {
  try {
    const fileContent = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading profiles file:', error);
    return [];
  }
};

// Load student and alumni profiles from JSON files (replace these paths as necessary)
const studentProfiles = loadProfiles('./studentProfile.json');
const alumniProfiles = loadProfiles('./alumniProfile.json');

// Create embeddings for student and alumni profiles
// const createProfileEmbeddings = async (profiles) => {
//   const embeddings = await pc.inference.embed(
//     model,
//     profiles.map((profile) => profile.description), // Assuming profile has a `description` field
//     { inputType: 'passage', truncate: 'END' }
//   );

//   return profiles.map((profile, i) => ({
//     id: profile.id,
//     values: embeddings[i].values,
//     metadata: {
//       name: profile.name,
//       profession: profile.profession,
//       skills: profile.skills,
//     },
//   }));
// };
// const embeddings = await pc.inference.embed(
//     model,
//     data.map(d => d.text), // Ensure the data you pass here is valid
//     { inputType: 'passage', truncate: 'END' }
// );

// // Check if embeddings are being generated correctly
// if (!embeddings || embeddings.length === 0) {
//   console.error('Error: No embeddings generated.');
//   return;
// }
// Correct usage of `return` inside an async function
async function fetchEmbeddings() {
    try {
      const embeddings = await pc.inference.embed(model, data.map(d => d.text));
      console.log(embeddings);
      return embeddings;
    } catch (error) {
      console.error('Error fetching embeddings:', error);
    }
  }
  
  fetchEmbeddings();
  

// Store student and alumni profile vectors in Pinecone
const storeProfiles = async () => {
  const studentVectors = await createProfileEmbeddings(studentProfiles);
  const alumniVectors = await createProfileEmbeddings(alumniProfiles);

  await index.namespace('profiles').upsert(studentVectors);
  await index.namespace('profiles').upsert(alumniVectors);
};

// Match profiles based on a query
app.post('/api/match', async (req, res) => {
  const { query } = req.body;

  try {
    // Get embedding for the query (student or alumni profile description)
    const embedding = await pc.inference.embed(model, [query], { inputType: 'query' });

    // Query Pinecone for similar profiles
    const queryResponse = await index.namespace('profiles').query({
      topK: 3, // Number of top matches to return
      vector: embedding[0].values,
      includeValues: false,
      includeMetadata: true,
    });

    res.json({ matches: queryResponse.matches });
  } catch (error) {
    console.error('Error matching profiles:', error);
    res.status(500).json({ message: 'Failed to match profiles' });
  }
});

// Initialize and store profiles when the server starts
storeProfiles();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
