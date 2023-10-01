// Upload and download image from Supabase Storage using netlify/functions/supabase-upload.js:
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
    return { error: error.message };
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

// Get image from Supabase Storage
export async function getImageFromSupabase(path) {
  const data = await callNetlifyUploadFunction('getImageFromSupabase', {
    path,
  });
  return data;
}
