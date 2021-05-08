import { h, spec } from "forest";

export const MainPage = () => {
  h("h1", { text: "Main page" });
  h("h2", () => {
    spec({
      text: "Based on razzle, works with SSR",
    });
  });
};
