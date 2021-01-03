function onError(response) {
	console.log( "Error: " + response.name);
}

function loadImage(media) {
	if (0 < media.length) {
		$("#photoFrame").attr("src",media[0].contentURI);
		$('#photoFrame').show();
	}
}

function findImages() {
	var filterBy = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE");
	var orderBy = new tizen.SortMode("modifiedDate", "DESC");
	tizen.content.find(loadImage, onError, null, filterBy, orderBy);
}