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

export { strToKey, toLowerCaseArray, capitalizeFirstLetters };
