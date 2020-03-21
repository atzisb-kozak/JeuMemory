let checkflip = 0;
let lastcard = "";
let backcard = "";
let tablecard=[];
let collums=3;
let row=2;

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
    flip() {
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
let card1=new card("img/CARDS6.png","img/CARDS4.png","card1");
let card2=new card("img/CARDS5.png","img/CARDS4.png","card2");
let card3=new card("img/CARDS5.png","img/CARDS4.png","card3");
let card4=new card("img/CARDS5.png","img/CARDS4.png","card4");
$(document).ready(()=>{

    card1.set_tags();
    card2.set_tags();
    card3.set_tags();
    card4.set_tags();
    //game();
});

function game()
{
    $('.card').click(function(){
        var testid=$(this).attr("id");
        for (var i = 0;i<tablecard.length;i++)
        {
            if (!(tablecard[i].idcard==testid && tablecard[i].isFlipped))
                {
                    tablecard[i].flip();
                }
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

