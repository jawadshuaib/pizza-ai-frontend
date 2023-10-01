import supabase from './supabase';
import { v4 as uuidv4 } from 'uuid';
import { fetchImageBlob, blobToBase64 } from '../../utils/common';
import { corsProxy } from '../../utils/settings';

async function callNetlifyUploadFunction(action, body) {
  try {
    const response = await fetch(
      `/.netlify/functions/supabase-upload/${action}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error calling Netlify function:', error);
    throw error;
  }
}

export async function fetchAndUploadImage(imageUrl) {
  // Add proxy to image url
  imageUrl = encodeURIComponent(imageUrl);
  imageUrl = `${corsProxy.local}${imageUrl}`;
  // fetch image blob
  const blob = await fetchImageBlob(imageUrl);
  // convert blob to file
  const base64 = await blobToBase64(blob);
  return await callNetlifyUploadFunction('fetchAndUploadImage', {
    file: base64,
  });
}

// Upload image to Supabase Storage
export async function uploadImageToSupabase(file) {
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
export async function getImageFromSupabase(path) {
  const { data, error } = await supabase.storage
    .from('pizza-images')
    .download(path);

  if (error) {
    throw error;
  }

  const url = URL.createObjectURL(data);
  return url;
}

// export async function fetchAndUploadImage(imageUrl) {
//   return await callNetlifyUploadFunction('fetchAndUploadImage', {
//     imageUrl,
//   });
// }

// export async function fetchAndUploadImage(imageUrl) {
//   // Get development or production proxy
//   // Add proxy to image url
//   const baseUrl = mode.isDevelopment ? corsProxy.local : corsProxy.remote;
//   imageUrl = encodeURIComponent(imageUrl);
//   imageUrl = `${baseUrl}${imageUrl}`;
//   // Fetch image blob
//   const blob = await fetchImageBlob(imageUrl);
//   // Convert to Base64 string so it can be passed to Netlify function
//   const base64 = await blobToBase64(blob);
//   return await callNetlifyUploadFunction('fetchAndUploadImage', {
//     file: base64,
//   });
// }

// Get image from Supabase Storage
// export async function getImageFromSupabase(path) {
//   const url = await callNetlifyUploadFunction('getImageFromSupabase', {
//     path,
//   });
//   console.log('REACT URL', url);
//   return url;
// }
