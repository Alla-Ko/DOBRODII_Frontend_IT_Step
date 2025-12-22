import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { REQUEST_ORIGIN } from './app/core/tokens/request-origin.token';
registerLocaleData(localeUk);
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const apiProxy = createProxyMiddleware({
  target: 'https://api-dobrodiy.kn314-uz.keenetic.pro/api',
  changeOrigin: true,
  secure: false,
  pathRewrite: path => {
    const newPath = path.replace(/^\/api/, '/api');

    return newPath;
  },
}) as unknown as import('http-proxy-middleware').RequestHandler;

app.use('/api', apiProxy);


app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);


app.use('/**', (req, res, next) => {
  const origin = `${req.protocol}://${req.get('host')}`;
  angularApp
    .handle(req, {
      providers: [
        { provide: REQUEST_ORIGIN, useValue: origin }, 
      ],
    })
    .then(response =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});


if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
