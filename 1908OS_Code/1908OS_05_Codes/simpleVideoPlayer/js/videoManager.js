function onError(response) {
	console.log( "Error: " + response.name);
}

function selectVideo(sContentURI) {
	$("#player").attr("src",sContentURI);
	$.mobile.changePage("#videoPlayer");
}

function bindClick(item, sContentURI) {
	item.bind("click", function(event) {
		selectVideo(sContentURI);
	});
}

function createListItem(sText) {
	return $('<li>').append($('<a/>', { 
	    'href': '#',
	    'text': sText
	}));	
}

function mediaItems (media) {
	if (0 == media.length) {
		$('#listVideos').append(createListItem('No data'));
	}
	else {
		for(var nVideoIter in media) {
			var listItem = createListItem(media[nVideoIter].title);		
			bindClick(listItem, media[nVideoIter].contentURI);
			$('#listVideos').append(listItem);
		}
	}
	$('#listVideos').listview('refresh');
}

function loadVideos() {
	var filter = new tizen.AttributeFilter("type", "EXACTLY", "VIDEO");
	tizen.content.find(mediaItems, onError, null, filter);
}