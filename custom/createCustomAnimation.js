"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createCustomAnimation(run) {
    var classes = [];
    return {
        class: function () {
            var klass = "c" + Math.random().toString(36).substr(2);
            classes.push("." + klass);
            return klass;
        },
        run: function (duration, configs) {
            var elements;
            var copyOfClasses = classes.slice();
            var context = {
                duration: duration,
                configs: configs,
                classes: copyOfClasses,
                get elements() {
                    if (!elements) {
                        elements = [].slice.call(document.querySelectorAll(copyOfClasses.join(",")));
                    }
                    return elements;
                },
            };
            classes.length = 0;
            return run(context);
        },
    };
}
exports.default = createCustomAnimation;
