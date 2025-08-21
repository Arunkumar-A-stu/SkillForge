const axios = require('axios');

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'judge0-ce.p.rapidapi.com';
const BASE_URL = `https://${RAPIDAPI_HOST}/submissions`;

const submitCodeToJudge0 = async (source_code, language_id) => {
  try {
    const response = await axios.post(
      `${BASE_URL}?base64_encoded=false&wait=true`,
      { source_code, language_id },
      {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      status: response.data.status.description, // e.g., "Accepted", "Compilation Error"
      stdout: response.data.stdout,
      stderr: response.data.stderr,
    };
  } catch (error) {
    console.error('Judge0 Error:', error.response?.data || error.message);
    throw new Error('Failed to execute code');
  }
};

module.exports = { submitCodeToJudge0 };
