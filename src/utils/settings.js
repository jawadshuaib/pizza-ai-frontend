export const mode = {
  isDevelopment: localStorage.getItem('isDevelopment') === 'true' ?? true,
};

export const corsProxy = {
  local: 'https://cors-anywhere.herokuapp.com/',
  remote: '/.netlify/functions/cors-proxy',
};

export default {
  mode,
  corsProxy,
};
