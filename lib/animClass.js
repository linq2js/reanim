"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animClasses = exports.animClass = void 0;
var getConfigs_1 = require("./getConfigs");
var addPrefix_1 = require("./addPrefix");
function animClass(options) {
    var configs = getConfigs_1.default(options);
    var type = configs.type, delay = configs.delay, speed = configs.speed, repeat = configs.repeat;
    return [
        "animate__animated",
        typeof type === "string"
            ? addPrefix_1.default(type)
            : Array.isArray(type)
                ? type
                    .map(function (x) { return (typeof x === "object" ? x.class(configs) : addPrefix_1.default(x)); })
                    .join(" ")
                : typeof type === "object"
                    ? type.class()
                    : "",
        delay && "animate__delay-" + delay + "s",
        speed && "animate__" + speed,
        repeat && "animate__" + (repeat === "infinite" ? repeat : "repeat-" + repeat),
    ].reduce(function (classes, value) { return (value ? classes + " " + value : classes); }, "");
}
exports.animClass = animClass;
function animClasses() {
    var options = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        options[_i] = arguments[_i];
    }
    return options.map(animClass);
}
exports.animClasses = animClasses;
