import { variant, h } from "forest";
import { $location } from "./history-bind";
import { MainPage } from "pages/main";
import { AboutPage } from "pages/about";

export const Routes = () => {
  const $pathname = $location.map((l) => l.pathname);

  variant({
    source: $pathname,
    key: null,
    cases: {
      "/": MainPage,
      "/about": AboutPage,
    },
  });
};
