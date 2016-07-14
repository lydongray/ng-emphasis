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

    angular
        .module('ng-emphasis')
        .provider('ngEmphasisConfig', ngEmphasisConfig);

      /**
     * @namespace ngEmphasis.Provider
     * @desc Application configuration provider
     * @memberOf ngEmphasis
     */

    /* @ngInject */
    function ngEmphasisConfig() {

        this.cssClassName = 'ng-emphasis';

        this.setCssClass = function (cssClassName) {
            this.cssClassName = cssClassName;
        };

        this.$get = function () {
            return this;
        };

    }

})();
