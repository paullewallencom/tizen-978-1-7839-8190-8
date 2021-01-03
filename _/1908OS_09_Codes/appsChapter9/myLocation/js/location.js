function showError(err) {
	$('#info').text('Error ' + err.code + ': ' + err.message);
}

function showLocation(location)
{
	$('#info').text('latitude: ' + location.coords.longitude + ' longitude: ' + location.coords.longitude);
}

function retrieveLocation() {
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(showLocation, showError);
	}
}