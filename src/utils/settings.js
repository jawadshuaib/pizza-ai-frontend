export const mode = {
  isDevelopment: localStorage.getItem('isDevelopment') === 'true' ?? true,
};

export const corsProxy = {
  local: 'https://cors-anywhere.herokuapp.com/',
  remote: '/.netlify/functions/cors-proxy',
};

export const info = {
  name: 'Pizza AI',
  description: 'A pizza ordering app powered by AI',
  email: 'jawad.php@gmail.com',
  url: 'https://pizza-ai.netlify.app/',
};
export default {
  mode,
  corsProxy,
};
