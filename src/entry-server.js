// Run the following SSR using
// npx vite build --ssr
// node src/entry-server.js
import { createServer } from 'http';
import { renderToString } from 'react-dom/server';
// import Status from './features/order/Status';

const server = createServer((req, res) => {
  if (req.url === '/order/status/') {
    const markup = renderToString('Test');
    res.end(`<!DOCTYPE html><html><body>${markup}</body></html>`);
  } else {
    // Handle other routes or serve other files
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
