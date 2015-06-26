krispan.controller('ThirdController',function ($scope, s1) {
       console.log("asd")
       var promise=s1.get1();
       promise.then(function(data){
       	$scope.tt=data;

console.log($scope.tt);
       });
       console.log(promise);
      
$scope.do=function(){

	console.log($scope.tt);
}

});

krispan.service("s1",function ($http,$q){
	var deferred=$q.defer();
	 $http.get('http://localhost/krispan1/get.php').
        success(function(data) {
            // here the data from the api is assigned to a variable named users
            deferred.resolve(data);
            //console.log(data);
        });

      this.get1=function (){
      	return deferred.promise;

      };


});