import { useEffect, useRef, useState } from "react";
import { animClass } from "./animClass";
import {
  AnimationOptions,
  AnimationConfigs,
  AnimationType,
  AnimatedActionOptions,
  UseAnimResult,
} from "./types";
import getConfigs from "./getConfigs";
import isCustomAnimation from "./isCustomAnimation";
import getTime from "./getTime";

export function useAnim<
  TActions extends { [key: string]: (...args: any[]) => void }
>(
  actions: TActions,
  options:
    | AnimationType
    | AnimationType[]
    | AnimatedActionOptions<any, TActions>
): [string, TActions];

export function useAnim<TActions, TKey = any>(
  actionFactory: (key: TKey) => TActions,
  options:
    | AnimationType
    | AnimationType[]
    | AnimatedActionOptions<TKey, TActions>
): UseAnimResult<TKey, TActions>;

export function useAnim(...args: any[]): any {
  const options =
    Array.isArray(args[1]) ||
    typeof args[1] === "string" ||
    isCustomAnimation(args[1])
      ? { default: args[1] }
      : args[1];
  if (typeof args[0] === "function") {
    return useAnimFactory(args[0], options);
  }
  const [getClass, getActions] = useAnimFactory(() => args[0], options);
  return [getClass(null), getActions(null)];
}

function useAnimFactory<TActions, TKey = any>(
  actionFactory: (key: TKey) => TActions,
  configs: AnimatedActionOptions<TKey, TActions>
): UseAnimResult<TKey, TActions> {
  const rerender = useState<any>()[1];
  const customAnimationCallbackRef = useRef<() => void>(undefined);
  const activeRef =
    useRef<{ key: TKey; options: AnimationOptions; done: boolean }>();

  function getClass(key: TKey) {
    const init = configs["of"];
    const initClass = init
      ? animClass(getConfigs(typeof init === "function" ? init(key) : init))
      : "";
    const contextClass =
      activeRef.current && activeRef.current.key === key
        ? animClass(activeRef.current.options)
        : "";
    return initClass && contextClass
      ? contextClass + " " + initClass
      : contextClass || initClass;
  }

  function getActions(key: TKey) {
    const hasKey = !!arguments.length;
    const entries = Object.entries(actionFactory(key));
    const result: TActions = {} as any;
    entries.forEach(([name, action]) => {
      result[name] = function (...args: any[]) {
        // prevent multiple animations trigger at once
        if (activeRef.current && !activeRef.current.done) {
          return;
        }

        // execute action immediately
        // no animation applied
        if (!hasKey) {
          return action(...args);
        }

        const options: AnimationConfigs = {
          ...(configs["default"] ? getConfigs(configs["default"]) : null),
          ...(configs[name] ? getConfigs(configs[name]) : null),
        };
        activeRef.current = { options, done: false, key };
        // show animation
        rerender({});
        // execute custom animation types
        const customAnimations = new Set<Function>();
        if (Array.isArray(options.type)) {
          options.type.forEach(
            (t) =>
              typeof t === "object" &&
              typeof t.run === "function" &&
              customAnimations.add(t.run)
          );
        } else if (
          typeof options.type === "object" &&
          typeof options.type.run === "function"
        ) {
          customAnimations.add(options.type.run);
        }
        const time = getTime(options.speed) - 10;
        customAnimationCallbackRef.current = () => {
          customAnimations.forEach((x) => x(time, options));
        };
        setTimeout(() => {
          action(...args);
          activeRef.current.done = true;
        }, time);
      };
    });
    return result;
  }

  useEffect(() => {
    if (customAnimationCallbackRef.current) {
      const callback = customAnimationCallbackRef.current;
      customAnimationCallbackRef.current = undefined;
      callback();
    }
  });

  return [getClass, getActions];
}
