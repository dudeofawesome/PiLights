var remote;
var socket;

module.exports = {
    init: function (remoteControl) {
        remote = remoteControl;

        // var http = require('http');
        // var options = {
        //     host: 'pilights.herokuapp.com:7533',
        //     path: '/'
        // };
        // callback = function(response) {
        //     var str = '';
        //     response.on('data', function (chunk) {
        //         str += chunk;
        //     });
        //     response.on('end', function () {
        //         // TODO find out if connection has been established
        //
        //         // eval(str);
        //
        //         // setup IO callbacks once we have the script
        //         // socket = io();
        //         // socket.on('toggle', function (data) {
        //         //     remote.toggle(data.button);
        //         // });
        //     });
        // };
        // http.request(options, callback).end();


        var socket = require('socket.io-client')('http://pilights.herokuapp.com:7533');
        // var socket = require('socket.io-client')('http://localhost:7533');
        socket.on('connect', function () {
            console.log('Connected to remote server');
        });
        socket.on('toggle', function (data) {
            console.log('receiving');
            remote.toggle(data.button);
        });
    }
};
