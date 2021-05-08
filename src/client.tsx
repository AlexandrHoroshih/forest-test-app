import { using } from "forest";
import { fork, hydrate } from "effector";
import { App } from "./app";

import { root } from "shared/root";

// @ts-expect-error
const values = window.SCOPE_DATA ? window.SCOPE_DATA : {};

hydrate(root, { values });

const scope = fork(root);

using(document.body, {
  fn: App,
  hydrate: true,
  scope,
});

if (module.hot) {
  module.hot.accept();
}
