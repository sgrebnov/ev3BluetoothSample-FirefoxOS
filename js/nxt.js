cordova.addConstructor(function () {
    //https://wiki.mozilla.org/WebAPI/WebBluetooth
    navigator.plugins.nxt = {

    	bluetooth: window.navigator.mozBluetooth, //nsIDOMBluetoothManager
    	adapter: null, //nsIDOMBluetoothAdapter
    	device: null, //nsIDOMBluetoothDevice
    	socket: null, //nsIDOMBluetoothSocket

        connect: function (successCallback, errorCallback, options) {
            console.log('nxt.connect');

            if (!this.bluetooth) {
            	errorCallback('window.navigator.mozBluetooth is undefined');
            	return;
			}

			if (!this.bluetooth.enabled) {
				errorCallback('bluetooth is  unavailable or turned off');
      			return;
    		}

    		console.log('getting default bt adapter...');
    		var reqAdapter = this.bluetooth.getDefaultAdapter(),
    			me = this;
    		reqAdapter.onsuccess = function () {
    			console.log('got default bt adapter');
      			me.adapter = reqAdapter.result;
      			// TODO check for null
      			
      			var reqParedDevices = me.adapter.getPairedDevices();
      			reqParedDevices.onsuccess = function () {
      				console.log('reqParedDevices.onsuccess');
      				// check that we have paired device
      				if (!reqParedDevices.result || reqParedDevices.result.length < 1) {
						errorCallback("No paired devices found");
					}
					
					me.device = reqParedDevices.result[0];
					me.traceDeviceInfo(me.device);
					
					// TODO check for device.connected+ connect if required
					try {
						// we must provide DOMString aServiceUuid, try null
						me.socket = me.device.createRfcommSocket(null);
					} catch (e) {
						errorCallback(e.message);
						return;
					}
					successCallback();

      			}
      		}

      		// TODO add onerror handlers
        },
        
        motorRun: function (successCallback, errorCallback, options) {
        	console.log('nxt.motorRun()');
  
  			successCallback();      
        },

        traceDeviceInfo: function(device) {
        	console.log('Device:' + 
        		' address='+ device.address +
        		' name='+ device.name +
        		' connected='+ device.connected +
        		' paired='+ device.paired +
        		' serviceUuids='+ device.serviceUuids);
			  
			  var result = [];
			  for (var id in device) {
			    try {
			      //if (typeof(device[id]) == "function") {
			        result.push(id);
			      //}
			    } catch (err) {
			      result.push(id + ": inaccessible");
			    }
			  }

			  console.log("Available methods/properties: " + result.join(", "));

        }
    };
});