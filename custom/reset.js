"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reset = void 0;
var createCustomAnimation_1 = require("./createCustomAnimation");
exports.Reset = createCustomAnimation_1.default(function (_a) {
    var elements = _a.elements;
    setTimeout(function () {
        elements.forEach(function (element) {
            element.classList.add("reanim__reset");
            void element.offsetWidth;
            element.classList.remove("reanim__reset");
        });
    });
});
