var backEventListener = null;

var unregister = function() {
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
};

barcodeScanner = new Worker("js/DecoderWorker.js");
barcodeScanner.onmessage = function(e) {
	if (false == e.data.success) {
		$('#labelResult').html("Error");
		return;
	}
	var tempArray = e.data.result;
	for (var nIter = 0; nIter < tempArray.length; nIter++) {
		if(-1 == resultArray.indexOf(tempArray[nIter])) {
			console.log(tempArray[nIter]);
			resultArray.push(tempArray[nIter]);
		}
	}
	$('#labelResult').html(resultArray.join("<br />"));
};

function scanBarcode() {
	$('#labelResult').html('Please wait...');
	ctx.drawImage(document.querySelector('#imgBarcode'),0,0,Canvas.width,Canvas.height);
	resultArray = [];
	barcodeScanner.postMessage({pixels: ctx.getImageData(0,0,Canvas.width,Canvas.height).data, width: Canvas.width, height: Canvas.height, cmd: "normal"});
}

//Initialize function
var init = function () {
    // register once
    if ( backEventListener !== null ) {
        return;
    }
    
	Canvas = document.createElement("canvas");
	Canvas.width=320;
	Canvas.height=240;
	ctx = Canvas.getContext("2d");
	var resultArray = [];
		    
    $('#btnScan').bind( "click", function(event, ui) {
    	scanBarcode();
    });
    
    var backEvent = function(e) {
        if ( e.keyName == "back" ) {
            try {
                if ( $.mobile.urlHistory.activeIndex <= 0 ) {
                    // if first page, terminate app
                    unregister();
                } else {
                    // move previous page
                    $.mobile.urlHistory.activeIndex -= 1;
                    $.mobile.urlHistory.clearForward();
                    window.history.back();
                }
            } catch( ex ) {
                unregister();
            }
        }
    }
    
    // add eventListener for tizenhwkey (Back Button)
    document.addEventListener( 'tizenhwkey', backEvent );
    backEventListener = backEvent;
};

$(document).bind( 'pageinit', init );
$(document).unload( unregister );