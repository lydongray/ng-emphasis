/*global angular, describe, it, jasmine, expect, beforeEach, inject */
'use strict';

describe('Testing ngEmphasis Directive', function () {

    var
        $compile,
        $scope,
        $httpBackend;

    beforeEach(module('ng-emphasis'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
    }));

    describe('Testing ngEmphasis Functionality', function() {

        it('should highlight the text found in scope given search terms found in scope', function() {
            $scope.text = 'Here is some text';
            $scope.search = 'some is';

            var template = $compile('<div ng-emphasis="search">{{ text }}</div>')($scope);
            $scope.$digest();
            var html = template.html();
            
            expect(html).toEqual('Here <span class="ng-emphasis">is</span> <span class="ng-emphasis">some</span> text');
        });
        it('should highlight the text found in scope given search terms passed by string', function() {
            $scope.text = 'Here is some text';

            var template = $compile('<div ng-emphasis="some is">{{ text }}</div>')($scope);
            $scope.$digest();
            var html = template.html();

            expect(html).toEqual('Here <span class="ng-emphasis">is</span> <span class="ng-emphasis">some</span> text');
        });
        it('should highlight the text passed by string given search terms found in scope', function() {
            $scope.search = 'some is';

            var template = $compile('<div ng-emphasis="search">Here is some text</div>')($scope);
            $scope.$digest();
            var html = template.html();

            expect(html).toEqual('Here <span class="ng-emphasis">is</span> <span class="ng-emphasis">some</span> text');
        });
        it('should highlight the text passed by string given search terms passed by string', function() {
            var template = $compile('<div ng-emphasis="some is">Here is some text</div>')($scope);
            $scope.$digest();
            var html = template.html();

            expect(html).toEqual('Here <span class="ng-emphasis">is</span> <span class="ng-emphasis">some</span> text');
        });

    });

});
