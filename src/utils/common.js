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

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function isValidEmail(email) {
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailReg.test(email);
}
export {
  strToKey,
  toLowerCaseArray,
  capitalizeFirstLetters,
  fetchImageBlob,
  blobToBase64,
  isValidEmail,
};
