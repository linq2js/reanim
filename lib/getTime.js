"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTime(speed) {
    if (speed === void 0) { speed = "fast"; }
    return speed === "fast"
        ? 800
        : speed === "faster"
            ? 500
            : speed === "slow"
                ? 2000
                : 3000;
}
exports.default = getTime;
