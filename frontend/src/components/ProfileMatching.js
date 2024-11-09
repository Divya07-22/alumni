import axios from 'axios';
import React, { useState } from 'react';

const ProfileMatching = () => {
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState([]);

  const handleQueryChange = (e) => setQuery(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/match', { query });
      setMatches(response.data.matches);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  return (
    <div>
      <h2>Profile Matching</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Describe your profile"
        />
        <button type="submit">Find Matches</button>
      </form>

      {matches.length > 0 ? (
        <div>
          <h3>Matching Profiles</h3>
          {matches.map((match, index) => (
            <div key={index}>
              <p><strong>Name:</strong> {match.metadata.name}</p>
              <p><strong>Profession:</strong> {match.metadata.profession}</p>
              <p><strong>Skills:</strong> {match.metadata.skills}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default ProfileMatching;
