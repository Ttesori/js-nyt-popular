const apiKey = process.env.API_KEY;

exports.handler = async (event) => {

  const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: data
    }),
  };
};