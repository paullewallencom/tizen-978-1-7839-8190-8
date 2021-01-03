var msgEmail = { subject: "", plainBody: "", to: [], cc: [] };

function logError(err) {
	 console.log("Error: " + err.message);
}

function sentOK(recipients) 
{
	for (var nIter in recipients) {
		console.log("Message sent to " + recipients[nIter]);
	}	
}

function retrieveServices(services) { 
	var msg = new tizen.Message("messaging.email",msgEmail);
	services[0].sendMessage(msg, sentOK, logError);
}

function sendEmail(sSubject, sTxt, sTo, sCC) {
	msgEmail.subject = sSubject;
	msgEmail.plainBody = sTxt;
	msgEmail.to.push(sTo);
	msgEmail.cc.push(sCC);
	tizen.messaging.getMessageServices("messaging.email", retrieveServices, logError);
}