function onSuccess() {
}

function onError(err) {
	console.log("Error: " + err.name);
}

function launchVideoPlayer() {
	var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view", "file:///opt/usr/media/Videos/happy.mp4");
	tizen.application.launchAppControl(appControl, null, onSuccess, onError);
}