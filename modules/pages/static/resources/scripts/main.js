
window.onload = function () {
	var light = document.getElementById('light');

	document.getElementById('button1').addEventListener('click', function () {
		if (socket !== undefined) {
			socket.emit('toggle', {button: 1});
		} else {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open('GET', '/1', true);
			xmlhttp.send();
		}

		showLight();
	});
	document.getElementById('button2').addEventListener('click', function () {
		if (socket !== undefined) {
			socket.emit('toggle', {button: 2});
		} else {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open('GET', '/2', true);
			xmlhttp.send();
		}

		showLight();
	});
	document.getElementById('button3').addEventListener('click', function () {
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

		console.log(data);
	});
};

function showLight () {
	light.style.opacity = 1;
	setTimeout(function () {
		light.style.opacity = 0;
	}, 500);
}
