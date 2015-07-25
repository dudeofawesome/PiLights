var remoteControl = require('./modules/remote_control');
var api = require('./modules/api');

module.exports = {
    init: function () {
        api.init(remoteControl);
    }
};

module.exports.init();
