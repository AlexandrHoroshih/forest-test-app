import { using } from "forest";
import { createBrowserHistory } from "history";
import { hydrate } from "effector";
import { App } from "./app";

import { attachHistory } from "pages/history-bind";
import { root } from "shared/root";

const history = createBrowserHistory();

// @ts-expect-error
const values = window.SCOPE_DATA ? window.SCOPE_DATA : {};

hydrate(root, { values });

const initClient = async () => {
  attachHistory(history);

  using(document.body, {
    fn: App,
    hydrate: true,
  });
};

initClient().catch(console.error);

if (module.hot) {
  module.hot.accept();
}
