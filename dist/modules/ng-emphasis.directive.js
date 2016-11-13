/**
 * Core Factory
 * @namespace ngEmphasis
 */
(function () {

    'use strict';

    angular
        .module('ng-emphasis')
        .directive('ngEmphasis', ngEmphasis);

    /**
     * @namespace ngEmphasis.Factory
     * @desc Core application factor
     * @memberOf ngEmphasis
     */

    /* @ngInject */
    function ngEmphasis($compile, $interpolate, ngEmphasisConfig) {

        var directive = {
            restrict: 'A',
            link: link,
            scope: {
                ngEmphasis: '='
            }
        };

        return directive;

        function link($scope, $element, $attrs) {

            var htmlTemplate = '';

            // Set html template
            htmlTemplate = '<span class="' + ngEmphasisConfig.cssClassName + '">$1</span>';

            // Watch for changes
            $scope.$watch('ngEmphasis', function (newVal, oldVal) {

                if (newVal) {
                    refresh(newVal, $element);
                } else {
                    $element.html('<span>' + $element.text() + '</span>');
                }

            });

            function refresh(phrase, elem) {

                // Split the phrase by space character
                var phrases = phrase.split(' ');
                var text = elem.text();

                // Highlight each phrase

                // Clean up
                for (var p in phrases) {
                    if (phrases.hasOwnProperty(p)) {
                        phrases[p] = (phrases[p] || '').trim();
                    }
                }

                // Replace each matched phrase with inline element
                text = text.replace(new RegExp('(' + phrases.join('|') + ')', 'gi'), htmlTemplate);

                // Replace element
                elem.html(text);

            }

        }

    }

})();
