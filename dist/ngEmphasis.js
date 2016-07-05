'use strict';

/**
 * Main Module
 * @namespace ngEmphasis
 * @desc Main application module
 */
(function () {

    'use strict';

    /**
     * @namespace ngEmphasis.Module
     * @desc Main application module
     * @memberOf ngEmphasis
     */

    angular.module('ng-emphasis', []);
})();

/**
 * Core Factory
 * @namespace ngEmphasis
 */
(function () {

    'use strict';

    ngEmphasis.$inject = ["$compile", "$interpolate"];
    angular.module('ng-emphasis').directive('ngEmphasis', ngEmphasis);

    /**
     * @namespace ngEmphasis.Factory
     * @desc Core application factor
     * @memberOf ngEmphasis
     */

    /* @ngInject */
    function ngEmphasis($compile, $interpolate) {

        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link($scope, $element, $attrs) {

            var phrase = '',
                text = '',
                inputPhrase = '',
                inputText = '';

            // Set input values
            inputPhrase = $attrs.ngEmphasis;
            inputText = $element.html();

            // Get the input values
            try {
                phrase = $scope.$eval(inputPhrase) || inputPhrase;
            } catch (ex) {
                phrase = inputPhrase;
            }
            try {
                text = $interpolate(inputText)($scope) || inputText;
            } catch (ex) {
                text = inputText;
            }

            // Split the phrase by space character
            var phrases = phrase.split(' ');
            text = '' + text;

            // Highlight each phrase
            if (phrase) {
                // Clean up
                for (var p in phrases) {
                    if (phrases.hasOwnProperty(p)) {
                        phrases[p] = (phrases[p] || '').trim();
                    }
                }

                // Replace each matched phrase with inline element
                phrase = phrases.join('|');
                text = text.replace(new RegExp('(' + phrase + ')', 'gi'), '<span class="ng-emphasis">$1</span>');
            }

            // Replace element
            $element.html(text);
        }
    }
})();