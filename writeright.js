/*var port = chrome.extension.connect();

window.addEventListener("message", function(event){
	console.log(event);
	if ( event.source != window )
	{
		return;
	}

	if ( event.data.type && (event.data.type == "FROM_PAGE") )
	{
		console.log('rcv: '+event.data.text);
		port.postMessage(event.data.text);
	}
}, false);
*/
/*var port = chrome.extension.connect();*/

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if ( request.message == "setFocusedElementText" )
		{
			var currentElement = document.activeElement;
			var currentText = currentElement.value;

			/*
			var currentCaretPos = 0;
			if ( currentElement.selectionStart ) {
				currentCaretPos = currentElement.selectionStart;
			}
			else if ( document.selection ) {
				currentElement.focus();
				var r = document.selection.createRange();
				if ( r == null ) {
					currentCaretPos = -1;
				}
				else
				{
					var textRange = currentElement.createTextRange();
					var duped = textRange.duplicate();
					textRange.moveToBookmark(r.getBookmark());
					duped.setEndPoint('EndToStart', textRange);
					currentCaretPos = duped.text.length;
				}
			}
			*/
			//console.log(request.originalSelectionText);
			//console.log(currentText);
			document.activeElement.value = currentText.replace(request.originalSelectionText, request.newSelectionText);
		}
	}
);