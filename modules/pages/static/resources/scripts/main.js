
window.onload = function () {
	var light = document.getElementById('light');
	var buttons = [document.getElementById('button1'), document.getElementById('button2'), document.getElementById('button3')];

	buttons[0].addEventListener('click', function () {
		if (socket !== undefined) {
			socket.emit('toggle', {button: 1});
		} else {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open('GET', '/1', true);
			xmlhttp.send();
		}

		showLight();
	});
	buttons[1].addEventListener('click', function () {
		if (socket !== undefined) {
			socket.emit('toggle', {button: 2});
		} else {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open('GET', '/2', true);
			xmlhttp.send();
		}

		showLight();
	});
	buttons[2].addEventListener('click', function () {
		if (socket !== undefined) {
			socket.emit('toggle', {button: 3});
		} else {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open('GET', '/3', true);
			xmlhttp.send();
		}

		showLight();
	});

	var easter_egg = new Konami();
	easter_egg.code = function() {
		setInterval(function () {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open('GET', '/', true);
			xmlhttp.send();
		}, 500);
	};
	easter_egg.load();

	var socket = io();
	socket.on('get', function (data) {
		// int:		data.button
		// bool:	data.state
		// --------------------
		// [bool]:	data.states

		if (data.button !== undefined) {
			if (data.state) {
				buttons[data.button - 1].setAttribute('on', '');
			} else {
				buttons[data.button - 1].removeAttribute('on');
			}
		} else {
			for (var i = 0; i < data.states.length && i < buttons.length; i++) {
				if (data.states[i]) {
					buttons[i].setAttribute('on', '');
				} else {
					buttons[i].removeAttribute('on');
				}
			}
		}
	});
	socket.emit('get');
};

function showLight () {
	light.style.opacity = 1;
	setTimeout(function () {
		light.style.opacity = 0;
	}, 500);
}
