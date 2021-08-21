"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isCustomAnimation(options) {
    return typeof options === "object" && typeof options["class"] === "function";
}
exports.default = isCustomAnimation;
