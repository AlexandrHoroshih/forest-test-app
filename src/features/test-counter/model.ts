import { root } from "shared/root";

export const up = root.createEvent();
export const $count = root.createStore(0).on(up, (s) => s + 1);
