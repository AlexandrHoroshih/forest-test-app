import type { History, Location } from "history";
import type { HistoryUpdate } from "shared/lib/effector-history-wrap";
import {
  wrapHistory,
  createHistoryClocks,
} from "shared/lib/effector-history-wrap";
import { root } from "shared/root";

export const attachHistory = root.createEvent<History>();
export const historyUpdated = root.createEvent<HistoryUpdate>();

export const $location = root
  .createStore<Location | { pathname: "" }>({ pathname: "" })
  .on(historyUpdated, (_, update) => update.location);

const clocks = createHistoryClocks(root);

export const { push, replace, go, back, forward } = clocks;

wrapHistory({
  historySource: attachHistory,
  clocks,
  target: historyUpdated,
});
