import React, { useState, useEffect } from 'react';
import { findMatchingAlumni } from '../api/vectorApi';

function StudentProfile() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await findMatchingAlumni({ studentVector: [0.1, 0.3, 0.5] });
      setMatches(response);
    };
    fetchMatches();
  }, []);

  return (
    <div>
      <h2>Student Profile</h2>
      <h3>Matching Alumni:</h3>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>{match.name} - Match Score: {match.score}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentProfile;
