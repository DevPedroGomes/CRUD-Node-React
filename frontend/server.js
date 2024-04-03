import express from 'express';
import { createServer } from 'vite';
import { resolve } from 'path';

async function createApp() {
  const app = express();

  if (process.env.NODE_ENV === 'production') {
    const vite = await createServer({
      server: { middlewareMode: 'ssr' },
    });
    app.use(vite.middlewares);
  } else {
    const vite = await createServer({
      server: { middlewareMode: 'development' },
    });
    app.use(vite.middlewares);
  }

  app.get('*', async (req, res) => {
    try {
      const templatePath = resolve(__dirname, 'index.html'); 
      const template = await vite.transformIndexHtml(req.url, templatePath);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  return app;
}

createApp().then(app => {
  const port = process.env.PORT || 3000; 
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
