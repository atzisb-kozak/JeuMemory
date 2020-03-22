let checkflip = 0;
let backcard = "";
let tablemodel=["JDG","IRONMAN","ARIANA","JB","MINECRAFT","WORLD"];
let tablecard=[];
let nbcoup=0;
let collums=0;
let row=0;
class chronometre
{
	constructor()
	{
		this.depart = 0
		this.arrive = 0
		this.difference = 0
		this.IDTimer = 0
	}
	chrono()
	{
		this.arrive = new Date()
		this.difference = this.arrive - this.depart
        this.difference = new Date(this.difference)
        let msec= this.difference.getMilliseconds()
		let sec = this.difference.getSeconds()
		let min = this.difference.getMinutes()
		let hr = this.difference.getHours()-4
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
		$('.timer').children("p").text(hr + ":" + min + ":" + sec + ":" + msec)
		this.IDTimer = setTimeout("chronometer.chrono()", 10)
	}
	chronodepart(){
		this.depart = new Date()
		this.chrono()
	}
	chronoStop(){
		clearTimeout(this.IDTimer)
	}
	chronoReset(){
		$('.timer').children("p").text("0:00:00:000")
		this.depart = new Date()
	}
}

let chronometer=new chronometre();
class card{
    constructor(imgback,imgfront,idcard)
    {
        this.imgBack=imgback;
        this.imgFront=imgfront;
        this.isFlipped=false;
        this.id=idcard;
        this.idsection = idcard+'section';
        this.idfront = idcard+'front';
        this.idback = idcard+'back';
    }
    set_tags()
    {
        var section = $('<section></section>');
        var block = $('<div></div>');
        var front = $('<div></div>');
        var back = $('<div></div>');
        var backimg = $('<img></img>');
        var frontimg = $('<img></img>');
        var id2='#'+this.id;
        var idfront2='#'+this.idfront;
        var idback2='#'+this.idback;
        var idsection2='#'+this.idsection;

        section.attr("id",this.idsection);
        section.addClass("container");

        block.attr("id",this.id);
        block.addClass("card");
        
        front.addClass("front");
        front.attr("id",this.idfront);
        frontimg.attr("src",this.imgFront);
        
        back.addClass("back");
        back.attr("id",this.idback);
        backimg.attr("src",this.imgBack);
        
        $('.table').append(section);
        $(idsection2).append(block);
        $(id2).append(front,back);
        $(idfront2).append(frontimg);
        $(idback2).append(backimg);
    }
    flip() 
    {
        var id2='#'+this.id;
        $(id2).addClass('flipped');
        this.isFlipped = true;
    }
    unflip()
    {
        var id2='#'+this.id;
        $(id2).removeClass('flipped');
        this.isFlipped=false;
    }
}
let lastcard =new card("","","");
$(document).ready(()=>{
    setGame();
});
function setGame()
{
    $('.bc').click(function(){
        var backimg = $(this).children().attr("src");
        backcard = backimg;
        backimg=backimg.substring(9,backimg.length-4);
        $('#selectbc').text("Vous avez choisi le fond "+backimg)
    });
    $('.mode').click(function(){
        if($(this).attr("id")=="2/3")
        {
            row=2;
            collums=3;
            $('.table').css("margin","auto")
            $('.table').css("grid-template-columns","repeat("+collums+",1fr)");
            $('#selectlv').text("Vous avez choisi le mode "+row+"/"+collums+"; Appuyer sur JOUER pour commencer");
        }
        if($(this).attr("id")=="3/6")
        {
            row=3;
            collums=6;
            $('.table').css("margin-left","10%")
            $('.table').css("grid-template-columns","repeat("+collums+",1fr)");
            $('#selectlv').text("Vous avez choisi le mode "+row+"/"+collums+"; Appuyer sur JOUER pour commencer");
        }
        if($(this).attr("id")=="3/12")
        {
            row=3;
            collums=12;
            $('.table').css("grid-template-columns","repeat("+collums+",1fr)");
            $('#selectlv').text("Vous avez choisi le mode "+row+"/"+collums+"; Appuyer sur JOUER pour commencer");
        }
        if($(this).attr("id")=="JOUER")
        {
            if(collums == 0 && row==0)
            {
                $('#selectlv').text("Vous devez choisir un mode pour jouer");
            }else{
                $('.edit_niveau').addClass("displaynone");
                $('.gameinfo').removeClass("displaynone");
                setTable();
                shuffle(tablecard);
                var i =0;
                while(i<tablecard.length)
                {
                    tablecard[i].set_tags();
                    i++;
                }
            }
            chronometer.chronodepart();
            game();
        }
    });
}
function game()
{
    $('.card').click(function(){
        var testid=$(this).attr("id");
        for (var i = 0;i<tablecard.length;i++)
        {
            if (tablecard[i].id==testid)
            {
                var j=i;
            }
        }
        if (!(tablecard[j].isFlipped))
        {
            tablecard[j].flip();
            nbcoup++;
            $('.coup').children("p").text(nbcoup);
            peerCondition(tablecard[j]);
        }
    });
}
function setTable()
{
    tablecard = [];
    var size = collums * row;
    for (var i=0;i<size;i=i+2)
    {
        var img=tablemodel[Math.floor(Math.random() * tablemodel.length)];
        tablecard[i]=new card("img/card/"+img+".png",backcard,"card"+i);
        tablecard[i+1]=new card("img/card/"+img+".png",backcard,"card"+(i+1));
    }
}
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
function peerCondition(cardflipped)
{
    checkflip++;
    if (checkflip==2)
    {
        if (lastcard.imgBack == cardflipped.imgBack)
        {
            window.setTimeout(()=>{
                var id2='#'+cardflipped.id;
                var lastid2='#'+lastcard.id;
                $(id2).addClass('displaynone');
                $(lastid2).addClass('displaynone');
            },1000);
        }else{
           console.log(lastcard);
            window.setTimeout(()=>{
                cardflipped.unflip();
                lastcard.unflip();
                lastcard=new card("","","");
            },1000)
        }
        checkflip=0;
    }else{
        lastcard = cardflipped;
    }
}

