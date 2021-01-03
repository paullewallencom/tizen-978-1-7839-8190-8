var backEventListener = null;

var unregister = function() {
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
};

//Initialize function
var init = function () {
    // register once
    if ( backEventListener !== null ) {
        return;
    }
    
    $('#buttonSend').bind( "click", function(event, ui) {
    	var sTo = $('#emailTo').val();
        var sCC = $('#emailCC').val();
        var sSubject = $('#emailSubject').val();
        var sContent = $('#emailContent').val();
        if ( (0 < sTo.length) && (0 < sSubject.length) ) {
        	sendEmail(sSubject, sContent, sTo, sCC);
        	
        	//clear fields
        	$('#emailTo').val('');
            $('#emailCC').val('');
            $('#emailSubject').val('');
            $('#emailContent').val('');
        }
    });
    
    var backEvent = function(e) {
        if ( "back" == e.keyName ) {
        	unregister();
        }
    };
    
    // add eventListener for tizenhwkey (Back Button)
    document.addEventListener( 'tizenhwkey', backEvent );
    backEventListener = backEvent;
};

$(document).bind( 'pageinit', init );
$(document).unload( unregister );