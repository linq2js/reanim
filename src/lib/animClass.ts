import { AnimationOptions, AnimationConfigs } from "./types";
import getConfigs from "./getConfigs";
import addPrefix from "./addPrefix";

export function animClass(options: AnimationOptions) {
  const configs = getConfigs(options);
  const { type, delay, speed, repeat } = configs;
  return [
    "animate__animated",
    typeof type === "string"
      ? addPrefix(type)
      : Array.isArray(type)
      ? type
          .map((x) => (typeof x === "object" ? x.class(configs) : addPrefix(x)))
          .join(" ")
      : typeof type === "object"
      ? type.class()
      : "",
    delay && `animate__delay-${delay}s`,
    speed && `animate__${speed}`,
    repeat && `animate__${repeat === "infinite" ? repeat : "repeat-" + repeat}`,
  ].reduce(
    (classes, value) => (value ? classes + " " + value : classes),
    ""
  ) as string;
}

export function animClasses(...options: AnimationOptions[]) {
  return options.map(animClass);
}
