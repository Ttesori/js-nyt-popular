const axios = require('axios');
const url = `https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=${process.env.API_KEY}`;
const handler = async (event) => {
  try {
    const { data } = await axios.get(url)
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    const [status, statusText, headers, data] = error.response;
    return {
      status,
      body: JSON.stringify(status, statusText, headers, data)
    }
  }
}

module.exports = { handler }