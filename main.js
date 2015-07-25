var remoteControl = require('./modules/remote_control');
var api = require('./modules/api');
var remoteApi = require('./modules/remote_api');

module.exports = {
    init: function () {
        api.init(remoteControl);
        remoteApi.init(remoteControl);
    }
};

module.exports.init();
