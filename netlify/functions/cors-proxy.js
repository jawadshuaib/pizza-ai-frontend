/* eslint-env node */
// const fetch = require('node-fetch');
import fetch from 'node-fetch';

export async function handler(event) {
  const url = event.queryStringParameters.url;
  const contentType = event.queryStringParameters.contentType;

  if (!url) {
    return {
      statusCode: 400,
      body: 'url parameter is required',
    };
  }
  // console.log('URL IS:' + url);
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType === undefined ? 'image/png' : contentType,
        'Access-Control-Allow-Origin': '*',
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error fetching content.',
    };
  }
}
