"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expand = exports.Collapse = void 0;
var createCustomAnimation_1 = require("./createCustomAnimation");
exports.Collapse = createCustomAnimation_1.default(function (_a) {
    var duration = _a.duration, elements = _a.elements;
    elements.forEach(function (element) {
        element.classList.remove("reanim__collapsible", "reanim__active");
        element.style.transitionDuration = duration + "ms";
        element.style.maxHeight = element.scrollHeight + "px";
        element.classList.add("reanim__collapsible");
    });
    setTimeout(function () {
        elements.forEach(function (element) {
            element.classList.add("reanim__active");
            element.style.maxHeight = 0 + "px";
        });
    });
});
exports.Expand = createCustomAnimation_1.default(function (_a) {
    var duration = _a.duration, elements = _a.elements;
    elements.forEach(function (element) {
        element.classList.remove("reanim__collapsible", "reanim__active");
        element.style.transitionDuration = duration + "ms";
        element.style.maxHeight = 0 + "px";
        element.classList.add("reanim__collapsible");
    });
    setTimeout(function () {
        elements.forEach(function (element) {
            element.classList.add("reanim__active");
            element.style.maxHeight = null;
        });
    });
});
