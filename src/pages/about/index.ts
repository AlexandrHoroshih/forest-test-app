import { h, spec } from "forest";

export const AboutPage = () => {
  h("h1", { text: "About page" });
  h("h2", () => {
    spec({
      text: "Based on razzle, works with SSR",
    });
  });
};
