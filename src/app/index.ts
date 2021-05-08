import { h, spec } from "forest";

export const App = () => {
  h("h1", { text: "Welcome to `forest` app!" });
  h("h2", () => {
    spec({
      text: "Based on razzle, works with SSR",
    });
  });
};
