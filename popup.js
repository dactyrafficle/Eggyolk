



// create the popup to drag and drop
let lebutton = document.getElementById('lebutton');

lebutton.addEventListener('click', function(e) {

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{file: "createDragAndDropBox.js"}
		); 
	});
  
});

