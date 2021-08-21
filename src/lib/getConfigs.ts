import isCustomAnimation from "./isCustomAnimation";
import { AnimationConfigs, AnimationOptions, AnimationType } from "./types";

export default function getConfigs(
  options: AnimationOptions
): AnimationConfigs {
  if (
    typeof options === "string" ||
    Array.isArray(options) ||
    isCustomAnimation(options)
  ) {
    return { type: options as AnimationType };
  }

  return options as AnimationConfigs;
}
