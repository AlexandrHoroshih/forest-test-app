import { createDomain } from "effector";

export const root = createDomain();

if (process.env.NODE_ENV !== "production") {
  import("effector-logger/attach").then(({ attachLogger }) => {
    attachLogger(root);
  });
}
