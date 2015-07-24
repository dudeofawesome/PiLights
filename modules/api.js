var express = require('express');
var app = express();
var fs = require('fs');
var remote;

var PAGES = {
    remote: undefined
};

module.exports = {
    init: function (remoteControl) {
        remote = remoteControl;

        PAGES.remote = fs.readFileSync('./pages/remote.html').toString();

        var server = app.listen(8080, function () {
            var host = server.address().address;
            var port = server.address().port;

            console.log('Lights listening at http://%s:%s', host, port);
        });

        remote.init();

        return this;
    }
};

app.get('/', function (req, res) {
    remote.toggle(1);
    remote.toggle(2);
    remote.toggle(3);
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

app.get('/remote', function (req, res) {
    res.send(PAGES.remote);
});

app.use(express.static('./pages/static/'));

module.exports.init();
