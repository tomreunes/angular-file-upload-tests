var express = require('express'),
    multipart = require('connect-multiparty'),
    fs = require('fs'),
    cors = require('cors'),
    imageService = require('images-service'),
    path = require('path');

var app = express();

var myRoute = '/api/images/';
imageService.config({
    root: __dirname,
    apiRoute: myRoute
});
imageService.clearTmp();

app
    .use(cors())
    .all('*', function (req, res, next) {
        console.log(req.method + " " + req.url);
        next();
    })
    .post(myRoute, multipart(), function (req, res, next) {
        if (!(req.get('content-type') && req.get('content-type').indexOf('multipart/form-data') > -1)) {
            res.status(401);
            next();
            return;
        }
        var files = req.files.file;
        var images = imageService.upload(files);
        res.status(200).send(images);
    })
    .put(myRoute+':filename', function (req, res) {
        var filename = req.params.filename;
        var image = imageService.confirm(filename);
        res.status(200).send(image);
    })
    .get(myRoute+':filename', function (req, res) {
        var filename = req.params.filename;
        imageService.show(res,filename);
    })
    .delete(myRoute+':filename',function(req,res){
        var filename = req.params.filename;
        imageService.delete(filename);
        res.status(200).send('Succesfully removed!');
    })
;


app.listen(3000);
console.log('Listening to port 3000 (' + __dirname + ')');