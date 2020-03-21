let checkflip = 0;
let lastcard = "";
let backcard = "img/card/CARDS4.png";
let tablemodel=["JDG","IRONMAN","ARIANA","JB","MINECRAFT","WORLD"];
let tablecard=[];
let collums=6;
let row=3;
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
$(document).ready(()=>{
    setGame();
    
    game();
});
function setGame()
{
    $('.container').click(function(){
        var backimg = $(this).children().attr("src");
        backimg=backimg.substring(9,backimg.length-4);
        $('#selectbc').text("Vous avez choisi le fond "+backimg)
    });
    $('.mode').click(function(){
        console.log($(this).attr("id"));
        if($(this).attr("id")=="2/3")
        {
            row=2;
            collums=3;
            $('.table').css("grid-template-columns","repeat("+collums+",1fr)");
            $('#selectlv').text("Vous avez choisi le mode "+row+"/"+collums+"; Appuyer sur JOUER pour commencer");
        }
        if($(this).attr("id")=="3/6")
        {
            row=3;
            collums=6;
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
            $('.edit_niveau').addClass("displaynone");
            $('.gameinfo').removeClass("displaynone");
            setTable();
            console.log(tablecard);
            shuffle(tablecard);
            for (var i=0;i<tablecard.length;i++)
            {
                tablecard[i].set_tags();
            }
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
            peerCondition()
        }
    });
}

function peerCondition(id,classes)
{
    let id2='#'+id;
    checkflip++;
    if (checkflip==2)
    {
        if (lastclass==classes)
        {
            let lastid2='#'+lastid;
            alert("validé");
            window.setTimeout(()=>{
                $(lastid2).addClass('displaynone');
                $(id2).addClass('displaynone');
            },1000);
        }else{
           alert("Wrong")
            window.setTimeout(()=>{
                unflip();
            },1000)
        }
        checkflip=0;
        lastid="";
        lastclass="";
    }else{
        lastid=id;
        lastclass=$(id2).attr("class");
        console.log(lastclass);
    }
}

