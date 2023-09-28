/* eslint-env node */
import axios from 'axios';

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

// /* eslint-env node */
// import fetch from 'node-fetch';

// export async function handler(event) {
//   const url = event.queryStringParameters.url;
//   const contentType = event.queryStringParameters.contentType;

//   if (!url) {
//     return {
//       statusCode: 400,
//       body: 'url parameter is required',
//     };
//   }
//   // console.log('URL IS:' + url);
//   try {
//     const response = await fetch(url);
//     const arrayBuffer = await response.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     return {
//       statusCode: 200,
//       headers: {
//         'Content-Type': contentType === undefined ? 'image/png' : contentType,
//         'Access-Control-Allow-Origin': '*',
//       },
//       body: buffer.toString('base64'),
//       isBase64Encoded: true,
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: 'Error fetching content.',
//     };
//   }
// }
