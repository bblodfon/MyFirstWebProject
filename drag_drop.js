var adidasCnt = 0;var pumaCnt = 0;var nbCnt = 0;var asicsCnt = 0;function allowDrop(ev) {	ev.preventDefault();}function drag(ev) {	ev.dataTransfer.setData("Text",ev.target.id);}function drop(ev) {	ev.preventDefault();		var data=ev.dataTransfer.getData("Text"); //alert(data);	var changeid = data + "_box";		// we don't want to drop into the box something that is already inside!!! 	str = data.toString();	var check = str.search("_box");		if (check == -1){		desc = "";		typeOfShoe="";		dropCnt = 0; 		switch (data) {			case "adidas":				++adidasCnt; 				desc = " Adidas shoes";				typeOfShoe = "Adidas";				dropCnt = adidasCnt;				break;			case "puma":				++pumaCnt;				desc = " Puma shoes";				typeOfShoe = "Puma";				dropCnt = pumaCnt;				break;			case "nb":				++nbCnt;				desc = " New Balance shoes";				typeOfShoe = "New";				dropCnt = nbCnt;				break;			default:				++asicsCnt;				desc = " Asics shoes";				typeOfShoe = "Asics";				dropCnt = asicsCnt;		}				if (dropCnt == 1){ // tin proti fora pou bazoume kainourio proion kane to drop tis eikonas			//allakse pragamta stin eikona:			document.getElementById(data).style.width="50px"			document.getElementById(data).style.height="50px"			document.getElementById(data).setAttribute('id', changeid);			// ftiakse klono (me id = changeid -> exei dld kai to "_box") kai balton sto box:			ev.target.appendChild(document.getElementById(changeid).cloneNode(true));						var txt = document.getElementById("left").innerHTML;			document.getElementById("left").innerHTML = txt + desc + " [ " + dropCnt + " ]</br>";			//alert(document.getElementById("left").innerHTML);						//bale stin arxiki eikona ta defaults:			document.getElementById(changeid).setAttribute('id', data);			document.getElementById(data).style.width="150px";			document.getElementById(data).style.height="150px";				} else { // alios apla prepei na allakseis ton Cnt tou proiontos pou einai idi mesa!!!			var txt = document.getElementById("left").innerHTML;			//var txt2 = document.getElementById("puma_box").innerHTML;			//alert(txt2); den to pairnei me tpt!!! -> keno to txt2!						var array = txt.split(" ");			var j = 0;			var newTxt = "";						//for (i = 0; i != array.length; ++i) alert(array[i]);			for (i = 0; i != array.length; ++i){				if (array[i] == typeOfShoe){					//alert(array[i]);					var fin = 0;					for (j = i; j != array.length; ++j){						//alert("array[j]:" + array[j]);						if (array[j] != "[") newTxt += array[j] + " ";						else {							if (fin == 1) newTxt += array[j] + " ";							else //if (fin == 0)							{ // edo bazoume tin nea timi kai olo to ipoloipo string tou innerHTML to kratame to idio!!!								newTxt += " [ " + dropCnt + " ";								j = j + 1;								fin = 1;							}						}						//alert("alert j:" + newTxt);					}					break;				} else { 					newTxt += array[i] + " ";				}				//alert("alert i" + newTxt);			}						document.getElementById("left").innerHTML = newTxt;		}	}}function dropInTrash(ev) {	ev.preventDefault();		var data=ev.dataTransfer.getData("Text"); //alert(data);	// dexomaste mono ta poionta pou einai mesa sto kalathi idi kai meionoume tin posotita kata 1	var check = data.search("_box");	if (check != -1) { // oxi apo tis fotos pou einai pano!!!!		//alert(data);				desc = "";		typeOfShoe="";		dropCnt = 0; 		switch (data) {			case "adidas_box":				--adidasCnt; 				desc = " Adidas shoes";				typeOfShoe = "Adidas";				dropCnt = adidasCnt;				break;			case "puma_box":				--pumaCnt;				desc = " Puma shoes";				typeOfShoe = "Puma";				dropCnt = pumaCnt;				break;			case "nb_box":				--nbCnt;				desc = " New Balance shoes";				typeOfShoe = "New";				dropCnt = nbCnt;				break;			default:				--asicsCnt;				desc = " Asics shoes";				typeOfShoe = "Asics";				dropCnt = asicsCnt;		}		if (dropCnt > 0) {			var txt = document.getElementById("left").innerHTML;			var array = txt.split(" ");			var j = 0;			var newTxt = "";			for (i = 0; i != array.length; ++i){				if (array[i] == typeOfShoe){					var fin = 0;					for (j = i; j != array.length; ++j){						if (array[j] != "[") newTxt += array[j] + " ";						else {							if (fin == 1) newTxt += array[j] + " ";							else //if (fin == 0)							{ // edo bazoume tin nea (meiomeni) timi kai olo to ipoloipo string tou innerHTML to kratame to idio!!!								newTxt += " [ " + dropCnt + " ";								j = j + 1;								fin = 1;							}						}					}					break;				} else { 					newTxt += array[i] + " ";				}			}						document.getElementById("left").innerHTML = newTxt;		} else { // remove the picture, the count, everything that has to do with the spicific shoe!!!						var element = document.getElementById(data);			//remove the image of the shoe			element.parentNode.removeChild(element);						txt = document.getElementById("left").innerHTML;			//alert(txt);			var array = txt.split(" ");			//for (var i = 0; i != array.length; ++i) alert(array[i]);						var newTxt="";			var mpika = 0;			for (var i = 0; i != array.length; ++i){ 								if (array[i] == typeOfShoe){						mpika = 1;					for (var j = i; (array[j] != "]<br>") && (array[j] != "]<br><img"); ++j){					 // NOTHING					}					i = j;				}				//alert("array["+i+"]:" + array[i]);				if ((mpika == 1) && (array[j] == "]<br><img")) {					newTxt += "<img ";									}				if (mpika == 0) {					newTxt += array[i] + " ";					}				mpika = 0;								// an eixes mpei min prostheseis to "]<br>" stoixeio!				//alert("newText:" + newTxt + "              i:" + i +"array.length:" + array.length);			}			document.getElementById("left").innerHTML = newTxt;		}	}		}function clean(){	// clean the trash can!!!	document.getElementById("left").innerHTML = "";	adidasCnt = 0;	pumaCnt = 0;	nbCnt = 0;	asicsCnt = 0;}