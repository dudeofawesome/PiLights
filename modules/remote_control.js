var exec = require('child_process').exec;
var buttonStates = [false, false, false];
var callbacks = {};

module.exports = {
    toggle: function (button) {
        change(button);
    },
    set: function (button, state) {
        change(button, state);
    },
    get: function (button) {
        if (button !== undefined) {
            return buttonStates[button - 1];
        } else {
            return buttonStates;
        }
    },
    setCallbacks: function (callbacks) {
        module.exports.callbacks = callbacks;
    },
    callbacks: {}
};

function change (button, state) {
    switch (button) {
        case 1:
            if (state === undefined || (state !== undefined && buttonStates[button - 1] !== state)) {
                exec('./modules/tlit 7');
                buttonStates[button - 1] = !buttonStates[button - 1];
            }
            break;
        case 2:
            if (state === undefined || (state !== undefined && buttonStates[button - 1] !== state)) {
                exec('./modules/tlit 22');
                buttonStates[button - 1] = !buttonStates[button - 1];
            }
            break;
        case 3:
            if (state === undefined || (state !== undefined && buttonStates[button - 1] !== state)) {
                exec('./modules/tlit 18');
                buttonStates[button - 1] = !buttonStates[button - 1];
            }
            break;
        case undefined:
            if (state === undefined) {
                exec('./modules/tlit 7');
                buttonStates[0] = !buttonStates[0];
                exec('./modules/tlit 22');
                buttonStates[1] = !buttonStates[1];
                exec('./modules/tlit 18');
                buttonStates[2] = !buttonStates[2];
            } else {
                if (buttonStates[0] !== state) {
                    exec('./modules/tlit 7');
                    buttonStates[0] = state;
                }
                if (buttonStates[1] !== state) {
                    exec('./modules/tlit 22');
                    buttonStates[1] = state;
                }
                if (buttonStates[2] !== state) {
                    exec('./modules/tlit 18');
                    buttonStates[2] = state;
                }
            }
    }

    if (module.exports.callbacks && module.exports.callbacks.stateChanged) {
        module.exports.callbacks.stateChanged(buttonStates);
    }
}
