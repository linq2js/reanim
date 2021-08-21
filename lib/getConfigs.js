"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isCustomAnimation_1 = require("./isCustomAnimation");
function getConfigs(options) {
    if (typeof options === "string" ||
        Array.isArray(options) ||
        isCustomAnimation_1.default(options)) {
        return { type: options };
    }
    return options;
}
exports.default = getConfigs;
