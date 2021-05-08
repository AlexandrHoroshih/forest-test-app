import { h, spec, val } from "forest";

import { $count, up } from "./model";

export const ClickCounter = () => {
  h("button", () => {
    spec({
      handler: {
        click: up.prepend(() => {}),
      },
      text: val`Click to count! Current count: ${$count}`,
    });
  });
};
