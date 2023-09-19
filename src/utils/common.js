function strToKey(str) {
  return str.replace(/\s+/g, '-').toLowerCase();
}

function toLowerCaseArray(arr) {
  return arr.map((item) => String(item).toLowerCase());
}

function capitalizeFirstLetters(str) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

async function fetchImageBlob(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch the image');
  }

  return await response.blob();
}

function blobToFile(blob, fileName = 'temp-name.png') {
  return new File([blob], fileName, { type: 'image/png' });
}

export {
  strToKey,
  toLowerCaseArray,
  capitalizeFirstLetters,
  fetchImageBlob,
  blobToFile,
};
