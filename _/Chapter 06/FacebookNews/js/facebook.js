var sAccessToken = '';

function getFacebookNewsFeed(){
	$.ajax({
		type : "GET",
		url  :'https://graph.facebook.com/me/home?access_token=' +sAccessToken,
		success : function(data) {
		    for(var nIter in data.data) {              
			    var sMessage = data.data[nIter].message;
		        if (undefined !== sMessage) {
					var sImgSrc = 'http://graph.facebook.com/' + data.data[nIter].from.id + '/picture?type=square';
					var img = $( '<img>', {'src' : sImgSrc, 'style':'float: left; padding-right: 4px;' } );
					var title = $( '<h2>' ).html(data.data[nIter].from.name);
					var text = $('<span>').html(sMessage); 
					var listItem = $('<li>').append($( '<p>' ).append(img, title, text));
					$('#listFb').append(listItem);
		        }
		    }
		    $('#listFb').listview('refresh');
		},
		error : function() {
		    var listItem = $('<li>').html("Access denied.");
			$('#listFb').append(listItem);
			$('#listFb').listview('refresh');
		}
	});
}
