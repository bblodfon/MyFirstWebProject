function changeXML(){
	// just a function to create the same XML upon startup of the 4.html
	// (with the specific adidas product that is in the html)
	specificid="adidas_shoes.jpg";
	specificdesc="An awesome adidas shoe at an excellent price!"
	specificcost="50";
	
	// Xerata pou leme kai me Ajax i allagi!
	createXML(specificid,specificdesc,specificcost);
	return true;
}


function eraseEditSpace(){
	var editSpace = document.getElementById("editSpace");
	editSpace.innerHTML = "";
}

function checkCost(){
	var id = "cost";
	var price = document.getElementById(id).value;
	var pos = price.search(/^\d+\.?\d*$/); //{digits}(.{digits})
	if (pos != 0) {
		alert("Please enter a number like:\n" +
				"7 or 34.45!");
		document.getElementById(id).focus();
		document.getElementById(id).select();
        return false;
    } else return true;
}

function editProductSpace(id){
	//first erase anything that is in the "edit" space (<div id="editSpace">)! 
	eraseEditSpace();
	
	// ftiakse ton pinaka tou editing (sto sigkekrimeno div):
	var editSpace = document.getElementById("editSpace");
	// Briskoume prota tin grammi pou eimaste:
	var lineid = document.getElementById(id).parentNode.parentNode; // to id edo einai monadiko: id = edit_shoe.jpg
	var fileid = lineid.id; console.log(fileid);
	htmlTxtAddArea = '<table id="tableEditProduct" border="1">' +
					'<tr>' + 
						'<td> Change product picture (from /products folder): <input type="file" id="photoName"/> </td>' +
					'</tr>' +
					'<tr>' + 
						'<td valign="top"> Change Description: <textarea id="productDesc" rows = "5" cols = "50"></textarea> </td>' +
					'</tr>' +
					'<tr>' +
						'<td> Cost/pair: <input type="text" id="cost" onblur="checkCost()"> &euro; '+
					'</tr>' +
					'<tr>' +
						'<td><input type="button" id ="change:' + fileid + '"value="Save changes" onclick="validateAndChange(this.id)"/> ' +
							'<input type="button" id="remove:' + fileid + '" value="Delete product" onclick="deleteProduct(this.id)"/> ' +
							'<input type="button" value="Go back!" onclick="eraseEditSpace()"/> ' +
						'</td>' +
					'</tr>' +
				'</table>';
	editSpace.innerHTML = htmlTxtAddArea;
	
	
	var fileName = "C:\\fakepath\\products\\" + fileid;  //de nmpainei to arxeio me tipota! fileid = shoe.jpg
	var lista = lineid.childNodes;
	console.log(lista);
	
	// apo analisi tou console.log(lista) peirnoume ta parakato pou mas endiaferoun:
	var descr = lista[3].innerText;
	var costosWithEuroSign = lista[5].innerText;
	var spasimo = costosWithEuroSign.split(" ");
	var kostos = spasimo[0];
	console.log(fileName,descr,kostos);
	
	// prosthese ta pedia pou ta pirame apo ton catalogo ston pinaka edit:
	//document.getElementById("photoName").value = fileName; -> den to dexetai, no way!
	document.getElementById("productDesc").value = descr;
	document.getElementById("cost").value = kostos;
	
	document.getElementById("productDesc").focus(); // kane focus kato kato gia na fanei an exeis prosthesei polla proionta!
	
	return true;
}

function addProductSpace(){
	//first erase anything that is in the "edit" space (<div id="editSpace">)! 
	eraseEditSpace();
	
	// ftiakse ton pinaka tou adding (sto sigkekrimeno div):
	var editSpace = document.getElementById("editSpace");
	htmlTxtAddArea = '<table id="tableAddProduct" border="1">' +
					'<tr>' + 
						'<td> Choose product picture (from /products folder): <input type="file" id="photoName"/> </td>' +
					'</tr>' +
					'<tr>' + 
						'<td valign="top"> Description: <textarea id="productDesc" rows = "5" cols = "50"></textarea> </td>' +
					'</tr>' +
					'<tr>' +
						'<td> Cost/pair: <input type="text" id="cost" onblur="checkCost()"> &euro; '+
					'</tr>' +
					'<tr>' +
						'<td><input type="button" value="Add the product!" onclick="validateAndAdd()"/> ' +
							'<input type="button" value="Go back!" onclick="eraseEditSpace()"/> ' +
						'</td>' +
					'</tr>' +
				'</table>';
	editSpace.innerHTML = htmlTxtAddArea;
	document.getElementById("productDesc").focus(); // kane focus kato kato gia na fanei an exeis prosthesei polla proionta!
	return true;
}

function deleteProduct(removeid){
	// i deleteProduct() ekteleitai meta apo ena edit product opote panta iparxei to product kai
	// mporoume na to afairesoume: removeid = remove/shoe.jpg
	console.log("removeid:  " + removeid);
	var remArray = removeid.split(":");
	//console.log(remArray);
	var fileName = remArray[1]; //fileName = shoe.jpg
	console.log("removing " + fileName);
	
	// remove the row with the specific product:
	var trNode = document.getElementById(fileName);
	trNode.parentNode.removeChild(trNode);
	
	// change the number of the products shown in the catalog!(-1)
	var numTxt = document.getElementById("showNumberOfProducts").innerHTML.split(" ");
	console.log(numTxt);
	for (var i=0; numTxt[i] != "<b>"; ++i);
	var num = numTxt[++i];
	numTxt[i] = --num;
	newTxtHtml = numTxt.join(" ");
	document.getElementById("showNumberOfProducts").innerHTML = newTxtHtml;
	
	// erase the edit space
	eraseEditSpace();
	
	// now change the XML with Ajax!!!
	removeProductInXml(fileName);
	
}


function validateAndChange(changeid){
	console.log("changeid:  " + changeid);
	var remArray = changeid.split(":");
	var fileName = remArray[1]; //fileName = shoe.jpg
	var id = fileName;
	
	//validate cost is not empty!!! (desc can be empty, with photo we can do nothing to know!)
	// of course it is very logical to assume never cot is gonna be enpty because
	// it has the previous value and if attemp to change to nothing -> onblur will not let you!!
	var cost = document.getElementById("cost");
	var desc = document.getElementById("productDesc");
	var newPhotoName = document.getElementById("photoName");
	console.log(newPhotoName.value,fileName);
	
	if (cost.value == ""){
		alert("Please fill in the cost for the product!");
		cost.focus();
		return false;
	}
	
	var kostos = cost.value;
	var descr = desc.value;
	
	if (newPhotoName.value == "") {
		// den tin allakse katholou tin photo
		// kane douleia me fileName opos einai
		var newfileName = fileName;
		console.log("Empty file -> keep the old one");
	} else {
		// validate the new picture set by the client
		array = newPhotoName.value.split('\\');
		var n = array.length;
		var newfileName = array[n-1]; // newfileName is something like name_of_shoe.jpg
		// is it the same as before?
		if (newfileName == fileName) {
			// eimaste Ok den xreiazetai elegxos!!!
			console.log("The name of file is the same as before!!!");
		} else {
			// tsekaroume oti den iparxei i foto allou ston katalogo!
			if (document.getElementById(newfileName)){
				alert("There is already a product with such picture!\nPlease choose another!");
				photoName.focus();
				return false;
			}else console.log("OK!Den iparxei allou i photo afti!");
		}
	}
	
	console.log("The things to be changed are for the "+id+" shoe are:\n"+"file: "+newfileName+"\ndesc: "+descr+"\ncost: "+kostos);
	
	// ftiakse tin nea html pou tha antikatastisei tin palia: 
	
	photoRelPath = 'products/' + newfileName;
	// ta kena parakato exoune tromaktiki seimasia giati dinoun ston node <tr> text ipo-nodes kenous
	// pou xreiazontai gia na ginetai sosto indexing stin editProductSpace()
	htmlTxtAddProduct = '   ' + '<td> <img src="' + photoRelPath + '" width="150" height="150"/> </td>  ' +
							'<td align="left" valign="top" width="300"> ' + descr + ' </td> ' +
							'<td width="100" align="center"> ' + kostos + ' &euro; </td>    ' +
							'<td align="center">    ' + 
								'<input type="image" src="images/edit-icon.png" width="50" height="50" id="edit_' + newfileName + 
								'" onclick="editProductSpace(this.id)"/>   ' +
							'</td>   ';
	console.log(htmlTxtAddProduct);
	var tr = document.getElementById(id);
	tr.innerHTML = "";
	tr.innerHTML = htmlTxtAddProduct;
	
	// prepei na allaskoume kai to id tis grammis afou exoume nea foto!
	//document.getElementById(id).setAttribute("id", id); DEN DOULEPSE RE!!!
	var tableArray = document.getElementById("tableCatalog").innerHTML.split(" ");
	console.log("BEFORE:" + document.getElementById("tableCatalog").innerHTML);
	
	var search_id = 'id="' + id + '">';
	for (var i=0; tableArray[i]!=search_id; ++i){
	// do nothing
	}
	
	tableArray[i] = 'id="' + newfileName + '">';
	var newTxtHtml = tableArray.join(" ");
	document.getElementById("tableCatalog").innerHTML = newTxtHtml;
	
	console.log("AFTER:" + document.getElementById("tableCatalog").innerHTML);
	
	// erase the edit space
	eraseEditSpace();
	
	// now change the XML with Ajax!!!
	changeProductInXml(id,newfileName,descr,kostos);
}


function validateAndAdd(){
	//first validate that you have cost and picture of the product (description
	//is not mandatory)
	var photoName = document.getElementById("photoName");
	var desc = document.getElementById("productDesc");
	var cost = document.getElementById("cost");
	
	console.log(photoName.value);
	console.log(desc.value);
	console.log(cost.value);
	
	if (photoName.value == ""){
		alert("Please choose a picture for the product!");
		photoName.focus();
		return false;
	}
	if (cost.value == ""){
		alert("Please fill in the cost for the product!");
		cost.focus();
		return false;
	}
	console.log("ready to add the product!!!");
	
	array = photoName.value.split('\\');
	console.log(array);
	var n = array.length;
	var photoPath = array[n-1]; // photoPath is something like name_of_shoe.jpg
	
	// chech if there is a product with the same picture: the id of the table rows
	// of every product is unique and it's the photoPath
	if (document.getElementById(photoPath)){
		alert("There is a product with the same picture!\n" +
				"Please choose another!");
		photoName.focus();
		return false;
	}
	
	// now you have to add the product on the catalog table:
	photoRelPath = 'products/' + photoPath;
	// ta kena parakato exoune tromaktiki seimasia giati dinoun ston node <tr> text ipo-nodes kenous
	// pou xreiazontai gia na ginetai sosto indexing stin editProductSpace()
	htmlTxtAddProduct = '<tr id="' + photoPath + '">     ' +
							'<td> <img src="' + photoRelPath + '" width="150" height="150"/> </td>   ' +
							'<td align="left" valign="top" width="300"> ' + desc.value + ' </td>    ' +
							'<td width="100" align="center"> ' + cost.value + ' &euro; </td>    ' +
							'<td align="center">      ' + 
								'<input type="image" src="images/edit-icon.png" width="50" height="50" id="edit_' + photoPath + 
								'" onclick="editProductSpace(this.id)"/>     ' +
							'</td>   ' +
						'</tr>   ';
	var table = document.getElementById("tableCatalog");
	table.innerHTML += htmlTxtAddProduct;
	
	// change the number of the products shown in the catalog!(+1)
	var numTxt = document.getElementById("showNumberOfProducts").innerHTML.split(" ");
	console.log(numTxt);
	for (var i=0; numTxt[i] != "<b>"; ++i);
	var num = numTxt[++i];
	numTxt[i] = ++num;
	newTxtHtml = numTxt.join(" ");
	document.getElementById("showNumberOfProducts").innerHTML = newTxtHtml;
	
	// erase the edit space
	eraseEditSpace();
	
	// now change the XML with Ajax!!!
	addProductInXml(photoPath,desc.value,cost.value);
	
}

function removeProductInXml(filename){
	var xmlHttp = createXmlHttpRequestObject();
	
	if (xmlHttp) {
		// try to connect to the server
		console.log(filename);
		var data = 'id=' + escape(filename);
		console.log(data);
		var url = 'removeproduct.php' + '?' + data;
		console.log(url);
		try {
			// initiate reading an XML file from the server
			xmlHttp.open("GET", url, true);
			xmlHttp.onreadystatechange = handleRequestStateChangeRem;
			xmlHttp.send(null);
		} catch (e) {
			alert("Can't connect to server:\n" + e.toString());
		}
	}
}

function createXML(id,desc,cost){
	var xmlHttp = createXmlHttpRequestObject();
	
	if (xmlHttp) {
		// try to connect to the server
		console.log(id,desc,cost);
		var data = 'id=' + escape(id) + '&desc=' + escape(desc) + '&cost=' + escape(cost);
		console.log(data);
		var url = 'createxml.php' + '?' + data;
		console.log(url);
		try {
			// initiate reading an XML file from the server
			xmlHttp.open("GET", url, true);
			xmlHttp.onreadystatechange = handleRequestStateChange;
			xmlHttp.send(null);
		} catch (e) {
			alert("Can't connect to server:\n" + e.toString());
		}
	}
}

function addProductInXml(id,desc,cost){
	var xmlHttp = createXmlHttpRequestObject();
	
	if (xmlHttp) {
		// try to connect to the server
		console.log(id,desc,cost);
		//data = id + ':' + desc + ':' + cost;
		var data = 'id=' + escape(id) + '&desc=' + escape(desc) + '&cost=' + escape(cost);
		console.log(data);
		var url = 'addproduct.php' + '?' + data;
		console.log(url);
		try {
			// initiate reading an XML file from the server
			xmlHttp.open("GET", url, true);
			xmlHttp.onreadystatechange = handleRequestStateChangeAdd;
			xmlHttp.send(null);
		} catch (e) {
			alert("Can't connect to server:\n" + e.toString());
		}
	}
}

function changeProductInXml(id,newfileName,descr,kostos){
	var xmlHttp = createXmlHttpRequestObject();
	
	if (xmlHttp) {
		// try to connect to the server
		console.log(id,newfileName,descr,kostos);
		var data = 'oldfileName=' + escape(id) + '&newfileName=' + escape(newfileName) + '&desc=' + escape(descr) + '&cost=' + escape(kostos);
		console.log(data);
		var url = 'changeproduct.php' + '?' + data;
		console.log(url);
		try {
			// initiate reading an XML file from the server
			xmlHttp.open("GET", url, true);
			xmlHttp.onreadystatechange = handleRequestStateChangeProduct;
			xmlHttp.send(null);
		} catch (e) {
			alert("Can't connect to server:\n" + e.toString());
		}
	}
}

function handleRequestStateChangeProduct(){
	if (xmlHttp.readyState == 4){
		if (xmlHttp.status == 200){
			try {
				// read the message from the server
				var res = xmlHttp.responseText;
				console.log(res);
			} catch(e) {
				alert("Error reading the response: " + e.toString());
			}
		}
		else {
			alert("There was a problem retrieving the data:\n" + xmlHttp.statusText);
		}
	}
}

function handleRequestStateChange(){
	if (xmlHttp.readyState == 4){
		if (xmlHttp.status == 200){
			try {
				// read the message from the server
				var res = xmlHttp.responseText;
				console.log(res);
			} catch(e) {
				alert("Error reading the response: " + e.toString());
			}
		}
		else {
			alert("There was a problem retrieving the data:\n" + xmlHttp.statusText);
		}
	}
}

function handleRequestStateChangeRem(){
	if (xmlHttp.readyState == 4){
		if (xmlHttp.status == 200){
			try {
				// read the message from the server
				var res = xmlHttp.responseText;
				console.log(res);
			} catch(e) {
				alert("Error reading the response: " + e.toString());
			}
		}
		else {
			alert("There was a problem retrieving the data:\n" + xmlHttp.statusText);
		}
	}
}

function handleRequestStateChangeAdd(){
	if (xmlHttp.readyState == 4){
		if (xmlHttp.status == 200){
			try {
				// read the message from the server
				var res = xmlHttp.responseText;
				console.log(res);
				/*var xmlDoc = xmlHttp.responseXML;
				console.log(xmlDoc);
				// obtain the XML's document element
				xmlRoot = xmlDoc.documentElement; //<- edo blepoyme sto <products> kai loipa apo to XML arxeio
				console.log(xmlRoot);
				product = xmlDoc.createElement("product");
				console.log(product); <- ftiaxnei ena <product></product>*/
			} catch(e) {
				alert("Error reading the response: " + e.toString());
			}
		}
		else {
			alert("There was a problem retrieving the data:\n" + xmlHttp.statusText);
		}
	}
}

function createXmlHttpRequestObject(){	
	try {
	// try to create XMLHttpRequest object
	xmlHttp = new XMLHttpRequest();
	} catch(e) {
		try { 
			// try to create XMLHttpRequest object
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {}
	}
	// return the created object or display an error message
	if (!xmlHttp) alert("Error creating the XMLHttpRequest object.");
	else return xmlHttp;
}
