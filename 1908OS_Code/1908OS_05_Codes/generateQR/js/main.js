var backEventListener = null;

var unregister = function() {
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
};

function generateQrCode() {
	var sInput = $('#inputText').val().replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
	try {
		var barcodeQR = qrcode(4, 'M');
		barcodeQR.addData(sInput);
		barcodeQR.make();
		$('#barcode').html(barcodeQR.createImgTag(8));
	}
	catch (err){
		$('#barcode').html(err.name + ": " + err.message);
	}
}

//Initialize function
var init = function () {
    // register once
    if ( backEventListener !== null ) {
        return;
    }

    $('#btnGenerateQR').bind( "click", function(event, ui) {
    	generateQrCode();
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
    };
    
    // add eventListener for tizenhwkey (Back Button)
    document.addEventListener( 'tizenhwkey', backEvent );
    backEventListener = backEvent;
};

$(document).bind( 'pageinit', init );
$(document).unload( unregister );