

angular.module( 'YourApp', [ 'ngMaterial','ngRoute' ] ).directive('bsDropdown', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            items: '=dropdownData',
            doSelect: '&selectVal',
            selectedItem: '=preselectedItem'
        },
        link: function (scope, element, attrs) {
            var html = '';
            switch (attrs.menuType) {

                case "button":
                    html += '<div class="btn-group"><button class="btn  btn-default button-label ">Action</button><button class="btn  btn-default dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>';
                    break;
                default:
                    html += '<div class="dropdown"><a class="dropdown-toggle" role="button" data-toggle="dropdown"  href="javascript:;">Dropdown<b class="caret"></b></a>';
                    break;
            }
            html += '<ul class="dropdown-menu numbers"><li ng-repeat="item in items"><a tabindex="-1" data-ng-click="selectVal(item)">{{item.id}}</a></li></ul></div>';
            element.append($compile(html)(scope));
            for (var i = 0; i < scope.items.length; i++) {
                if (scope.items[i].id === scope.selectedItem) {
                    scope.bSelectedItem = scope.items[i];
                    break;
                }
            }
            scope.selectVal = function (item) {
                switch (attrs.menuType) {
                    case "button":
                        $('button.button-label', element).html(item.id);
                        break;
                    default:
                        $('a.dropdown-toggle', element).html('<b class="caret"></b> ' + item.id);
                        break;
                }
                scope.doSelect({
                    selectedVal: item.id
                });
            };
            scope.selectVal(scope.bSelectedItem);
        }
    };
  });
