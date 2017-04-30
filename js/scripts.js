//array to store position of the nauts, offsets mapped by id
var positions = [];
//part of the id that, this is prefixed in the draggable hmtl object
var nautIcons = [ '', //all the original shares started at 1 instead of 0
                  'Froggy_G_Icon',
                  'Sheriff_Lonestar_Icon',
                  'Leon_Chameleon_Icon',
                  'Scoop_Icon',
                  'Gnaw_Icon',
                  'Raelynn_Icon',
                  'Ayla_Icon',
                  'Clunk_Icon',
                  'Voltar_Icon',
                  'Coco_Icon',
                  'Skolldir_Icon',
                  'Yuri_Icon',
                  'Derpl_Icon',
                  'Vinnie_Icon',
                  'Genji_Icon',
                  'Swiggins_Icon',
                  'Ted_Icon',
                  'Penny_Icon',
                  'Sentry_Icon',
                  'Skree_Icon',
                  'Nibbs_Icon',
				  'Rocco_Icon',
				  'Ksenia_Icon',
				  'Yoolip_Icon',
				  'Chucho_Icon',
				  'Amy_Icon',
				  'Ix_Icon',
				  'Max_Icon',
				  'Deadlift_Icon'
				  ];
var DRAG_PREFIX = 'draggable';

/*
 * Doc ready
 */
$(document).ready(function() {
  //load naut icons and run setup after loading
  loadNauts();
});

/*
 * loading nauts from jquery, because dom loading and applying drag on those elements was causing rendering errors for some people. 
 */
function loadNauts(){
  //start load count at 1 because the first naut entry is empty
  var loadCount = 1;
  var nautContainer = $('#nautcontainer');

  //loop over all nauts, start at 1 because the first naut entry is empty
  for(var i = 1; i < nautIcons.length; i++){
    //add element and make it dragable
    nautContainer.append('<img class="drag-image" id="draggable'+i+'"/>');
    //add a break every 4 icons
    if(i % 4 === 0){
      nautContainer.append('<br />');
    }
    //load image for created draggable, executed function when done loading
    $('#draggable'+i).load(function() {
      //increment loadcount when all are loaded run setup
      loadCount++;
      if(loadCount === nautIcons.length){
        setup();
      }
    }).attr('src', 'afbeeldingen/'+nautIcons[i]+'.png');
  }
}

/*
 * setup the site
 */
function setup(){
  setupInitialPositions();
  setupInitialMaps();
  setupInitialLeague();
  setupInitialVersion();
  setupDragTriggers();
  setupMapButtons();
  setUpLeagueButtons();
  setUpVersionButtons();
}

/*
 * obj - dragable image
 */
function storePos(obj) {
    //get and store the relative position in positions array
    var dragId = obj.attr('id').replace(DRAG_PREFIX,'');
    var top = removePx(obj.css('top'));
    var left = removePx(obj.css('left'));
    positions[dragId] = {'top' : top, 'left' : left};

    logPositions();
}

/*
 * Update the link in <a class="share-link-a"> based on offsets stored in the position array
 */
function generateAndReplaceShareLink() {
  //get url and make base link
	var link = getUrl()+'?';
  //ad positions, maps
  link = addDragPositionsToLink(link);
  link = addMapsToLink(link);
  link = addLeagueToLink(link);
  link = addVersionToLink(link);
  //replace the link in the input box
  $(".share-input").attr('value', link);
}

/*
 * Adds the positions to a string
 */
function addDragPositionsToLink(link){
  //add parameter
  link += 'p=';
  //false if first position is not added yet
  var firstAdded = false;
  //add a position for each image seperated by ,
  for (var i = 1; i < positions.length; i++) {
    if(positions[i] !== undefined){
      //only add ',' if not the first position
      if(firstAdded){ link += ','; }
      //add position to link - id,top_offset,left_offset
      link += i+','+positions[i].top+','+positions[i].left;
      firstAdded = true;
    }
  }
  return link;
}

/*
 * Adds the maps to a string
 */
function addMapsToLink(link){
  //trac if a map is selected
  var aMapSelected = false;
  //add parameter
  var mlink = '&m=';
  //add a '1' selected ot '0' not selected for each map
  for (var i = 0; i < mapSpheres.length; i++) {
    if(mapSpheres[i].selected) {
      mlink += '1';
      aMapSelected = true;
    } else {
      mlink += '0';
    }
  }
  //return empty string if no maps selected
  if(!aMapSelected){
    return link;
  }
  return link + mlink;
}

/*
 * Adds the league to a string
 */
function addLeagueToLink(link){
	//if league is default no need add
	if(currentIcon === 0){
		return link;
	}
	//add parameter and currentLeague
  link += '&l=' + currentIcon;
  return link;
}

/*
 * Adds the version to a string
 */
function addVersionToLink(link){
  if(curVersion === undefined || curVersion === $("#version option:first").val()) {
   return link;
  }
  //add parameter and current version
  link += '&v=' + curVersion;
  return link;
}

/*
 * drag trigger
 */
function setupDragTriggers(){
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
}

//array containing league Images
var leagueIcons = ['afbeeldingen/Competitive.png','afbeeldingen/League_1.png','afbeeldingen/League_2.png','afbeeldingen/League_3.png','afbeeldingen/League_5.png','afbeeldingen/League_9.png'];
var currentIcon = 0;

function loadLeagueIcon(){
	$('#Competitive').attr('src',leagueIcons[currentIcon]);
}

/*
 * image trigger
 */
function setUpLeagueButtons(){
	$('#LeagueIcon').click(function(event) {
		//cycle image
		cycleLeagueImage();
		//update share
		generateAndReplaceShareLink();
	});
}

/*
 * cycle league image
 */
function cycleLeagueImage(){
	currentIcon++;
	if(currentIcon == leagueIcons.length){
		currentIcon = 0;
	}
	loadLeagueIcon();
}

//array containing mapSphereImages
var mapSpheres = new Array(
  { 'selectId' : '#RibbitMap',    'orbId' : '#FirstSphere',  'src' : 'afbeeldingen/Ribbit_Icon_Orb.png',    'selected' : false, },
  { 'selectId' : '#AiguillonMap', 'orbId' : '#SecondSphere', 'src' : 'afbeeldingen/Aiguillon_Icon_Orb.png', 'selected' : false, },
  { 'selectId' : '#SoronaMap',    'orbId' : '#ThirdSphere',  'src' : 'afbeeldingen/Sorona_Icon_Orb.png',    'selected' : false, },
  { 'selectId' : '#AI_Station_205_Map', 'orbId' : '#FourthSphere', 'src' : 'afbeeldingen/AI_Station_205_Icon_Orb.png', 'selected' : false, },
  { 'selectId' : '#Starstorm_Station_Map', 'orbId' : '#FifthSphere',  'src' : 'afbeeldingen/Starstorm_Station_Icon_Orb.png', 'selected' : false, }
);
var mapSphereBlack = 'afbeeldingen/Black_Orb.png';

/*
 * map buttons
 */
function setupMapButtons(){
  //set map triggers
  //TODO for loop $.click anonimous function can't acces mapSpheres, find out why and solve
  $(mapSpheres[0].selectId).click(function(event) {
    $(mapSpheres[0].orbId).attr('src',mapSpheres[0].src);
    mapSpheres[0].selected = true;
    logMaps();
    generateAndReplaceShareLink();
  });
  $(mapSpheres[1].selectId).click(function(event) {
    $(mapSpheres[1].orbId).attr('src',mapSpheres[1].src);
    mapSpheres[1].selected = true;
    logMaps();
    generateAndReplaceShareLink();
  });
  $(mapSpheres[2].selectId).click(function(event) {
    $(mapSpheres[2].orbId).attr('src',mapSpheres[2].src);
    mapSpheres[2].selected = true;
    logMaps();
    generateAndReplaceShareLink();
  });
  $(mapSpheres[3].selectId).click(function(event) {
    $(mapSpheres[3].orbId).attr('src',mapSpheres[3].src);
    mapSpheres[3].selected = true;
    logMaps();
    generateAndReplaceShareLink();
  });
  $(mapSpheres[4].selectId).click(function(event) {
    $(mapSpheres[4].orbId).attr('src',mapSpheres[4].src);
    mapSpheres[4].selected = true;
    logMaps();
    generateAndReplaceShareLink();
  });

  //reset spheres to blank
  $('#Random_Map').click(function(event) {
    $('.mapsphere').each(function() {
      //reset values in array
      for (var i = 0; i < mapSpheres.length; i++){
        mapSpheres[i].selected = false;
      }
      //fill the orbs
      fillMapOrbs();
      //update share link
      generateAndReplaceShareLink();
    });
  });
}

/*
 * sets maps images accoring to whether they are selected yes/no
 */
function fillMapOrbs(){
  for (var i = 0; i < mapSpheres.length; i++){
    var map = mapSpheres[i];
    if (map.selected) {
      $(map.orbId).attr('src',map.src);
    } else {
      $(map.orbId).attr('src',mapSphereBlack);
    }
  }
  logMaps();
}


var curVersion = $('#version').val();
/*
 * setup the patch select
 */
function setUpVersionButtons() {
  $('#version').change(function(event) {
    curVersion = $('#version').val();
    logVersion();
    generateAndReplaceShareLink();
  });
}

/*
 * initial position
 */
function setupInitialPositions(){
  //get url parameter p
  var pos = QueryString.p;
  if (pos !== undefined && pos !== ''){
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
}

/*
 * initial maps
 */
function setupInitialMaps(){
  //get url parameter m
  var maps = QueryString.m;
  if (maps !== undefined && maps !== ''){
    for (var i = 0; i < maps.length; i++) {
      if(maps.charAt(i) == '1'){
        mapSpheres[i].selected = true;
      }
    }
    fillMapOrbs();
  }

}

/*
 * initial league
 */
function setupInitialLeague(){
	//get url parameter l
	var l = QueryString.l;
	if (l !== undefined && l !== ''){
		currentIcon = l;
		loadLeagueIcon();
	}
}

/*
 * initial version
 */
function setupInitialVersion(){
  //get url parameter
  var v = QueryString.v;
  if(v !== undefined && v !== ''){
    curVersion = v;
    $('#version').val(curVersion);
  }
}

/*
 * log functions
 */
function logMaps(){
  $('#info').text(mapSpheres.length + ' maps');
  for (var i = 0; i < mapSpheres.length; i++){
    $('#info').append('<br /> map ' + mapSpheres[i].selectId + ' : ' + mapSpheres[i].selected);
  }
}

function logLeague(){
	$('#info').text(currentIcon);
}

function logPositions(){
    $('#info').text('');
    $('#info').text(getUrl());
    for (var i = 1; i < positions.length; i++) {
      if(positions[i] !== undefined){
        $('#info').append('<br />'+i + ' ' + positions[i].top + ' ' + positions[i].left);
      }
    }
}

function logVersion(){
  $('#info').text(curVersion);
}

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
    var url = l.protocol + "//" + l.host + l.pathname;
    return url;
}

/*
 * Generated code
 */
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

Starstorm_StationHL= new Image();
Starstorm_StationHL.src="afbeeldingen/Starstorm_Station_Mouseover.png";
Starstorm_StationDL= new Image();
Starstorm_StationDL.src="afbeeldingen/Starstorm_Station_Icon.png";

RandomHL= new Image();
RandomHL.src="afbeeldingen/Random_Mouseover.png";
RandomDL= new Image();
RandomDL.src="afbeeldingen/Random_Icon.png";

function HLRibbit() {document.getElementById('RibbitMap').src=RibbitHL.src;}
function DLRibbit() {document.getElementById('RibbitMap').src=RibbitDL.src;}

function HLAiguillon() {document.getElementById('AiguillonMap').src=AiguillonHL.src;}
function DLAiguillon() {document.getElementById('AiguillonMap').src=AiguillonDL.src;}

function HLSorona() {document.getElementById('SoronaMap').src=SoronaHL.src;}
function DLSorona() {document.getElementById('SoronaMap').src=SoronaDL.src;}

function HLAI_Station_205() {document.getElementById('AI_Station_205_Map').src=AI_Station_205HL.src;}
function DLAI_Station_205() {document.getElementById('AI_Station_205_Map').src=AI_Station_205DL.src;}

function HLStarstorm_Station() {document.getElementById('Starstorm_Station_Map').src=Starstorm_StationHL.src;}
function DLStarstorm_Station() {document.getElementById('Starstorm_Station_Map').src=Starstorm_StationDL.src;}

function HLRandom() {document.getElementById('Random_Map').src=RandomHL.src;}
function DLRandom() {document.getElementById('Random_Map').src=RandomDL.src;}
