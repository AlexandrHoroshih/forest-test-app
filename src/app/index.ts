import { h, spec } from "forest";

import { ClickCounter } from "features/test-counter";

export const App = () => {
  h("h1", { text: "Welcome to `forest` app!" });
  h("h2", () => {
    spec({
      text: "Based on razzle, works with SSR",
    });
  });
  ClickCounter();
  ClickCounter();
  ClickCounter();
};
