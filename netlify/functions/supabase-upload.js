/* eslint-env node */
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
// import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const { SUPABASE_URL, SUPABASE_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY must be provided');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// const corsProxy = '/.netlify/functions/cors-proxy?url=';

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

    let base64String, base64Data, buffer;
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
        result = await getImageFromSupabase(body.path);
        break;
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
