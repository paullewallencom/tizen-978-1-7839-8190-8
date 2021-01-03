function getTweets() {
	$.ajax({
		type : 'GET',
		url : 'http://example.com/twitter.php',
		success : function(data) {
			var tweets = jQuery.parseJSON( data );			
		    for(var nIter in tweets.statuses) {              
				var img = $( '<img>', {'src' : tweets.statuses[nIter].user.profile_image_url, 'style':'float: left; padding-right: 4px;' } );
				var title = $( '<h2>' ).html('@'+tweets.statuses[nIter].user.screen_name);
				var text = $('<span>').html(tweets.statuses[nIter].text); 
				var listItem = $('<li>').append($( '<p>' ).append(img, title, text));
				$('#listTweets').append(listItem);
		    }
		    $('#listTweets').listview('refresh');
		},
		error : function() {
		    var listItem = $('<li>').html("Error");
			$('#listTweets').append(listItem);
			$('#listTweets').listview('refresh');
		}
	});
}