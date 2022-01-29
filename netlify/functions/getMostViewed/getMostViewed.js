
const apiKey = process.env.API_KEY;
const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`;

// import fetch from 'node-fetch';
const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  let response
  try {
    response = await fetch(url);
    console.log(response);
    // handle response
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response
    })
  }
}