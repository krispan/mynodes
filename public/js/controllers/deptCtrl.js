krispan.controller('DeptController', function ($scope,$http,socket){


$scope.msgs=[];
    $scope.sendmsg=function(){

        socket.emit('send msg','$scope.msg.text');
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






    $scope.departments=[];
    $scope.getDept=function(){


    $scope.curPage = 0;
    $scope.pageSize = 5;
    $scope.selected={};
    $scope.deleted={};
    var did;
    var dname;

           
    $http.get('http://localhost:7000/api/services/departments/').
        success(function(data) {           
            $scope.departments = data;
            $scope.numberOfPages = function() {
                return Math.ceil($scope.departments.length / $scope.pageSize);
            };
               
        });
    };

    $scope.submitfDept=function(){
        var data=$scope.f1;  
        var request = $http({
                        method: "post",
                        headers: {'Content-Type': 'application/json; charset=utf-8'},
                        url: "http://localhost:7000/api/services/departments/",
                        data: data
                            });

        request.success(function(data){
            $scope.getDept();
            $scope.f1={};
        }).error(function(data){

                //alert("fff");
        });
    };

    $scope.update=function(){
        var data=$scope.selected;   
        var request = $http({
                        method: "PUT",
                        headers: {'Content-Type': 'application/json; charset=utf-8'},
                        url: "http://localhost:7000/api/services/departments/",
                        data: data
                            });

        request.success(function(data){
                //$scope.getDept();
                //console.log(data)
                //$scope.selected={};
        }).error(function(data){

                //alert("fff");
        });

    };

    $scope.delete=function(data){
        var data=$scope.deleted;   
        var request = $http({
                        method: "DELETE",
                        headers: {'Content-Type': 'application/json; charset=utf-8'},
                        url: "http://localhost:7000/api/services/departments/",
                        data: data
                            });

        request.success(function(data){
            $scope.selected={};
            $scope.getDept();
                
        }).error(function(data){

                //alert("fff");
        });

    };


    $scope.getTemplate = function (dept) {
        if (dept.ID == $scope.selected.ID) return 'edit';
        else return 'display';
    };

    $scope.editContact = function (dept) {
            $scope.selected = this.dept;
            
            did=this.dept.DEPT_ID;
            dname=this.dept.DEPT_NAME;
           // console.log(this.dept.ID);
    };

    $scope.saveContact = function (idx) {
        if ($scope.selected.DEPT_ID!=did || $scope.selected.DEPT_NAME!=dname){
            $scope.AsyncConfirmYesNo(
                        "Confirm Save",
                        "Are you sure want to save changes?",
                        $scope.MyYesFunction,
                        $scope.MyNoFunction
            );

        }
        else{
            $scope.selected = {};          
        }
    };

    $scope.reset = function () {
          
            $scope.selected.DEPT_ID=did;
            $scope.selected.DEPT_NAME=dname;
            $scope.selected = {};
    }; 
     

    $scope.deleteDept=function(){
        $scope.deleted = this.dept;
        $scope.AsyncConfirmYesNo(
                        "Confirm Delete",
                        "Are you sure want to delete?",
                        $scope.delete,
                        $scope.reset
        );
        $scope.getDept();

    }
    $scope.ShowConfirmYesNo=function (header,msg) {
                $scope.AsyncConfirmYesNo(
                        header,
                        msg,
                        $scope.MyYesFunction,
                        $scope.MyNoFunction
                    );
    };

    $scope.MyYesFunction=function () {
                $scope.update();
                $scope.selected = {};
    };

    $scope.MyNoFunction=function () {
                reset();
    };

    $scope.AsyncConfirmYesNo=function (title, msg, yesFn, noFn) {
                var $confirm = $("#modalConfirmYesNo");
                $confirm.modal('show');
                $("#lblTitleConfirmYesNo").html(title);
                $("#lblMsgConfirmYesNo").html(msg);
                $("#btnYesConfirmYesNo").off('click').click(function () {
                    yesFn();
                    $confirm.modal("hide");
                });
                $("#btnNoConfirmYesNo").off('click').click(function () {
                    $confirm.modal("hide");
                $scope.selected.DEPT_NAME=dname;
                $scope.selected = {};
                });
    };


});