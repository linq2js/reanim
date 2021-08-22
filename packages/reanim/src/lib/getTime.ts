import { AnimationSpeed } from "./types";

export default function getTime(speed: AnimationSpeed = "fast") {
  return speed === "fast"
    ? 800
    : speed === "faster"
    ? 500
    : speed === "slow"
    ? 2000
    : 3000;
}
