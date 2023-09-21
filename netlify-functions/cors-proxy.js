/* eslint-env node */
const fetch = require('node-fetch');

exports.handler = async function (event) {
  const imageUrl = event.queryStringParameters.url;

  if (!imageUrl) {
    return {
      statusCode: 400,
      body: 'url parameter is required',
    };
  }

  try {
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Access-Control-Allow-Origin': '*',
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error fetching image.',
    };
  }
};
