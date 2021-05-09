import { h, spec } from "forest";

import { Routes } from "pages";

export const App = () => {
  h("div", () => {
    h("nav", () => {
      h("ul", () => {
        h("li", () => {
          h("a", {
            attr: {
              href: "/",
            },
            text: "Main",
          });
        });

        h("li", () => {
          h("a", {
            attr: {
              href: "/about",
            },
            text: "about",
          });
        });
      });
    });
    Routes();
  });
};
