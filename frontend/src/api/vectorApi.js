export const findMatchingAlumni = async (studentData) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/vector/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    return response.json();
  };
  