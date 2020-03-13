let labyV1 =[
    [false,false,false,false,false,false,false,false,false,false],
    [true,true,true,false,false,true,true,true,false,false],
    [false,false,true,false,false,true,true,false,false,true],
    [false,true,true,true,true,true,true,false,true,true],
    [false,true,true,true,true,true,true,false,true,false],
    [false,false,false,false,false,true,true,false,true,false],
    [false,true,false,true,true,true,false,true,true,false],
    [false,true,false,true,true,true,false,true,true,false],
    [false,true,true,true,true,true,true,true,false,false],
    [false,false,false,false,false,false,false,false,false,false]
];
let labyV2 =[
    [false,false,false,false,false,false,false,false,false,false],
    [true,true,true,true,true,true,true,true,true,false],
    [false,false,false,true,false,false,false,false,true,false],
    [false,true,true,true,false,false,true,true,true,false],
    [false,true,false,true,false,false,true,false,false,false],
    [false,true,false,true,false,false,true,false,false,false],
    [false,true,false,false,false,true,true,true,true,false],
    [false,true,false,false,false,true,false,false,true,false],
    [false,true,true,true,true,true,false,true,true,false],
    [false,false,false,false,false,false,false,true,false,false]
];
let posx=0;
let posy=0;

function set_laby(laby)
{
    let table = "";
    let x=0;
    let y=0;
    for (x=0;x!=10;x++)
    {
        table+="<tr>"
        for (y=0;y!=10;y++)
        {
            
            if (laby[x][y]){
                table+="<td id="+"linelabytrue"+"></td>";
            }else if (laby[x][y]==="pacman"){
                table+="<td><img src="+"'img/pacman.gif'"+"alt="+"'pacman'"+"></td>";
            }else{
                table+="<td id="+"linelabyfalse"+"></td>";
            }
        }
        table+="</tr>"
        document.getElementById("laby_set").innerHTML=table;
    }
}
function set_perso(laby)
{
    let x=0;
    let laby_jeu=laby;
    for (x=0;x!=10;x++)
    {
        if (laby[x][0])
        {
            posx=x;
            posy=0;
            laby_jeu[x][0] = "pacman";
        }
    }
    return laby_jeu;
}
function labyrinthe(laby)
{
    let laby_jeu=set_perso(laby);
    set_laby(laby_jeu);
}
function move() {}
    
let startTime = 0
let start = 0
let end = 0
let diff = 0
let timerID = 0
function chrono(){
	end = new Date()
	diff = end - start
	diff = new Date(diff)
	let msec = diff.getMilliseconds()
	let sec = diff.getSeconds()
	let min = diff.getMinutes()
	let hr = diff.getHours()-4
	if (min < 10){
		min = "0" + min
	}
	if (sec < 10){
		sec = "0" + sec
	}
	if(msec < 10){
		msec = "00" +msec
	}
	else if(msec < 100){
		msec = "0" +msec
	}
	document.getElementById("chronotime").value = hr + ":" + min + ":" + sec + ":" + msec
	timerID = setTimeout("chrono()", 10)
}
function chronoStart(){
	document.chronoForm.startstop.value = "stop!"
	document.chronoForm.startstop.onclick = chronoStop
	document.chronoForm.reset.onclick = chronoReset
	start = new Date()
	chrono()
}
function chronoContinue(){
	document.chronoForm.startstop.value = "stop!"
	document.chronoForm.startstop.onclick = chronoStop
	document.chronoForm.reset.onclick = chronoReset
	start = new Date()-diff
	start = new Date(start)
	chrono()
}
function chronoReset(){
	document.getElementById("chronotime").value = "0:00:00:000"
	start = new Date()
}
function chronoStopReset(){
	document.getElementById("chronotime").value = "0:00:00:000"
	document.chronoForm.startstop.onclick = chronoStart
}
function chronoStop(){
	document.chronoForm.startstop.value = "start!"
	document.chronoForm.startstop.onclick = chronoContinue
	document.chronoForm.reset.onclick = chronoStopReset
	clearTimeout(timerID)
}