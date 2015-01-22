//array to store position of the nauts, offsets mapped by id
var positions = new Array();
//part of the id that, this is prefixed in the draggable hmtl object
var DRAG_PREFIX = 'draggable';

/*
 * obj - dragable image
 */
function storePos(obj) {
    //get and store the relative position in positions array
    var dragId = obj.attr('id').replace(DRAG_PREFIX,'');
    var top = removePx(obj.css('top'));
    var left = removePx(obj.css('left'));
    positions[dragId] = {'top' : top, 'left' : left};

    //debug log
    $('#info').text('');
    $('#info').text(getUrl());
    for (var i = 1; i < positions.length; i++) {
    	if(positions[i] != undefined){
    		$('#info').append('<br />'+i + ' ' + positions[i].top + ' ' + positions[i].left);
    	}
    }
    //debug log
}

/*
 * Update the link in <a class="share-link-a"> based on offsets stored in the position array
 */
function generateAndReplaceShareLink() {
  //get url and make base link
	var link = getUrl()+'?p=';
  //false if first position is not added yet
	var firstAdded = false;
  //add a position for each image seperated by ,
	for (var i = 1; i < positions.length; i++) {
		if(positions[i] != null){
      //only add , if not the first position
			if(firstAdded){ link += ','; }
      //add position to link - id,top_offset,left_offset
			link += i+','+positions[i].top+','+positions[i].left;
			firstAdded = true;
		}
	}
  //replace the link in the input box
  $(".share-input").attr('value', link);
}

/*
 * drag trigger
 */
$(function() {
    $(".drag-image").draggable({
    	drag: function(){
    		//update locations in positions
    		storePos($(this));
        //update link
        generateAndReplaceShareLink();
    	}
  	});
});

/*
 * initial position
 */
$(document).ready(function() {
  //get url parameter p
	var pos = QueryString.p;
	if(pos != undefined){
    //split values
		var posArr = pos.split(",");
    //loop per 3 values TODO: better error checking, currently very easy to break
		for (var i = 0; i < posArr.length; i = i+3) {
      //select the dragable object
			var dragObj = $('#'+DRAG_PREFIX+posArr[i]);
      //set the initital postion using css
			dragObj.css({'position':'releative','top':posArr[i+1]+'px','left':posArr[i+2]+'px'});
      //store the position set
			storePos(dragObj);
		}
    //update link
    generateAndReplaceShareLink();
	}
});


/*
 * Snippets
 */
var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  }
    return query_string;
} ();

//remove px from a string
function removePx(string) {
    return string.replace('px','');
}

//get current url
function getUrl(){
    var l = window.location;
    var url = l.protocol + "//" + l.host + "/" + l.pathname;
    return url;
}

/*
 * Generated code
 */
img2=new Image();
img2.src="afbeeldingen/Ribbit_Icon_Orb.png";
img3=new Image();
img3.src="afbeeldingen/Aiguillon_Icon_Orb.png";
img4=new Image();
img4.src="afbeeldingen/Sorona_Icon_Orb.png";
img5=new Image();
img5.src="afbeeldingen/AI_Station_205_Icon_Orb.png";
img6=new Image();
img6.src="afbeeldingen/AI_Station_404_Icon_Orb.png";
img7=new Image();
img7.src="afbeeldingen/Black_Orb.png";

RibbitHL= new Image();
RibbitHL.src="afbeeldingen/Ribbit_Mouseover.png";
RibbitDL= new Image();
RibbitDL.src="afbeeldingen/Ribbit_Icon.png";

AiguillonHL= new Image();
AiguillonHL.src="afbeeldingen/Aiguillon_Mouseover.png";
AiguillonDL= new Image();
AiguillonDL.src="afbeeldingen/Aiguillon_Icon.png";

SoronaHL= new Image();
SoronaHL.src="afbeeldingen/Sorona_Mouseover.png";
SoronaDL= new Image();
SoronaDL.src="afbeeldingen/Sorona_Icon.png";

AI_Station_205HL= new Image();
AI_Station_205HL.src="afbeeldingen/AI_Station_205_Mouseover.png";
AI_Station_205DL= new Image();
AI_Station_205DL.src="afbeeldingen/AI_Station_205_Icon.png";

AI_Station_404HL= new Image();
AI_Station_404HL.src="afbeeldingen/AI_Station_404_Mouseover.png";
AI_Station_404DL= new Image();
AI_Station_404DL.src="afbeeldingen/AI_Station_404_Icon.png";

RandomHL= new Image();
RandomHL.src="afbeeldingen/Random_Mouseover.png";
RandomDL= new Image();
RandomDL.src="afbeeldingen/Random_Icon.png";

function changeImage2() { document.getElementById('FirstSphere').src=img2.src;}
function changeImage3() {	document.getElementById('SecondSphere').src=img3.src;}
function changeImage4() {	document.getElementById('ThirdSphere').src=img4.src;}
function changeImage5() {	document.getElementById('FourthSphere').src=img5.src;}
function changeImage6() {	document.getElementById('FifthSphere').src=img6.src;}
function changeImage7() {	document.getElementById('FirstSphere').src=img7.src; document.getElementById('SecondSphere').src=img7.src; document.getElementById('ThirdSphere').src=img7.src; document.getElementById('FourthSphere').src=img7.src; document.getElementById('FifthSphere').src=img7.src;}

function HLRibbit() {document.getElementById('RibbitMap').src=RibbitHL.src;}
function DLRibbit() {document.getElementById('RibbitMap').src=RibbitDL.src;}

function HLAiguillon() {document.getElementById('AiguillonMap').src=AiguillonHL.src;}
function DLAiguillon() {document.getElementById('AiguillonMap').src=AiguillonDL.src;}

function HLSorona() {document.getElementById('SoronaMap').src=SoronaHL.src;}
function DLSorona() {document.getElementById('SoronaMap').src=SoronaDL.src;}

function HLAI_Station_205() {document.getElementById('AI_Station_205_Map').src=AI_Station_205HL.src;}
function DLAI_Station_205() {document.getElementById('AI_Station_205_Map').src=AI_Station_205DL.src;}

function HLAI_Station_404() {document.getElementById('AI_Station_404_Map').src=AI_Station_404HL.src;}
function DLAI_Station_404() {document.getElementById('AI_Station_404_Map').src=AI_Station_404DL.src;}

function HLRandom() {document.getElementById('Random_Map').src=RandomHL.src;}
function DLRandom() {document.getElementById('Random_Map').src=RandomDL.src;}