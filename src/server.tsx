import express from "express";
import { createMemoryHistory } from "history";
import { fork, serialize, launch } from "effector";
import { renderStatic } from "forest/server";

import { attachHistory } from "pages/history-bind";
import { root } from "shared/root";
import { App } from "./app";

let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css
          .map((asset) => `<link rel="stylesheet" href="${asset}">`)
          .join("")
      : ""
    : "";
};

const jsScriptTagsFromAssets = (assets, entrypoint, extra = "") => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js
          .map((asset) => `<script src="${asset}"${extra}></script>`)
          .join("")
      : ""
    : "";
};

export const renderApp = async (
  req: express.Request,
  res: express.Response
) => {
  const context: any = {};

  // for test we will hardcode initial entry
  const history = createMemoryHistory({ initialEntries: ["/about"] });
  const scope = fork(root);
  launch(attachHistory, {
    //@ts-expect-error
    params: history,
    forkPage: scope,
  });
  const markup = await renderStatic({ scope, fn: App });

  if (context.url) {
    return { redirect: context.url };
  } else {
    const html =
      // prettier-ignore
      `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Forest app</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${cssLinksFromAssets(assets, 'client')}
    </head>
    <body>
        ${markup}
        ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
        <script>
          window.SCOPE_DATA = ${JSON.stringify(serialize(scope))}
        </script>
    </body>
  </html>`;

    return { html };
  }
};

const server = express()
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get("/*", async (req: express.Request, res: express.Response) => {
    const { html = "", redirect = false } = await renderApp(req, res);
    if (redirect) {
      res.redirect(redirect);
    } else {
      res.send(html);
    }
  });

export default server;
