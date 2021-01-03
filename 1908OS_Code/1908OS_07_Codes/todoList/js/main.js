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
    
    $('#list').bind('pageshow', retrieveTasks);
    $('#add').bind( "pageshow", clearForm);
    
    $('#contactError').popup();
    $("#taskDueDate").datetimepicker(); 
    
    $('#buttonSaveTask').bind( "click", function(event, ui) {
    	var sTaskDesc = $('#taskDesc').val();
    	var sTaskSummary = $('#taskSummary').val();
    	
    	var dueDateRaw = $("#taskDueDate").datetimepicker("value");
    	var dueDate = new tizen.TZDate(Date.parse(dueDateRaw));
    	
    	try {
        	if ( (0 == sTaskDesc.length) || (0 == sTaskSummary.length) ) {
        		throw new Error('Please set task details.');
        	}
        	saveTask(sTaskDesc, sTaskSummary, dueDate);
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