"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addPrefix(className) {
    if (!className)
        return "";
    return "animate__" + className;
}
exports.default = addPrefix;
