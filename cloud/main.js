var fs = require('fs');
var async = require('async');
var buffertools = require('buffertools');

console.log("1")

var openstack_storage = require('openstack-storage');

console.log("2")

var config = {
  "auth": {
    "passwordCredentials": {
      "username": "admin",
      "password":"4133851b857c3100048c"
    },
    "tenantId": "cf44cc86f0dc4c6b9903400e52940d10"
  },
  "host": "http://ec2-79-125-126-243.eu-west-1.compute.amazonaws.com.:5000",
  "storageName": "swift-service"
};

console.log("3")

var authFn = async.apply(openstack_storage.authenticate, config);

console.log("4")

exports.postPicture = function(params, callback) {
  console.log('in postPicture with ts:' + Date.now());
  //var photoData = params.data;
  var photoData = "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";
  var fileName = "photo_" + params.ts + ".jpg";
  var localName = "/tmp/" + fileName;
  var storage = new openstack_storage.OpenStackStorage (authFn, function(err, res, tokens) {
    console.log("constructor - err: ", err, ", tokens: ", tokens);
    console.log(res);
    if (err) return callback(err);
    var decodedImage = new Buffer(photoData, 'base64');
    fs.writeFileSync(localName, decodedImage);
    storage.createContainer("Photos", function (err, statusCode) {
      console.log("createContainer - err: ", err, ", statusCode: ", statusCode);
      if (err) return callback(err, statusCode);
      storage.putFile("Photos", {remoteName: fileName, localFile: localName}, function (err, statusCode) {
        console.log("putFile - err: ", err, ", statusCode: ", statusCode);
        return callback(err, statusCode);
      });
    });
  });
};

exports.getList = function(params, callback) {
  var fileList = [];

  var storage = new openstack_storage.OpenStackStorage (authFn, function(err, res, tokens) {
    if (err) return callback(err);
    storage.getFiles("Photos", function (err, files) {
      if (err) {
        return callback(err);
      }
      async.forEachSeries(
        files,
        function (file, fileCallback) {
          console.log("found file: ", file.name);
          fileList.push(file.name);
          fileCallback();
        },
        function (err) {
          callback(null, {files: fileList});
        }
      );
    });
  });
};


exports.getImageData = function(params, callback) {
  var storage = new openstack_storage.OpenStackStorage (authFn, function(err, res, tokens) {
    if (err) return callback(err);
    var receiverStream = new buffertools.WritableBufferStream();
    storage.getFile("Photos", {remoteName: params.fileName, stream: receiverStream}, function (err, statusCode) {
      if (err) {
        return callback(err);
      }
      return callback(err, {imageData: receiverStream.getBuffer().toString('base64')});
    });
  });
};


