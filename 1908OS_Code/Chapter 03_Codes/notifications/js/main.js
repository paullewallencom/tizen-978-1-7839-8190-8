var backEventListener = null;

var unregister = function() {
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
};

function postSimpleNotification()
{
    try {
        var notificationDict = {
            content: "Hello World."
        };
        simpleNotification = new tizen.StatusNotification("SIMPLE",
            "Notification", notificationDict);

        tizen.notification.post(simpleNotification);
    } catch (err) {
        console.log("Unable to post simple notification.");
    }
}

function postProgressNotification()
{
    try {
        var notificationDict = {
            content: "Please wait..."
        };
        progressNotification = new tizen.StatusNotification("PROGRESS",
            "Progess", notificationDict);

        tizen.notification.post(progressNotification);
    } catch (err) {
        console.log("Unable to post progress notification.");
    }
}

function updateProgressNotification()
{
    try {
        progressNotification.content = "Almost done!";
        tizen.notification.update(progressNotification);
    } catch (err) {
        console.log("Unable to update progress notification.");
    }
}

function removeProgressNotification()
{
	try {	
		tizen.notification.remove(progressNotification.id); 
	} catch (err) {
		console.log("unable to remove progress notification.");
	}
}

function runProgressDemo()
{
	postProgressNotification();
	setTimeout(updateProgressNotification,6000);
	setTimeout(removeProgressNotification,10000);
}

//Initialize function
var init = function () {
    // register once
    if ( backEventListener !== null ) {
        return;
    }
        
	$('#btnSimpleNotification').bind( "click", function(event, ui) {
		postSimpleNotification();
	});
	
	$('#btnProgressNotification').bind( "click", function(event, ui) {
		runProgressDemo();
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