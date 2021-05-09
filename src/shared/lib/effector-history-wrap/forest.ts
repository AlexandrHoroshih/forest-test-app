import { spec } from "forest";
import { createEvent, forward } from "effector";
import type { State } from "history";
import type { Clocks, ToParams } from "./index";

export const createHistorySpecs = <S extends State = State>(
  clocks: Clocks<S>
) => {
  const withPush = (config: { params: ToParams<S>; on?: string }) => {
    const { params, on = "click" } = config;

    const innerPush = createEvent();

    forward({
      from: innerPush.map(() => params),
      to: clocks.push,
    });

    spec({
      handler: {
        on: {
          [on]: innerPush.prepend(() => {}),
        },
        config: {
          prevent: true,
        },
      },
    });
  };

  return {
    withPush,
  };
};
