var g_bluetoothAdapter = null;
var g_bIsServer = false;
var g_sUUID = '6BEE80ED-D05C-4B44-A329-E7441FEE9154';

function showError(err) {
	console.log("Error: " + err.message);
}

function shutDownBluetooth() {
	if(true == g_bluetoothAdapter.powered) {
		g_bluetoothAdapter.setPowered(false);
	}
}

function readMessage(socket) {
	var data = socket.readData();

	var sResult = '';
	for (var nIter = 0; nIter < data.length; nIter++) {
		sResult += String.fromCharCode(data[nIter]);
	}
	$('#labelInfo').text(sResult);
}

function onSocketConnected(socket) {
   console.log("Bluetooth socket created successfully.");
      
   socket.onmessage = function () { readMessage(socket); };

   socket.onclose = function() { };
   
   if ( (null != socket) && ("OPEN" == socket.state) ) {
	   console.log('sending data to the server');
	   var sMessage = 'Hello World';
	   var sendData = [];
	   for (var nIter = 0; nIter < sMessage.length; nIter++)
	   {
		   sendData[nIter] = sMessage.charCodeAt(nIter);
	   }
	   socket.writeData(sendData);
   }
}

function paired(device) {
	try {
		console.log('Paired with device ' + device.name + ' (address: ' + device.address + ')');	    
		if (-1 == device.uuids.indexOf(g_sUUID)) {
			throw new Error('UUID not found');
	    }
	    
	    if (false == g_bIsServer) {
			device.connectToServiceByUUID(g_sUUID, onSocketConnected, showError);
	    }
	} catch (err) {
		showError(err);
	}
}

function pairDevices(sAddress) {
	g_bluetoothAdapter.createBonding(sAddress, paired, showError);
}

function registerServer(recordHandler) {
	console.log("Bluetooth services registered!");
	recordHandler.onconnect = function(socket) {
		console.log("Client connected: " + socket.peer.name + "," + socket.peer.address);

		socket.onmessage = function() {
			readMessage(socket);
		};

		socket.onclose = function() {
			console.log('The socket was closed.');
		};
	};
}

function startService() {
	if (true == g_bIsServer) {
		g_bluetoothAdapter.registerRFCOMMServiceByUUID(g_sUUID, "TizenCookbook", 
				registerServer, showError);
	}
}

function discoverBluetoothDevices() {
	try {
		console.log('searching...');
		var bluetoothDevices = 
		{
		   ondevicefound: function(device) {
		      console.log('Bluetooth device: ' + device.name + ' address: ' + device.address);
		      pairDevices(device.address);
		   }
		};	
		g_bluetoothAdapter.discoverDevices(bluetoothDevices, showError);
	} catch (err) { 
		showError(err);
	}
}

function run() {
	if (true == g_bIsServer) {
		console.log('running as a server...');
		startService();
	} else {
		console.log('running as a client...');
		discoverBluetoothDevices();
	}
}

function initBluetooth() {
	g_bluetoothAdapter = tizen.bluetooth.getDefaultAdapter();
	if(false == g_bluetoothAdapter.powered) {
		g_bluetoothAdapter.setPowered(true, run);
	}
	else
	{
		run();
	}
}
