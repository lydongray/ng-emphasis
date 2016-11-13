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
 * Configuration provider
 * @namespace ngEmphasis
 * @desc Application configuration provider
 */
(function () {

    'use strict';

    /**
     * @namespace ngEmphasis.Provider
     * @desc Application configuration provider
     * @memberOf ngEmphasis
     */

    angular.module('ng-emphasis').provider('ngEmphasisConfig', NgEmphasisConfig);

    /**
     * @namespace ngEmphasis.Provider
     * @desc Application configuration provider
     * @memberOf ngEmphasis
     */

    /* @ngInject */
    function NgEmphasisConfig() {

        this.cssClassName = 'ng-emphasis';

        this.setCssClass = function (cssClassName) {
            this.cssClassName = cssClassName;
        };

        this.$get = function () {
            return this;
        };
    }
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