var app=angular.module('krispan',[]);
app.factory('socket',function (){


var socket=io();
return socket;

});

app.controller('FirstController',function ($scope,socket){

	$scope.msgs=[];
	$scope.sendmsg=function(){

		socket.emit('send msg',$scope.msg.text);
	}

	$scope.me=function(txt){
console.log(txt);
socket.emit('send msg',txt);
		//socket.emit('send msg',$scope.msg.text);
	}

	socket.on('get msg', function(data){

		$scope.msgs.push(data);
		$scope.$digest();
		//asd
	});
});