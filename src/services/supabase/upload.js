import supabase from './supabase';
import { blobToFile, fetchImageBlob } from '../../utils/common';
import settings from '../../utils/settings';
import { v4 as uuidv4 } from 'uuid';

export async function fetchAndUploadImage(imageUrl) {
  // Get development or production proxy
  const corsProxy = settings.mode.isDevelopment
    ? settings.corsProxy.local
    : settings.corsProxy.remote;
  // Add proxy to image url
  imageUrl = `${corsProxy}${imageUrl}`;
  // fetch image blob
  const blob = await fetchImageBlob(imageUrl);
  // convert blob to file
  const file = blobToFile(blob);
  // upload image to Supabase Storage
  return await uploadImageToSupabase(file);
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
export async function getImageFromSupabase() {
  const path = `public/test-manual.png`;
  const { data, error } = await supabase.storage
    .from('pizza-images')
    .download(path);

  if (error) {
    throw error;
  }

  const url = URL.createObjectURL(data);
  return url;
}