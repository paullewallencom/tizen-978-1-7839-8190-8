var sAccessToken = 'CAADMlAb7eUQBAOZCotagqC17CH0xdWYi5UG9j1HXirtstASkATN4j6i5jN1PkLQN5MBi8zc1NGZB9AHFLD17lg3TN4ZBXPyyiPZCgZAT1kFHDUGNDYkjUr1D3OiQLhLQZCWrptM7Q6ZCNNT5SUwuWhI7WBVKvhY6UVs1iuEkPtUh2cNyEcjHntD4bHHDEpaCZA6Enlfo2oAZBZBAZDZD';

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