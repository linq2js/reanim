import { AnimationOptions } from "./types";

export default function isCustomAnimation(options: AnimationOptions): boolean {
  return typeof options === "object" && typeof options["class"] === "function";
}
