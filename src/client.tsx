import { using } from "forest";
import { createBrowserHistory } from "history";
import { fork, hydrate, launch } from "effector";
import { App } from "./app";

import { attachHistory } from "pages/history-bind";
import { root } from "shared/root";

const history = createBrowserHistory();

// @ts-expect-error
const values = window.SCOPE_DATA ? window.SCOPE_DATA : {};

hydrate(root, { values });

const scope = fork(root);

launch(attachHistory, {
  // @ts-expect-error
  params: history,
  forkPage: scope,
});

using(document.body, {
  fn: App,
  hydrate: true,
  scope,
});

if (module.hot) {
  module.hot.accept();
}
