var fs = require('fs');
var express = require('express');
var app = express();

var http = require('http').Server(app);
var clientIO = require('socket.io')(http);

var serverExpress = require('express');
var serverApp = serverExpress();
var serverHTTP = require('http').Server(serverApp);
var serverIO = require('socket.io')(serverHTTP);

var remote;

var PAGES = {
    remote: undefined
};

module.exports = {
    init: function (remoteControl) {
        remote = remoteControl;
        remote.init(serverIO);
        remote.setCallbacks({
            stateChanged: function (buttonStates) {
                clientIO.emit('get', {states: buttonStates});
            }
        });

        PAGES.remote = fs.readFileSync('./modules/pages/remote.html').toString();

        var server = http.listen(process.env.PORT | 8080, function () {
            var host = server.address().address;
            var port = server.address().port;

            console.log('Lights listening at http://%s:%s', host, port);
        });

        // var serverServer = serverHTTP.listen(7533, function () {
        //     var host = serverServer.address().address;
        //     var port = serverServer.address().port;
        //
        //     console.log('Remote API listening at http://%s:%s', host, port);
        // });

        return this;
    }
};

app.get('/all', function (req, res) {
    remote.toggle();
    res.send('Lights toggled!');
});
app.get('/1', function (req, res) {
    remote.toggle(1);
    res.send('Light 1 toggled!');
});
app.get('/2', function (req, res) {
    remote.toggle(2);
    res.send('Light 2 toggled!');
});
app.get('/3', function (req, res) {
    remote.toggle(3);
    res.send('Light 3 toggled!');
});
app.get('/', function (req, res) {
    res.send(PAGES.remote);
});
app.use(express.static('./modules/pages/static/'));

clientIO.on('connection', function(socket){
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
