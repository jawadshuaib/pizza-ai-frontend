const mode = {
  isDevelopment: true,
};

const corsProxy = {
  local: 'https://cors-anywhere.herokuapp.com/', //'http://localhost:3000?url=',
  remote: '/.netlify/functions/cors-proxy?url=',
};

export default {
  mode,
  corsProxy,
};
