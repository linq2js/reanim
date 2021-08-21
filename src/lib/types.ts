export type AnimationType =
  | CustomAnimationType
  | "bounce"
  | "flash"
  | "pulse"
  | "rubberBand"
  | "shakeX"
  | "shakeY"
  | "headShake"
  | "swing"
  | "tada"
  | "wobble"
  | "jello"
  | "heartBeat"
  | "backInDown"
  | "backInLeft"
  | "backInRight"
  | "backInUp"
  | "backOutDown"
  | "backOutLeft"
  | "backOutRight"
  | "backOutUp"
  | "bounceIn"
  | "bounceInDown"
  | "bounceInLeft"
  | "bounceInRight"
  | "bounceInUp"
  | "bounceOut"
  | "bounceOutLeft"
  | "bounceOutRight"
  | "bounceOutDown"
  | "bounceOutUp"
  | "fadeIn"
  | "fadeInDown"
  | "fadeInDownBig"
  | "fadeInLeft"
  | "fadeInLeftBig"
  | "fadeInRight"
  | "fadeInRightBig"
  | "fadeInUp"
  | "fadeInUpBig"
  | "fadeInTopLeft"
  | "fadeInTopRight"
  | "fadeInBottomLeft"
  | "fadeInBottomRight"
  | "fadeOut"
  | "fadeOutDown"
  | "fadeOutDownBig"
  | "fadeOutLeft"
  | "fadeOutLeftBig"
  | "fadeOutRight"
  | "fadeOutRightBig"
  | "fadeOutUp"
  | "fadeOutUpBig"
  | "fadeOutTopLeft"
  | "fadeOutTopRight"
  | "fadeOutBottomLeft"
  | "fadeOutBottomRight"
  | "flip"
  | "flipInX"
  | "flipInY"
  | "flipOutX"
  | "flipOutY"
  | "lightSpeedInRight"
  | "lightSpeedInLeft"
  | "lightSpeedOutLeft"
  | "lightSpeedOutRight"
  | "rotateIn"
  | "rotateInDownLeft"
  | "rotateInDownRight"
  | "rotateInUpRight"
  | "rotateInUpLeft"
  | "rotateOut"
  | "rotateOutDownLeft"
  | "rotateOutDownRight"
  | "rotateOutUpLeft"
  | "rotateOutUpRight"
  | "hinge"
  | "jackInTheBox"
  | "rollIn"
  | "rollOut"
  | "zoomIn"
  | "zoomDown"
  | "zoomLeft"
  | "zoomRight"
  | "zoomUp"
  | "zoomOut"
  | "zoomOutDown"
  | "zoomOutLeft"
  | "zoomOutRight"
  | "zoomOutUp"
  | "slideInDown"
  | "slideInLeft"
  | "slideInRight"
  | "slideInUp"
  | "slideOutDown"
  | "slideOutLeft"
  | "slideOutRight"
  | "slideOutUp";

export type CustomAnimationType = {
  class: (configs?: AnimationConfigs) => string;
  run?(duration?: number, configs?: AnimationConfigs): void;
};

export type AnimationSpeed = "slow" | "slower" | "fast" | "faster";
export type AnimationDelay = 2 | 3 | 4 | 5;
export type AnimationRepeat = 1 | 2 | 3 | "infinite";
export type AnimationConfigs = {
  type: AnimationType | AnimationType[];
  // delay in second
  delay?: AnimationDelay;
  speed?: AnimationSpeed;
  repeat?: AnimationRepeat;
  data?: any;
};
export type AnimationOptions =
  | AnimationType
  | AnimationType[]
  | AnimationConfigs;

export type AnimatedActionOptions<TKey, TActions> =
  | {
      [key in keyof TActions]?: AnimationOptions;
    }
  | {
      default?: AnimationOptions;
      of?: AnimationOptions | ((key?: TKey) => AnimationOptions);
    };

export type UseAnimResult<TKey, TActions> = [
  (key: TKey) => string,
  (key?: TKey) => TActions
];
