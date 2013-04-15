// JavaScript Document

// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
    //navigator.splashscreen.hide();
    //scan();
}

// Restarts the actual App
function restart() {
    onDeviceReady();
}

// Uses modalView to show a notification message
function showMessage(message) {
	$("#message").html(message);
    $("#modalview-notification").data("kendoMobileModalView").open();
}
            
function closeModalViewNotification() {
	$("#modalview-notification").kendoMobileModalView("close");
}

// Checks if user already logged otherwise launch the minibroser for logging in
function login() {
    var myToken = window.localStorage.getItem("loginToken");
    if (myToken != null) {
        showMessage('You are already logged');
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
        cb.onLocationChange = function(loc){ urlChanged(loc); };
        if(cb != null) {  cb.showWebPage(authorize_url); }
		}  
}

// Clears all the local storage for logging out
function clearLocalStorage() {
    showMessage('Logged out');
	window.localStorage.clear();
}


// Processes the returned code to determine if signing in was successfull
function urlChanged(loc){
       if (/login_success/.test(loc)) { 
           var fbCode = loc.match(/code=(.*)$/)[1]
           window.localStorage.setItem("loginToken",fbCode);
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
