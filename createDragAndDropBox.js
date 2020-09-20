(function() {

	let body = document.getElementsByTagName('body')[0];

	let container = document.createElement('div');
	container.classList += "addedDropContainer outer";
	container.style.border = "2px dashed rgb(170, 170, 170)";
	container.style.backgroundColor = "rgba(255, 255, 255, 255)";
	container.style.opacity = "1";
	container.style.width = "350px";
	container.style.height = "250px";
	container.style.zIndex = "99";
	container.style.margin = "auto";
	container.style.position = "fixed";
	container.style.display = "block";
	container.style.top = "150px";
	container.style.left = "50px";
	container.style.display = 'table';
	container.style.color = "#111";

	let middle = document.createElement('div');
	middle.style.display = 'table-cell';
	middle.style.verticalAlign = 'middle';

	let inner = document.createElement('div');


	let p = document.createElement('p');
	p.style.textAlign = "center";
	p.style.fontFamily = "calibri";
	p.style.fontSize = "20px";
	p.innerText = "drag and drop a file here";

	let s = document.createElement('div');
	//s.innerText = "x";
	s.id = 'closeDiv';
	s.style.textAlign = "center";
	s.style.verticalAlign = "center";
	s.style.margin = '5px';
	s.style.padding = '3px';
	s.style.float = 'right';
	s.style.fontFamily = "calibri";
	s.style.fontSize = "20px";
	s.style.border = '1px solid #ccc';
	// here it is:
	s.style.position = 'absolute';
	s.style.top = 0;
	s.style.right = 0;
	s.style.display = "table";
	s.style.width = "30px";
	s.style.height = "30px";

	let s2 = document.createElement('div');
	s2.style.display = "table-cell";
	s2.style.verticalAlign = "middle";
	s2.style.fontSize = "10px";
	s2.style.fontWeight = "normal";
	s2.style.fontFamily = "Lucida Sans Unicode";
	s2.innerHTML = "&#10006;";

	s.appendChild(s2);


	inner.appendChild(p);
	middle.appendChild(inner);
	container.appendChild(middle);
	container.appendChild(s);
	body.appendChild(container);


	// the drop event
	// dragenter event listener
	container.addEventListener('dragenter', function(e) {
		e.stopPropagation();
		e.preventDefault();
		this.style.border = '2px dashed rgb(50, 50, 50)';
	}, false);

	// dragover event listener
	container.addEventListener('dragover', function(e) {
		e.stopPropagation();
		e.preventDefault();
		this.style.border = '2px dashed rgb(50, 50, 50)';
	}, false);

	// dragleave event listener
	container.addEventListener('dragleave', function(e) {
		e.stopPropagation();
		e.preventDefault();
		this.style.border = '2px dashed rgb(170, 170, 170)';
	}, false);

	container.addEventListener('drop', function(e) {
		e.stopPropagation();
		e.preventDefault();
		this.style.border = '2px dashed rgb(170, 170, 170)';

		let file = e.dataTransfer.files[0];
		
		let fileExtension = file.name.split('.')[file.name.split('.').length-1];
		//console.log(fileExtension);

		let isExcelFile = false;

		if (fileExtension === 'xlsx') {
			isExcelFile = true;
		}		
		
		/* 1. make a fileReader object */
		var reader = new FileReader();
			
		/* 2. we define what happens when the fileReader is done reading something */
		reader.addEventListener('load', function(e) {
			var data = e.target.result;
			//console.log(fileContentAsText);
			
			if (isExcelFile) {
				parseDataIfExcelFile(data);
			} else {
				console.log(data);
			}

		}, false);


    /* 3. use the fileReader object to read the file, and return a string */
    // in the case of xlsx file, we use readAsBinaryString as opposed to readAsText
    if (fileExtension == 'xlsx') {
		  reader.readAsBinaryString(e.dataTransfer.files[0]); 	
    } else {
		  reader.readAsText(e.dataTransfer.files[0]);
    }

	}, false);

	s.addEventListener('mouseenter', function(e) {
		s.style.backgroundColor = "#ccc";
		s2.style.fontSize = "14px";
		s2.style.fontWeight = "bold";
		s2.style.cursor = "default";
	});
	s.addEventListener('mouseover', function(e) {
		s.style.backgroundColor = "#ccc";
		s2.style.fontSize = "14px";
		s2.style.fontWeight = "bold";
		s2.style.cursor = "default";
	});
	s.addEventListener('mouseleave', function(e) {
		s.style.backgroundColor = "#fff";
		s2.style.fontSize = "10px";
		s2.style.fontWeight = "normal";
	});
	s.addEventListener('click', function(e) {
		console.log(this);
		container.parentNode.removeChild(container);
	});

})();
