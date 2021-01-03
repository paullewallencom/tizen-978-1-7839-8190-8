var sAccessToken = '';

function showLinkedInUpdates() {
	$.ajax({
		type : 'GET',
		url : 'https://api.linkedin.com/v1/people/~/network/updates?type=SHAR&count=20&oauth2_access_token='+sAccessToken,
		headers : { 'x-li-format': 'json' },
		success : function(data) {
			for(var nIter in  data.values) { 
				var person =  data.values[nIter].updateContent.person;
				if (undefined != person.currentShare.content) {
					var img = $( '<img>', {'src' : person.pictureUrl, 'style':'float: left; padding-right: 4px;' } );
					var name = $( '<h2>' ).html(person.firstName + ' ' + person.lastName);
					var text = $('<span>').html(person.currentShare.content.title+'<br />'+
										person.currentShare.content.description+'<br />'+
										person.currentShare.content.shortenedUrl); 
					var listItem = $('<li>').append($( '<p>' ).append(img, name, text));
					$('#listUpdates').append(listItem);
				}
			}
			$('#listUpdates').listview('refresh');

		},
		error : function(data, textStatus) {
			var listItem = $('<li>').html("Error");
			$('#listUpdates').append(listItem);
			$('#listUpdates').listview('refresh');
		}
	});
}