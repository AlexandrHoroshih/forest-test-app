import { h, spec } from "forest";
import { css } from "@linaria/core";

const myClass = css`
  color: red;
`;

export const MainPage = () => {
  h("h1", {
    text: "Main page",
    attr: {
      class: myClass,
    },
  });
  h("h2", () => {
    spec({
      text: "Based on razzle, works with SSR",
    });
  });
};
