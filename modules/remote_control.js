var exec = require('child_process').exec;
var buttonStates = [false, false, false];

module.exports = {
    toggle: function (button) {
        switch (button) {
            case 1:
                exec('./tlit 7');
                break;
            case 2:
                exec('./tlit 22');
                break;
            case 3:
                exec('./tlit 18');
                break;
            default:
                exec('./tlit 7');
                exec('./tlit 22');
                exec('./tlit 18');
        }
    },
    set: function (button, state) {
        if (buttonStates[button - 1] !== state) {
            switch (button) {
                case 1:
                    exec('./tlit 7');
                    break;
                case 2:
                    exec('./tlit 22');
                    break;
                case 3:
                    exec('./tlit 18');
                    break;
            }
            buttonStates[button - 1] = state;
        }
    },
    get: function (button) {
        return buttonStates[button - 1];
    }
};
