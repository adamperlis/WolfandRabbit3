'use strict'

var resolution = function() {

    if ( ! watchers) var watchers = [];

    var watchResolution = (function watchResolution() {
        var devicePixelRatio = window.devicePixelRatio;

        setTimeout(function() {
            if (devicePixelRatio != window.devicePixelRatio) {
                devicePixelRatio = window.devicePixelRatio;

                for (var i = 0; i < watchers.length; i++) {
                    watchers[i](devicePixelRatio)
                };
            }
            watchResolution();
        })
    })()

    return {
        change: function(watcher) {
            watchers.push(watcher);
            watcher(window.devicePixelRatio);
        }
    }
}()

module.exports = function() {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            var normal = attrs.src;
            var retina = attrs.rsrc;

            resolution.change(function(res) {
                if (res == 2) element.attr('src', retina);
                else element.attr('src', normal);
            })
        }
    }
}