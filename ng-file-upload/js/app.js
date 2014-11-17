/**
 * Created by Admin on 13/11/2014.
 */
angular.module('uploadApp', ['angularFileUpload']);
var app = angular.module('uploadApp');
var uploadController =
    [
        '$scope',
        '$upload',
        '$http',
        function ($scope, $upload,$http) {
            $scope.images = [];
            $scope.save = function(){
                $scope.images.forEach(function(img){
                    if(img.isTemporaryFile){
                        console.log('confirm '+img.src);
                        $http.put(img.src).success(function(data){
                            //console.log(data);
                            img.src = data.src;
                            img.isTemporaryFile = data.isTemporaryFile;
                            img.filename = data.filename;
                        })
                    }
                });
            };
            $scope.onFileSelect = function($files){
                /*var fileReader = new FileReader();
                fileReader.onload = function(e){
                    console.log('file is loaded in filereader');
                }*/
                if(!$files.length) return;
                console.log('trying to upload');
                console.log($files);
                //$files.forEach(function($file){
                    var toUpload = {
                        url: 'http://localhost:3000/api/images',
                        //data: {myObj: $scope.myModelObj},
                        file: $files,
                        method: 'POST'

                    };
                    console.log(toUpload);
                    $scope.upload = $upload.upload(toUpload).progress(function(evt){
                        //console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function(data,status,headers,config){
                        console.log('---RESPONSE START---');
                        console.log(data);
                        console.log('---RESPONSE END---');
                        data.forEach(function(url){
                            if(url != null)
                                $scope.images.push(url);
                        });
                    }).error(function(data){
                        console.log(arguments);
                    }).catch(function(err){
                        console.log(arguments);
                    });
                //})

            }
        }];
app.controller('uploadController',uploadController);