import { AnimationConfigs, CustomAnimationType } from "../lib/types";
export interface RunContext {
    classes: string[];
    duration: number;
    configs: AnimationConfigs;
    elements: HTMLElement[];
}
export default function createCustomAnimation(run: (context: RunContext) => any): CustomAnimationType;
