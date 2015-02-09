    // Include app dependency on ngMaterial


    angular.module( 'YourApp', [ 'ngMaterial','ngRoute' ] )
    .config(function($mdThemingProvider,$routeProvider) {
        $mdThemingProvider.theme('altTheme')
        .primaryPalette('purple') // specify primary color, all
                                // other color intentions will be inherited
                                // from default
        $routeProvider
        .when('/uniforms',{
            templateUrl:'tmpl/home.html',
            controller:'homeController'
        })
        .otherwise({
            redirectoTo:'/'
        })                        

    })        
    .controller('AppCtrl', function($scope, $timeout, $mdSidenav,$mdDialog, $log) {
        $scope.cartItems =[];
         $scope.items;
        $scope.inventoryStatus = null;
        $scope.statuses = [
            {
                    id: 1  
                }, {
                    id: 2     
                }, {
                    id: 3     
                }, {
                    id: 4       
                }, {
                    id: 5       
            }
        ];
        $scope.RightBarSrc = "tmpl/rightBar.html";
        $scope.LeftBarSrc = "tmpl/leftBar.html";

        $scope.setData=function(data){
            $scope.inventory= data;

        }
        $scope.sideBarClose=function(){
            $scope.inventoryStatus = null;
        }
        
            $scope.toggleLeft = function() {
                $scope.inventoryStatus = true ;
                $mdSidenav('left').toggle()
                                  .then(function(){
                                      $log.debug("toggle left is done");
                                      
                                  });
            };
            $scope.toggleRight = function() {
                $mdSidenav('right').toggle()
                                    .then(function(){
                                      $log.debug("toggle RIGHT is done");
                                    });
            };
            $scope.showCart =function(data){
              
                if(data.length>0){        
                    $mdDialog.show({
                       controller:showCartDialog,
                       templateUrl:"tmpl/showCart.html"
                    });
                }

                function showCartDialog($scope, $log,$mdDialog) {
                  $scope.items = data;
                  $scope.close = function(){
                    $mdDialog.cancel();
                  }
                  $scope.next = function(){
                    $mdDialog.cancel();
                    $mdDialog.show({
                       controller:finalisedOrderDialog,
                       templateUrl:"tmpl/finalisedOrder.html"
                    })
                  }
                  $scope.removeItem=function(data,idx){
                    $scope.items.forEach(function(element,index,array){
                        if(element.name==data.name){
                            element.quantity =data.quantity;
                            $mdDialog.cancel();
                        }
                        if(element.quantity==0){
                           $scope.items.splice(idx, 1);
                        }
                    });
                  }
                }

                function finalisedOrderDialog($scope, $log,$mdDialog) {
                    $scope.close = function(){
                      $mdDialog.cancel();
                    }

                }        
            }
            
            $scope.addToCart=function(data){

             if($scope.cartItems.length==0){
                $scope.cartItems.push(data);
             }else{
           
                flag=false;
                tmp={};

                  
                $scope.cartItems.forEach(function(element,index,array){
                    if(data.name==element.name){
                        flag=true;
                        $scope.cartItems[index].quantity = parseInt($scope.cartItems[index].quantity) + parseInt(data.quantity)   ;
                    }
                });
                if(flag==false){
                    $scope.cartItems.push(data);
                }

             }
            }
            
    })
    .controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
              $scope.close = function() {
                $scope.sideBarClose();
                $mdSidenav('left').close()
                                  .then(function(){
                                    $log.debug("close LEFT is done");
                                    
                                  });

              };
    })
    .controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
              $scope.close = function() {
                $scope.sideBarClose();
                $mdSidenav('right').close()
                                    .then(function(){
                                      $log.debug("close RIGHT is done");
                                    });
              };
              $scope.addItems=function(data,quantity){
                $scope.toggleRight();
                $scope.addToCart((function(){
                    return {
                        'name':data.itemName,
                        'quantity':quantity
                    };
                })());
                   
              }
             
    })
    .controller('homeController',function($scope,$log, $mdSidenav){
       
        $scope.inventories = {
          selected:null,
          quantity:1,  
             "items":[
             {
                "itemName":"Shoes EK (M) Conker Brown Slip-on 06H",
                "red":"Due to replacement",
                "amber":"Out of Stock"
             },
             {
                "itemName":"Shoes Slip-on 06H",
                 "red":"Due to replacement" 
                
             },
             {
                "itemName":"Shoes EK (M) Conker Red Slip-on 06H 1",
                "red":"Due to replacement",
                "amber":"Out of Stock"
             },
             {

                "itemName":"Shoes EK (M) Conker Brown Slip-on 06H2",
                "red":"Due to replacement",
                "amber":"Out of Stock"
             },
             {
                "itemName":"Shoes Slip-on 06H3",
                 "red":"Due to replacement" 
                
             },
             {
                "itemName":"Shoes EK (M) Conker Red Slip-on 06H4",
                "red":"Due to replacement",
                "amber":"Out of Stock"
             },
             {
                "itemName":"Shoes EK (M) Conker Brown Slip-on 06H5",
                "red":"Due to replacement",
                "amber":"Out of Stock"
             },
             {
                "itemName":"Shoes Slip-on 06H7",
                 "red":"Due to replacement" 
                
             },
             {
                "itemName":"Shoes EK (M) Conker Red Slip-on 06H7",
                "red":"Due to replacement",
                "amber":"Out of Stock"
             },
             {
                "itemName":"Shoes EK (M) Conker Brown Slip-on 06H9",
                "red":"Due to replacement",
                "amber":"Out of Stock"
             },
             {
                "itemName":"Shoes Slip-on 06H8",
                 "red":"Due to replacement" 
                
             },
             {
                "itemName":"Shoes EK (M) Conker Red Slip-on 06H12",
                "red":"Due to replacement",
                "amber":"Out of Stock"
             },
             {
                "itemName":"Shoes EK (M) Conker Brown Slip-on 06H13",
                "red":"Due to replacement",
                "amber":"Out of Stock"
             },
             {
                "itemName":"Shoes Slip-on 06H14",
                 "red":"Due to replacement" 
                
             },
             {
                "itemName":"Shoes EK (M) Conker Red Slip-on 06H15",
                "red":"Due to replacement",
                "amber":"Out of Stock"
             }]
        };

        $scope.toggleContent = function(data){
            $scope.setData(data)
            $mdSidenav('right').toggle()
                               .then(function(){
                                 $log.debug("toggle RIGHT is done");
                                });
                               
        }
       
    })
    .directive('bsDropdown', function ($compile) {
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
                    html += '<div class="btn-group"><button class="btn  btn-default button-label ">1</button><button class="btn  btn-default dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>';
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


       
    