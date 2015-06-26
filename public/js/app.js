
var krispan = angular.module('myapp', ['ngRoute']);

krispan.factory('socket',function (){


var socket=io();
return socket;

});


krispan.config(function ($routeProvider){
    $routeProvider.
            when('/home/', {templateUrl: 'parts/home.html', controller: 'HomeController'}).
            when('/first/', {templateUrl: 'parts/first.html', controller: 'FirstController'}).
            when('/second/', {templateUrl: 'parts/second.html', controller: 'SecondController'}).
            when('/third/', {templateUrl: 'parts/third.html', controller: 'ThirdController'}).
             when('/departments/', {templateUrl: 'parts/departments.html', controller: 'DeptController'}).
            otherwise({redirectTo: '/home'});

});

krispan.controller('HomeController', function ($scope) {
       $scope.names=[
		'KRISPAN',
		'CHATHURANGA',
		'KUMARA'

		];
});
krispan.controller('FirstController', function ($scope, $http) {
       console.log("asd");
       $http.get('http://localhost/krispan1/get.php').
        success(function(data) {
            // here the data from the api is assigned to a variable named users
            $scope.users = data;
            console.log(data);
        });

        
});

krispan.controller('SecondController', function ($scope,$http) {
        $scope.names={name:'krispan',age:10};
        
        $scope.submitMyForm=function(){
        var data=$scope.f1;  
        console.log(data)  
        var request = $http({
                    method: "post",
                    headers: {'Content-Type': 'application/json; charset=utf-8'},
                    url: "http://localhost:80/krispan2/",
                    data: data
                            });

        request.success(function(data)
            {
            getn();
            console.log(data)
            }).error(function(data){

            alert("fff");
            }
            );

        };

        var getn=function(){
        $http.get('http://localhost/krispan1/get.php').
        success(function(data) {
            // here the data from the api is assigned to a variable named users
            $scope.users = data;
            console.log(data);
        });

        
        };
        getn();


});





krispan.controller('samplecontoller', function ($scope) {

  
 $scope.showData = function( ){

 $scope.curPage = 0;
 $scope.pageSize = 2;
     $scope.datalists = [
         { "name": "John","age":"16","designation":"Software Engineer1"},
    {"name": "John2","age":"21","designation":"Software Engineer2"},
    {"name": "John3","age":"19","designation":"Software Engineer3"},
    {"name": "John4","age":"17","designation":"Software Engineer4"},
    {"name": "John5","age":"21","designation":"Software Engineer5"},
    {"name": "John6","age":"31","designation":"Software Engineer6"},
    {"name": "John7","age":"41","designation":"Software Engineer7"},
    {"name": "John8","age":"16","designation":"Software Engineer8"},
    {"name": "John18","age":"16","designation":"Software Engineer9"},
    {"name": "John28","age":"16","designation":"Software Engineer10"},
    {"name": "John38","age":"16","designation":"Software Engineer11"},
    {"name": "John48","age":"16","designation":"Software Engineer12"},
    {"name": "John58","age":"16","designation":"Software Engineer13"},
    {"name": "John68","age":"16","designation":"Software Engineer14"},
    {"name": "John68","age":"16","designation":"Software Engineer15"}
]
     $scope.numberOfPages = function() {
                return Math.ceil($scope.datalists.length / $scope.pageSize);
            };
         
}

});

krispan.filter('pagination', function()
{
 return function(input, start)
 {
  start = +start;
  return input.slice(start);
 };
});
