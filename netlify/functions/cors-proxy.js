/* eslint-env node */
import axios from 'axios';

// Cors proxy function is called from the React app simply by passing the url
// i.e. /.netlify/functions/cors-proxy?url=https://www.google.com
export async function handler(event) {
  const url = event.queryStringParameters.url;
  const contentType = event.queryStringParameters.contentType;

  if (!url) {
    return {
      statusCode: 400,
      body: 'url parameter is required',
    };
  }

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

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
