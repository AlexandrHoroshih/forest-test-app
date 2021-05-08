// Client code
import { using } from "forest";

import { App } from "./app";

console.log("Client code loaded");

using(document.body, {
  fn: App,
  hydrate: true,
});

if (module.hot) {
  module.hot.accept();
}
