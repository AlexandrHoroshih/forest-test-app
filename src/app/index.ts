import { h, spec } from "forest";

import { Routes } from "pages";
import { withPush } from "pages/history-bind";

export const App = () => {
  h("div", () => {
    h("nav", () => {
      h("ul", () => {
        h("li", () => {
          h("a", () => {
            spec({
              attr: {
                href: "/",
              },
              text: "Main",
            });

            withPush({ params: { to: "/" } });
          });
        });

        h("li", () => {
          h("a", () => {
            spec({
              attr: {
                href: "/about",
              },
              text: "About",
            });

            withPush({ params: { to: "/about" } });
          });
        });
      });
    });
    Routes();
  });
};
