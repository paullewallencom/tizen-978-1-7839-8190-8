function getFacebookInfo(sId)
{
	$.ajax({
        type : "GET",
        dataType : 'json',
        url : 'https://graph.facebook.com/'+sId+'?fields=name,about,picture',
        success : function(data) {
            var img = $('<img>',{ 'src': data.picture.data.url, 'style':'float: left; padding: 5px;' });
            var header = $('<h1>').text(data.name);
            var about = $('<p>').text(data.about);
            $('#info').append(img, header, about);
        },
        error : function() {
            $('#info').html('Error');
        }
    });
}