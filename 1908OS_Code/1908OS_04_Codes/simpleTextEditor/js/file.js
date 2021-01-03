var documentsDir;

var sTxtFile = 'simpleTextFile.txt';

function onError(e) {
	console.log('error: ' + e.message);
}

function read(fileStream) {
	try {
		$('#textbox').val(fileStream.read(fileStream.bytesAvailable));
		fileStream.close();
	} catch (err) {
		console.log('Unable to read file: ' + err.message);
	}
}

function write(fileStream) {
	try {
		fileStream.write($('#textbox').val());
		fileStream.close();
	} catch (err) {
		console.log('Unable to save file: ' + err.message);
	}
}

function loadFile()
{
	try {
		file = documentsDir.resolve(sTxtFile);
	} 
	catch (exc) {
		return;
	}

	try {
		file.openStream('r', read, onError);
	} catch (err) {
		console.log('Unable to open file for reading: ' + err.message);
	}
}

function onResolveSuccess(dir) {
	documentsDir = dir;
	loadFile();
}

function createFile()
{
	try {
		documentsDir.createFile(sTxtFile);
		file = documentsDir.resolve(sTxtFile);
	}
	catch (err) {
		console.log('Unable to create file: '+err.message);
		return false;
	}
	return true;
}

function saveFile()
{
	var bFileExists = true;
	try {
		file = documentsDir.resolve(sTxtFile);
	} 
	catch (errFile) {
		if (false == createFile()) {
			return;
		}
	}

	try {
		file.openStream('w', write,	onError);
	} catch (errWrite) {
		console.log('Unable to open file for writing: ' + errWrite.message);
	}
}