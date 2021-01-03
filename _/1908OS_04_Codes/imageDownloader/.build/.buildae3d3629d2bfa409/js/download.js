var nDownloadImageId = 0;
var bIsPause = false;

function checkFileExtension(sFilename) {
	sFileExtension = sFilename.split('.').pop().toLowerCase();
	var extensions = ['png', 'jpg', 'jpeg'];
	if ( -1 == extensions.indexOf(sFileExtension) )
	{
		return false;
	}
	return true;
}

function reset() {
	bIsPause = false;
	nDownloadImageId = 0;
	$('#btnDownload').text('Download');
}

var listener = 
{
   onprogress: function(id, receivedSize, totalSize) 
   {
	   var nDownloadProgress = Math.round( (receivedSize / totalSize) * 100);
	   $('#label').text(nDownloadProgress+'% completed');
   },

   onpaused: function(id) 
   {
	   bIsPause = true;
	   $('#btnDownload').text('Resume');
   },

   oncanceled: function(id) 
   {
   },

   oncompleted: function(id, sFullPath) 
   {
	   $('#label').text('Image saved as: ' + sFullPath);
	   nDownloadImageId = 0;
	   $('#btnDownload').text('Download');
   },

   onfailed: function(id, error) 
   {
	   $('#label').text('Download failed: ' + error.name);
	   reset();
   }
};

function handleButton() {
	if (0 == nDownloadImageId) {
		var sURL = $('#inputImageURL').val();
		if (false == checkFileExtension(sURL)) {
			throw "PNG and JPG files allowed only.";
		}
		var downloadRequest = new tizen.DownloadRequest(sURL, "images");
		nDownloadImageId = tizen.download.start(downloadRequest, listener);
		
		$('#btnDownload').text('Pause');
	}
	else if (true == bIsPause) {
		tizen.download.resume(nDownloadImageId);
		bIsPause = false;
		$('#btnDownload').text('Resume');
	}
	else {
		tizen.download.pause(nDownloadImageId);
		$('#btnDownload').text('Pause');
	}
}
