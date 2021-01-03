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
        
    $('#buttonCtrl').bind( "click", function(event, ui) {
    	$('#buttonCtrl').button('disable'); 
    	g_bIsServer = ('server' == $('#buttonType').val());
    	initBluetooth();
	});
    
    var backEvent = function(e) {
        if ( "back" == e.keyName ) {
            try {
            	shutDownBluetooth();
            	unregister();
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