function showErrorPopup(sMsg) {
	$('#dialogErrorText').text(sMsg);
	$('#contactError').popup('open');
}

function error(err) {
    var listItem = $('<li>').html('Error: '+ err.message);
	$('#listContacts').append(listItem);
	$('#listContacts').listview('refresh');
}

function retrieveContacts() {
	try {
		tizen.contact.find(showContacts, error);
	} catch (err) {
		error(err);
	}
}

function deleteContact(contactId) {
	tizen.contact.getUnifiedAddressBook().remove(contactId);
}

function bindClick(item, contactId) {
	item.bind("click", function(event) {
		try {
			deleteContact(contactId);
			retrieveContacts();
		} catch(err) {
			showErrorPopup(err.message);
		}
	});
}

function showContacts(contacts) {
	$('#listContacts').empty();
	var addressBook = tizen.contact.getUnifiedAddressBook();
	
	for (var nIter in contacts) {
		var name = $( '<h2>' ).html(contacts[nIter].displayName);
		var contact = addressBook.get(contacts[nIter].displayContactId);
		var sPhones = '';
		for (var nPhoneIter in contact.phoneNumbers) {
			sPhones += contact.phoneNumbers[nPhoneIter].number + '<br />';
		}
		var phones = $( '<div>' ).html(sPhones);
		var listItem = $('<li>').append($( '<p>' ).append(name, phones));
		bindClick(listItem, contact.id);
		$('#listContacts').append(listItem);
	}
	$('#listContacts').listview('refresh');
}

function saveContact(sFirstName, sLastName, sTel) {
	var contact = new tizen.Contact(
                     {name: new tizen.ContactName({firstName:sFirstName,
                             lastName:sLastName}),
                      phoneNumbers:[new tizen.ContactPhoneNumber(sTel)]});
	tizen.contact.getUnifiedAddressBook().add(contact);
}

function clearForm() {
	$('#contactFirstName').val('');
	$('#contactLastName').val('');
	$('#contactPhone').val('');
}




