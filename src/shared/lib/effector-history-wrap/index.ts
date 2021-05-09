import type { History, Location, Action, To, State } from "history";
import type { Event, Domain, Store } from "effector";
import { scopeBind, sample, createEvent } from "effector";

export type ToParams<S extends State = State> = { to: To; state?: S };
export type HistoryUpdate = { action: Action; location: Location };

type Config<S extends State = State> = {
  historySource: Event<History<S> | null> | Store<History<S> | null>;
  clocks?: {
    push?: Event<ToParams<S>>;
    replace?: Event<ToParams<S>>;
    go?: Event<number>;
    back?: Event<unknown>;
    forward?: Event<unknown>;
  };
  target: Event<HistoryUpdate>;
};

const checkHistory = <S extends State>(
  history?: History<S>
): history is History<S> => {
  const historyProvided = Boolean(history);

  if (!historyProvided) {
    console.warn("No history was provided");
  }

  return historyProvided;
};

export const createHistoryClocks = (domain?: Domain) => {
  if (domain) {
    return {
      push: domain.createEvent<ToParams>(),
      replace: domain.createEvent<ToParams>(),
      go: domain.createEvent<number>(),
      back: domain.createEvent<unknown>(),
      forward: domain.createEvent<unknown>(),
    };
  }

  return {
    push: createEvent<ToParams>(),
    replace: createEvent<ToParams>(),
    go: createEvent<number>(),
    back: createEvent<unknown>(),
    forward: createEvent<unknown>(),
  };
};

export const wrapHistory = <S extends State = State>(config: Config<S>) => {
  const { historySource, clocks, target } = config;

  historySource.watch((history) => {
    const listener = scopeBind(target);

    if (!checkHistory<S>(history)) return;

    listener({ location: history.location, action: history.action });
    history.listen(listener);
  });

  if (clocks.push) {
    sample({
      source: historySource,
      clock: clocks.push,
      fn: (history, params) => ({ history, params }),
    }).watch(
      ({ history, params }) =>
        checkHistory(history) && history.push(params.to, params.state)
    );
  }

  if (clocks.replace) {
    sample({
      source: historySource,
      clock: clocks.replace,
      fn: (history, params) => ({ history, params }),
    }).watch(
      ({ history, params }) =>
        checkHistory(history) && history.replace(params.to, params.state)
    );
  }

  if (clocks.go) {
    sample({
      source: historySource,
      clock: clocks.go,
      fn: (history, params) => ({ history, params }),
    }).watch(
      ({ history, params }) => checkHistory(history) && history.go(params)
    );
  }

  if (clocks.back) {
    sample({
      source: historySource,
      clock: clocks.back,
    }).watch((history) => checkHistory(history) && history.back());
  }

  if (clocks.forward) {
    sample({
      source: historySource,
      clock: clocks.forward,
    }).watch((history) => checkHistory(history) && history.forward());
  }
};
