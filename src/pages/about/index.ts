import { h, spec } from "forest";

export const AboutPage = () => {
  h("h3", { text: "hahaha" });
  h("h1", { text: "About page" });
  h("h2", () => {
    spec({
      text: "Based on razzle, works with SSR",
    });
  });
};
