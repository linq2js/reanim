import { AnimationConfigs, CustomAnimationType } from "../lib/types";

export interface RunContext {
  classes: string[];
  duration: number;
  configs: AnimationConfigs;
  elements: HTMLElement[];
}

export default function createCustomAnimation(
  run: (context: RunContext) => any
): CustomAnimationType {
  const classes: string[] = [];

  return {
    class() {
      const klass = "c" + Math.random().toString(36).substr(2);
      classes.push("." + klass);
      return klass;
    },
    run(duration, configs) {
      let elements;
      const copyOfClasses = classes.slice();
      const context: RunContext = {
        duration,
        configs,
        classes: copyOfClasses,
        get elements() {
          if (!elements) {
            elements = [].slice.call(
              document.querySelectorAll(copyOfClasses.join(","))
            );
          }
          return elements;
        },
      };
      classes.length = 0;
      return run(context);
    },
  };
}
