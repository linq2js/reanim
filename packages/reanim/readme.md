# REANIM

React hooks for animate.css

## Installation

with NPM

```bash
npm i reanim --save
```

or YARN

```bash
yarn add reanim
```

### Install peer dependencies

```bash
npm i animate.css
```

## Getting Started

```jsx
import animate.css";
import { animClass } from "reanim";

function App() {
  return <div className={animClass("fadeIn")}></div>;
}
```

### Applying animation for list

```jsx
import "animate.css";
// import reanim custom aniamtion CSS classes
import "reanim/css/custom.css";
import { useAnim, animClass } from "reanim";
// import collapsible animation
import { Collapse } from "reanim/custom/collapsible";
import React, { useState } from "react";

const todoList = new Array(10)
  .fill(null)
  .map(() => "item-" + Math.random().toString(36).substr(2));

function App() {
  const [items, setItems] = useState(todoList);
  // useAnim returns tuple of [getClass, getActions]
  // destructing result
  const [classes, actions] = useAnim(
    (item) => ({
      // define list actions
      add: () => {
        setItems(items.concat("new-" + Math.random()));
      },
      remove: () => {
        setItems(items.filter((x) => x !== item));
      },
    }),
    {
      // define animation for remove action
      remove: {
        // specify animation type, can use multiple animations at once
        // fadeOut is predefined animation of animate.css
        // Collapse is custom animation of reanim
        type: ["fadeOut", Collapse],
        // specify speed of animation, faster means 500ms
        speed: "faster",
      },
      // initial animation for each item
      of: (key) => "slideInLeft",
    }
  );

  return (
    <div className={animClass("flipInX")}>
      <button onClick={actions().add}>Add</button>
      <ul>
        {items.map((item) => (
          <li
            className={classes(item)}
            onClick={actions(item).remove}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## API References

### useAnim()

- useAnim(actions, options) => [className, actions]

  Use single object animation

  - actions: object

    ```js
        { add: () => { /* do add */ }, remove: () => { /* do remove */ } }
    ```

  - options: object

    ```js
        { add: configsForAddAction, remove: configsForRemoveAction }
    ```

    **The action configs can be**

    - string: animation name
    - array: list animation name or custom animation
    - custom animation
    - object: animation configs

- useAnim((key) => actions, options) => [getClass, getActions]

  Use multiple objects animation
  getClass(key): a function that returns class of specified object key
  getActions(key): a function that returns actions of specified object key

### animClass(configs) => string

Generate animation class from specified configs

### animClasses(config1, config2, config3, ...) => [class1, class2, class3, ...]

Generate multiple animation class from specified config list

### Animation configs

The configs has following properties:

- type: animation name | custom animation | list animation name or custom animation
- speed: speed of animation, it must be "fast" | "faster" | "slow" | "slower"
- delay: a delay time before animation executing, it must be 2 | 3 | 4 | 5 (in second)
- repeat: animation repeat, it must be 1 | 2 | 3 | "infinite"
- data: it can be anything, it used to custom animation

### Animation List

- bounce
- flash
- pulse
- rubberBand
- shakeX
- shakeY
- headShake
- swing
- tada
- wobble
- jello
- heartBeat
- backInDown
- backInLeft
- backInRight
- backInUp
- backOutDown
- backOutLeft
- backOutRight
- backOutUp
- bounceIn
- bounceInDown
- bounceInLeft
- bounceInRight
- bounceInUp
- bounceOut
- bounceOutLeft
- bounceOutRight
- bounceOutDown
- bounceOutUp
- fadeIn
- fadeInDown
- fadeInDownBig
- fadeInLeft
- fadeInLeftBig
- fadeInRight
- fadeInRightBig
- fadeInUp
- fadeInUpBig
- fadeInTopLeft
- fadeInTopRight
- fadeInBottomLeft
- fadeInBottomRight
- fadeOut
- fadeOutDown
- fadeOutDownBig
- fadeOutLeft
- fadeOutLeftBig
- fadeOutRight
- fadeOutRightBig
- fadeOutUp
- fadeOutUpBig
- fadeOutTopLeft
- fadeOutTopRight
- fadeOutBottomLeft
- fadeOutBottomRight
- flip
- flipInX
- flipInY
- flipOutX
- flipOutY
- lightSpeedInRight
- lightSpeedInLeft
- lightSpeedOutLeft
- lightSpeedOutRight
- rotateIn
- rotateInDownLeft
- rotateInDownRight
- rotateInUpRight
- rotateInUpLeft
- rotateOut
- rotateOutDownLeft
- rotateOutDownRight
- rotateOutUpLeft
- rotateOutUpRight
- hinge
- jackInTheBox
- rollIn
- rollOut
- zoomIn
- zoomDown
- zoomLeft
- zoomRight
- zoomUp
- zoomOut
- zoomOutDown
- zoomOutLeft
- zoomOutRight
- zoomOutUp
- slideInDown
- slideInLeft
- slideInRight
- slideInUp
- slideOutDown
- slideOutLeft
- slideOutRight
- slideOutUp
