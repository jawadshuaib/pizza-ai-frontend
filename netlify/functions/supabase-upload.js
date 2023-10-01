/* eslint-env node */
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
// import { handler as corsProxy } from './cors-proxy';
import dotenv from 'dotenv';
dotenv.config();

const { SUPABASE_URL, SUPABASE_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY must be provided');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const blobToFile = (blob, fileName = 'temp-name.png') => {
  return new File([blob], fileName, { type: 'image/png' });
};

// const fetchImageBlob = async (imageUrl) => {
//   const response = await fetch(imageUrl);
//   if (!response.ok)
//     throw new Error(`Failed to fetch the image: ${response.status}`);
//   return await response.blob();
// };

export async function handler(event) {
  try {
    const pathArray = event.path.split('/');
    const action = pathArray[pathArray.length - 1];
    let result;

    const body = JSON.parse(event.body || '{}');
    let base64String, base64Data;
    let base64, buffer, resp;
    switch (action) {
      case 'fetchAndUploadImage':
        base64String = body.file;
        if (!base64String) return { statusCode: 400, body: 'No file provided' };
        // Remove the Base64 prefix if exists
        base64Data = base64String.split(';base64,').pop();

        // Convert Base64 to Buffer
        buffer = Buffer.from(base64Data, 'base64');
        result = await fetchAndUploadImage(buffer);
        break;
      case 'getImageFromSupabase':
        buffer = await getImageFromSupabase(body.path); // assuming this returns a Blob

        // Convert Blob to Base64
        base64 = buffer.toString('base64');
        resp = {
          statusCode: 200,
          isBase64Encoded: true,
          headers: { 'Content-Type': 'image/png' },
          body: base64,
        };
        console.log('RESPONSE-getImageFromSupabase ', resp);
        return resp;
      default:
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Image upload action not found' }),
        };
    }

    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    console.error('Error in Netlify function:', error.message);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}

async function fetchAndUploadImage(blob) {
  // Convert blob to file
  const file = blobToFile(blob);
  // Upload image to Supabase Storage
  return await uploadImageToSupabase(file);
}

// async function fetchAndUploadImage(imageUrl) {
//   try {
//     // Encode image URL
//     const encodedUrl = encodeURIComponent(imageUrl);

//     // Call corsProxy
//     const response = await corsProxy({
//       queryStringParameters: { url: encodedUrl },
//     });

//     if (response.statusCode !== 200) {
//       throw new Error(`Error from corsProxy: ${response.body}`);
//     }

//     // Decode Base64 to Blob
//     const base64Content = response.body;
//     // const blob = base64ToBlob(base64Content);

//     // If you have a separate fetchImageBlob function, you might want to use it here
//     const blob = await fetchImageBlob(base64Content);

//     // Convert blob to file and upload to Supabase
//     const file = blobToFile(blob);
//     return await uploadImageToSupabase(file);
//   } catch (error) {
//     console.error('Error in fetchAndUploadImage:', error.message);
//     return { error: error.message };
//   }
// }

// function base64ToBlob(base64) {
//   const byteCharacters = atob(base64);
//   const byteArrays = [];

//   for (let offset = 0; offset < byteCharacters.length; offset += 512) {
//     const slice = byteCharacters.slice(offset, offset + 512);
//     const byteNumbers = new Array(slice.length);
//     for (let i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i);
//     }
//     const byteArray = new Uint8Array(byteNumbers);
//     byteArrays.push(byteArray);
//   }

//   const blob = new Blob(byteArrays, { type: 'image/png' }); // Adjust the MIME type if needed
//   return blob;
// }

// async function fetchAndUploadImage(imageUrl) {
//   try {
//     // Add proxy to image url
//     imageUrl = encodeURIComponent(imageUrl);
//     const response = await corsProxy({
//       queryStringParameters: { url: imageUrl },
//     });

//     console.log('CORS PROXY RESPONSE: ', response);

//     if (response.statusCode !== 200) {
//       // Handle error, maybe throw an error or return a response with error details.
//       throw new Error(`Error from corsProxy: ${response.body}`);
//     }

//     imageUrl = response.body;
//     // // fetch image blob
//     const blob = await fetchImageBlob(imageUrl);
//     // convert blob to file
//     const file = blobToFile(blob);
//     // upload image to Supabase Storage
//     return await uploadImageToSupabase(file);
//   } catch (error) {
//     console.error('Error in fetchAndUploadImage:', error.message);
//     return { error: error.message };
//   }
// }

// async function fetchAndUploadImage(blob) {
//   // Add proxy to image url
//   // imageUrl = encodeURIComponent(imageUrl);
//   // imageUrl = `${corsProxy}${imageUrl}`;
//   // // fetch image blob
//   // const blob = await fetchImageBlob(imageUrl);
//   // convert blob to file
//   const file = blobToFile(blob);
//   // upload image to Supabase Storage
//   return await uploadImageToSupabase(file);
// }

// Upload image to Supabase Storage
async function uploadImageToSupabase(file) {
  const path = `public/${uuidv4()}.png`;
  const { data, error } = await supabase.storage
    .from('pizza-images')
    .upload(path, file, {
      contentType: 'image/png',
    });

  if (error) {
    throw error;
  }

  return data;
}

// Get image from Supabase Storage
async function getImageFromSupabase(path) {
  const { data, error } = await supabase.storage
    .from('pizza-images')
    .download(path);

  if (error) {
    throw error;
  }

  const url = URL.createObjectURL(data);
  return url;
}
