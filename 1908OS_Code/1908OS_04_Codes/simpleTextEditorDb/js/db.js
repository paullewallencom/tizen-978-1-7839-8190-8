var db = null;
var dbTable = 'tizenSimpleTextEditor';

function openDb() {
	var dbVersion = 1.0;
	var dbName = "simpleTextEditor";
	var dbDesc = "Database for a simple text editor";
	var dbSize = 1024 * 1024; //1MB
	db = openDatabase(dbName, dbVersion, dbDesc, dbSize);
}

function retrieveData() {
	db.transaction(function (transaction) {
		transaction.executeSql("CREATE TABLE IF NOT EXISTS "+dbTable+" (id INTEGER PRIMARY KEY, content TEXT)");
		transaction.executeSql("SELECT content FROM "+dbTable+" WHERE id = ?", [1],
		function (sqlTransaction, sqlResult) {
			if (0 < sqlResult.rows.length) {
				$('#textbox').val(sqlResult.rows.item(0).content);
			}
		});
	});
}

function load() {
	try {
		openDb();
		retrieveData();
	}
	catch(err) {
		alert('Unable to load data!');
		console.log('Unable to load data: '+err.message);
	}
}

function save() {
	try {
		if (null == db) {
			throw {message:"Database has not been opened."};
		}
		
		db.transaction(function (transaction) {
			var sTxt = $('#textbox').val();
			transaction.executeSql("REPLACE INTO "+dbTable+"(id, content) VALUES (?, ?)", [1, sTxt]);
		});
	}
	catch(err) {
		alert('Unable to save data!');
		console.log('Unable to save data: '+err.message);
	}
}

