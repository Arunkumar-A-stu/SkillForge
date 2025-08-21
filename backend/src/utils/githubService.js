const axios = require('axios');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const BASE_URL = 'https://api.github.com';

const createRepo = async (repoName) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/repos`,
      { name: repoName, private: false },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    return {
      repoName: response.data.name,
      githubUrl: `https://github.com/${githubUsername}/${repoName}`,
    };
  } catch (error) {
    console.error('GitHub Repo Error:', error.response?.data || error.message);
    throw new Error('Failed to create GitHub repository');
  }
};

const listUserRepos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    return response.data.map((repo) => ({
      repoName: repo.name,
      githubUrl: repo.html_url,
    }));
  } catch (error) {
    console.error('GitHub List Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch user repositories');
  }
};

module.exports = { createRepo, listUserRepos };
