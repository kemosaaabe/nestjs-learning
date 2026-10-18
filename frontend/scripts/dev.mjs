import { createServer } from 'vite';

const server = await createServer({
  server: {
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: process.env.API_URL || 'http://127.0.0.1:3000',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});

await server.listen();
server.printUrls();
