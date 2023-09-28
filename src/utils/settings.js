export const mode = {
  isDevelopment: localStorage.getItem('isDevelopment') === 'true' ?? true,
};

export const corsProxy = {
  local: 'https://cors-anywhere.herokuapp.com/',
  remote: '/.netlify/functions/cors-proxy?url=',
};

export const info = {
  name: 'Pizza AI',
  description: 'A pizza ordering app powered by AI',
  email: 'jawad.php@gmail.com',
  url: 'https://pizza-ai.netlify.app/',
  supabaseImagePath:
    import.meta.env.VITE_SUPABASE_URL +
    `/storage/v1/object/public/pizza-images`,
};

export default {
  mode,
  corsProxy,
};
