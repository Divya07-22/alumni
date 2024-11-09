// controllers/vectorController.js
const axios = require('axios');
const vectorDbConfig = require('../config/vectorDbConfig');

exports.matchProfiles = async (req, res) => {
  try {
    const { studentProfile } = req.body;
    const response = await axios.post(
      `${vectorDbConfig.url}/match`,
      { profileData: studentProfile },
      { headers: { Authorization: `Bearer ${vectorDbConfig.apiKey}` } }
    );

    if (response.data.success) {
      res.status(200).json({ matches: response.data.matches });
    } else {
      res.status(500).json({ message: "No matches found" });
    }
  } catch (error) {
    console.error("Error in matchProfiles:", error.message);
    res.status(500).json({ message: "Failed to match profiles", error: error.message });
  }
};
