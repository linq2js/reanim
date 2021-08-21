import { AnimationType, AnimatedActionOptions, UseAnimResult } from "./types";
export declare function useAnim<TActions extends {
    [key: string]: (...args: any[]) => void;
}>(actions: TActions, options: AnimationType | AnimationType[] | AnimatedActionOptions<any, TActions>): [string, TActions];
export declare function useAnim<TActions, TKey = any>(actionFactory: (key: TKey) => TActions, options: AnimationType | AnimationType[] | AnimatedActionOptions<TKey, TActions>): UseAnimResult<TKey, TActions>;
