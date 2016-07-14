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

    ngEmphasis.$inject = ["$compile", "$interpolate", "ngEmphasisConfig"];
    angular.module('ng-emphasis').directive('ngEmphasis', ngEmphasis);

    /**
     * @namespace ngEmphasis.Factory
     * @desc Core application factor
     * @memberOf ngEmphasis
     */

    /* @ngInject */
    function ngEmphasis($compile, $interpolate, ngEmphasisConfig) {

        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link($scope, $element, $attrs) {

            var phrase = '',
                text = '',
                inputPhrase = '',
                inputText = '',
                htmlTemplate = '';

            // Set input values
            inputPhrase = $attrs.ngEmphasis;
            inputText = $element.html();

            // Set html template
            htmlTemplate = '<span class="' + ngEmphasisConfig.cssClassName + '">$1</span>';

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
                text = text.replace(new RegExp('(' + phrase + ')', 'gi'), htmlTemplate);
            }

            // Replace element
            $element.html(text);
        }
    }
})();