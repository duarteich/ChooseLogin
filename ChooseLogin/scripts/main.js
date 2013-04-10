// JavaScript Document

// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
    navigator.splashscreen.hide();
    scan();
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
}

function restart() {
    onDeviceReady();
}

//=======================Say Hello (Page 1) Operations=======================//
function login() {
    var myToken = window.localStorage.getItem("FBToken");
    if (myToken != null) {
         alert('You are already logged');
    }
    else{
		var my_client_id  = "511268432270812",
        my_redirect_uri   = "http://www.facebook.com/connect/login_success.html",
        my_display        = "touch"
        var authorize_url  = "https://graph.facebook.com/oauth/authorize?";
        authorize_url += "client_id="+my_client_id;
        authorize_url += "&redirect_uri="+my_redirect_uri;
        authorize_url += "&display="+my_display;
        authorize_url += "&scope=publish_stream"
        cb = window.plugins.childBrowser
        cb.onLocationChange = function(loc){ facebookLocChanged(loc); };
        if(cb != null) {  cb.showWebPage(authorize_url); }
		}  
}

function ClearLocalStorage() {
    alert('Logged out');
	window.localStorage.clear();
}

function facebookLocChanged(loc){
       /* Here we check if the url is the login success */
       if (/login_success/.test(loc)) { 
           var fbCode = loc.match(/code=(.*)$/)[1]
           window.localStorage.setItem("FBToken",fbCode);
            window.plugins.childBrowser.close();
           app.navigate("#tabstrip-home");
       }
}

function scan() {
		window.plugins.barcodeScanner.scan(
			function(result) {
				if (!result.cancelled) {
                    console.log("Go to addMessageToLog");
					addMessageToLog(result.text);    
				}
			}, 
			function(error) {
				console.log("Scanning failed: " + error);
			});
}

function addMessageToLog(message) {
    var obj = JSON.parse(message);
    var loginType = obj[0].type;
    console.log("tipo: "+loginType);
    if(loginType == 'normal') {
        app.navigate("#normal-login");
    }
    else {
        app.navigate("#tabstrip-home");
    }
}
