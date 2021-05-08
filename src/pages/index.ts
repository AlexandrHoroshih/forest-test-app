import { variant, h } from "forest";
import { $location } from "./history-bind";
import { MainPage } from "pages/main";
import { AboutPage } from "pages/about";

export const Routes = () =>
  variant({
    source: $location,
    key: "pathname",
    cases: {
      "/": MainPage,
      "/about": AboutPage,
      __: () => {
        h("div", { text: "Not found" });
      },
    },
  });
