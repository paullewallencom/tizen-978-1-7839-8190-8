function showError(err) {
	console.log('Error: ' + err.message);
}

function motionDetected(event) {
	var acc = event.accelerationIncludingGravity;
	var sDeviceX = (acc.x) ? acc.x.toFixed(2) : '?';
	var sDeviceY = (acc.y) ? acc.y.toFixed(2) : '?';
	var sDeviceZ = (acc.z) ? acc.z.toFixed(2) : '?';
	
	$('#labelX').text(sDeviceX);
	$('#labelY').text(sDeviceY);
	$('#labelZ').text(sDeviceZ);
}

function deviceMotion() {
	try {
		if (!window.DeviceMotionEvent) {
			throw new Error('device motion not supported.');
		}
	    window.addEventListener('devicemotion', motionDetected, false);
	} catch (err) {
		showError(err);
	}
}
