import { useEffect, DependencyList } from "react";

type EffectCallback = () => void | (() => void);

export type CancelEffectFunction = () => void;

const useTimeoutEffect = (
  effect: EffectCallback,
  dependencies?: DependencyList,
  delay?: number
): CancelEffectFunction => {
  let timeoutId: NodeJS.Timeout | undefined;

  useEffect(() => {
    if (delay === undefined) {
      return effect();
    }

    timeoutId = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, dependencies);

  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
};

export default useTimeoutEffect;
