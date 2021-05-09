import type { History, Location, Action, To, State } from "history";
import type { Event, Domain, Store } from "effector";
import { scopeBind, sample, createEvent } from "effector";

export type ToParams<S extends State = State> = { to: To; state?: S };
export type HistoryUpdate = { action: Action; location: Location };
export type Clocks<S extends State> = {
  push: Event<ToParams<S>>;
  replace: Event<ToParams<S>>;
  go: Event<number>;
  back: Event<unknown>;
  forward: Event<unknown>;
};

type Config<S extends State = State> = {
  historySource: Store<History<S> | null>;
  clocks: Clocks<S>;
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

  historySource.updates.watch((history) => {
    // Hacky way to support both in and out of scope listeners
    let listener = (P: any) => console.warn("History listener is not set");

    try {
      listener = scopeBind(target);
    } catch (e) {
      listener = target;
    }

    if (!checkHistory<S>(history)) return;

    listener({ location: history.location, action: history.action });
    history.listen(listener);
  });

  // push
  const historyPushed = sample({
    source: historySource,
    clock: clocks.push,
    fn: (history, params) => {
      console.log(history);

      return { history, params };
    },
  });

  historyPushed.watch(
    ({ history, params }) =>
      checkHistory(history) && history.push(params.to, params.state)
  );

  // replace
  const historyReplaced = sample({
    source: historySource,
    clock: clocks.replace,
    fn: (history, params) => ({ history, params }),
  });

  historyReplaced.watch(
    ({ history, params }) =>
      checkHistory(history) && history.replace(params.to, params.state)
  );

  // go
  const historyGo = sample({
    source: historySource,
    clock: clocks.go,
    fn: (history, params) => ({ history, params }),
  });

  historyGo.watch(
    ({ history, params }) => checkHistory(history) && history.go(params)
  );

  // back
  const historyBack = sample({
    source: historySource,
    clock: clocks.back,
  });

  historyBack.watch((history) => checkHistory(history) && history.back());

  // forward
  const historyForward = sample({
    source: historySource,
    clock: clocks.forward,
  });

  historyForward.watch((history) => checkHistory(history) && history.forward());
};
