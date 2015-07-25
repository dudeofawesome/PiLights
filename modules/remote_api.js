var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var remote;

module.exports = {
    init: function (remoteControl) {
        remote = remoteControl;
        remote.setCallbacks({
            stateChanged: function (buttonStates) {
                io.emit('get', {states: buttonStates});
            }
        });

        var server = http.listen(7533, function () {
            var host = server.address().address;
            var port = server.address().port;

            console.log('Remote API listening at http://%s:%s', host, port);
        });

        return this;
    }
};

io.on('connection', function(socket){
    console.log('user connected');
    socket.on('toggle', function (data) {
        remote.toggle(data.button);
    });
    socket.on('set', function (data) {
        remote.set(data.button, data.state);
    });
    socket.on('get', function (data) {
        if (data !== undefined) {
            socket.emit('get', {button: data.button, state: remote.get(data.button)});
        } else {
            socket.emit('get', {states: remote.get()});
        }
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});






var http = require('http');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'www.random.org',
  path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback).end();
