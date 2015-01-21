var positions = {};

$(function() {
    $(".drag-image").draggable({
    	drag: function(){
            var offset = $(this).offset();
            var xPos = offset.left;
            var yPos = offset.top;
            $('#info').text('' + $(this).attr('id'));
            $('#posX').text('x: ' + xPos);
            $('#posY').text('y: ' + yPos);
            //positions.push({this.src()});
    	}
    });
});

img1=new Image();
img1.src="afbeeldingen/Grid_Field.png";
img2=new Image();
img2.src="afbeeldingen/Grid_Ribbit.png";
img3=new Image();
img3.src="afbeeldingen/Grid_Aiguillon.png";
img4=new Image();
img4.src="afbeeldingen/Grid_Sorona.png";
img5=new Image();
img5.src="afbeeldingen/Grid_205.png";
img6=new Image();
img6.src="afbeeldingen/Grid_404.png";
img7=new Image();
img7.src="afbeeldingen/Grid_Random.png";

ACHL= new Image();
ACHL.src="afbeeldingen/Awesome_Cup_Mouseover.png";
ACDL= new Image();
ACDL.src="afbeeldingen/Awesome_Cup.png";

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

function changeImage1() {    document.getElementById('myImage').src=img1.src;}
function changeImage2() {    document.getElementById('myImage').src=img2.src;}
function changeImage3() {	document.getElementById('myImage').src=img3.src;}
function changeImage4() {	document.getElementById('myImage').src=img4.src;}
function changeImage5() {	document.getElementById('myImage').src=img5.src;}
function changeImage6() {	document.getElementById('myImage').src=img6.src;}
function changeImage7() {	document.getElementById('myImage').src=img7.src;}

function HLACMap() {document.getElementById('ACMap').src=ACHL.src;}
function DLACMap() {document.getElementById('ACMap').src=ACDL.src;}

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