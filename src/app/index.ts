import { h, spec } from "forest";

import { Routes } from "pages";

export const App = () => {
  h("div", () => {
    Routes();
  });
};
