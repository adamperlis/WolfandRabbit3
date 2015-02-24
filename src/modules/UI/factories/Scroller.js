'use strict'

var Tweenable = require('shifty')

module.exports = function($window) {
    var animation = new Tweenable();

    this.getOffset = function(el) {
        var _x = 0;
        var _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft;
            _y += el.offsetTop;
            el = el.offsetParent;
        }
        return {
            top: _y,
            left: _x
        };
    }


    this.scroll = function(destination, duration, complete, offset) {

        if (typeof destination == "object") {
            destination = this.getOffset(destination).top;
        }

        var scroll = (function scroll() {
            animation.tween({
                from: {
                    y: $window.pageYOffset
                },
                to: {
                    y: destination + (offset || 0)
                },
                duration: duration || 750,
                easing: 'easeOutQuad',
                step: scroll,
                finish: complete || null
            });

            // Do the scroll
            window.scrollTo(0, animation.get().y);
        })();

    }
}