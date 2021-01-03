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
    
    $('#contactError').popup();
    
    $('#list').bind('pageshow', retrieveContacts);
    $('#add').bind( "pageshow", clearForm);
    
    $('#buttonSaveContact').bind( "click", function(event, ui) {
        var sFirstName = $('#contactFirstName').val();
        var sLastName = $('#contactLastName').val();
        var sPhone = $('#contactPhone').val();
        try {
        	if ( (0 == sFirstName.length) || (0 == sLastName.length) || (0 == sPhone.length) ) {
        		throw new Error('Please enter a name and a phone.');
        	}
    		saveContact(sFirstName, sLastName, sPhone);
    		$.mobile.changePage("#list");
    	} catch(err) {
    		showErrorPopup(err.message);
    	}
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