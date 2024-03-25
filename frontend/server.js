import express from 'express';
import { createServer } from 'vite';
import { resolve } from 'path';

async function createApp() {
  const app = express();

  // Servir arquivos estáticos de build do Vite
  if (process.env.NODE_ENV === 'production') {
    const vite = await createServer({
      server: { middlewareMode: 'ssr' },
    });
    app.use(vite.middlewares);
  } else {
    // No ambiente de desenvolvimento, use o middleware de desenvolvimento do Vite
    const vite = await createServer({
      server: { middlewareMode: 'development' },
    });
    app.use(vite.middlewares);
  }

  // Define uma rota de fallback para lidar com as rotas da sua aplicação React
  app.get('*', async (req, res) => {
    try {
      const templatePath = resolve(__dirname, 'index.html'); // Caminho para o arquivo HTML principal da sua aplicação
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
  const port = process.env.PORT || 3000; // Porta padrão para o servidor Express
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
