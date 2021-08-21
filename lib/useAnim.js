"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAnim = void 0;
var react_1 = require("react");
var animClass_1 = require("./animClass");
var getConfigs_1 = require("./getConfigs");
var isCustomAnimation_1 = require("./isCustomAnimation");
var getTime_1 = require("./getTime");
function useAnim() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var options = Array.isArray(args[1]) ||
        typeof args[1] === "string" ||
        isCustomAnimation_1.default(args[1])
        ? { default: args[1] }
        : args[1];
    if (typeof args[0] === "function") {
        return useAnimFactory(args[0], options);
    }
    var _a = useAnimFactory(function () { return args[0]; }, options), getClass = _a[0], getActions = _a[1];
    return [getClass(null), getActions(null)];
}
exports.useAnim = useAnim;
function useAnimFactory(actionFactory, configs) {
    var rerender = react_1.useState()[1];
    var customAnimationCallbackRef = react_1.useRef(undefined);
    var activeRef = react_1.useRef();
    function getClass(key) {
        var init = configs["of"];
        var initClass = init
            ? animClass_1.animClass(getConfigs_1.default(typeof init === "function" ? init(key) : init))
            : "";
        var contextClass = activeRef.current && activeRef.current.key === key
            ? animClass_1.animClass(activeRef.current.options)
            : "";
        return initClass && contextClass
            ? contextClass + " " + initClass
            : contextClass || initClass;
    }
    function getActions(key) {
        var hasKey = !!arguments.length;
        var entries = Object.entries(actionFactory(key));
        var result = {};
        entries.forEach(function (_a) {
            var name = _a[0], action = _a[1];
            result[name] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                // prevent multiple animations trigger at once
                if (activeRef.current && !activeRef.current.done) {
                    return;
                }
                // execute action immediately
                // no animation applied
                if (!hasKey) {
                    return action.apply(void 0, args);
                }
                var options = __assign(__assign({}, (configs["default"] ? getConfigs_1.default(configs["default"]) : null)), (configs[name] ? getConfigs_1.default(configs[name]) : null));
                activeRef.current = { options: options, done: false, key: key };
                // show animation
                rerender({});
                // execute custom animation types
                var customAnimations = new Set();
                if (Array.isArray(options.type)) {
                    options.type.forEach(function (t) {
                        return typeof t === "object" &&
                            typeof t.run === "function" &&
                            customAnimations.add(t.run);
                    });
                }
                else if (typeof options.type === "object" &&
                    typeof options.type.run === "function") {
                    customAnimations.add(options.type.run);
                }
                var time = getTime_1.default(options.speed) - 10;
                customAnimationCallbackRef.current = function () {
                    customAnimations.forEach(function (x) { return x(time, options); });
                };
                setTimeout(function () {
                    action.apply(void 0, args);
                    activeRef.current.done = true;
                }, time);
            };
        });
        return result;
    }
    react_1.useEffect(function () {
        if (customAnimationCallbackRef.current) {
            var callback = customAnimationCallbackRef.current;
            customAnimationCallbackRef.current = undefined;
            callback();
        }
    });
    return [getClass, getActions];
}
