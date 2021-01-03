function load() {
	var content = localStorage.getItem('note');
	if (null != content) {
		$('#textbox').val(content);
	}
	$('#btnUndo').hide();
}

function save() {
	var sContent = $('#textbox').val();
	var previousVersion = localStorage.getItem('note');
	if (sContent != previousVersion) {
		sessionStorage.setItem('undo', previousVersion);
		$('#btnUndo').show();
	}
	localStorage.setItem('note', sContent);
}

function undo() {
	var content = sessionStorage.getItem('undo');
	if (null != content) {
		$('#textbox').val(content);
		localStorage.setItem('note', content);
		$('#btnUndo').hide();
	}
}