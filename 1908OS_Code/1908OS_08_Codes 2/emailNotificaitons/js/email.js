var gEmailListenerId, gEmailService;

function showError(err) {
	console.log("Error: " + err.message);
}

function displayMessages(messages) {
	$('#labelInfo').html('You\'ve got mail!');
	var sTxt = '';
	for (var nIter in messages) {
		var message = messages[nIter];
		sTxt += "From: " + message.from + " Subject: " + message.subject + "<br />";
		console.log("From: " + message.from + " Subject: " + message.subject);
	}
	$('#labelMessages').html(sTxt);
}

function registerEmailListener() {
	var messagesListener = {
		messagesadded : displayMessages,
		messagesupdated : function(messages) {},
		messagesremoved : function(messages) {},
	};
	gEmailListenerId = gEmailService.messageStorage.addMessagesChangeListener(messagesListener);
}

function unregisterEmailListener() {
	try {
		gEmailService.messageStorage.removeChangeListener(gEmailListenerId);
	} catch (err) {
		showError(err);
	}
}

function retrieveServices(services) {
	try
	{
		if (0 == services.length) {
			throw new Error("Email service not found.");
		}
		gEmailService = services[0];
		registerEmailListener();
	} catch (err) {
		showError(err);
	}
}

function initEmailService() {
	try {
		tizen.messaging.getMessageServices("messaging.email", retrieveServices);
	} catch (err) {
		showError(err);
	}
}