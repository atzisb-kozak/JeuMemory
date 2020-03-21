let checkbox = document.querySelector('input[name=theme]');
        
checkbox.addEventListener('change',function(){
if(this.checked)
    {
        let theme="dark";
        trans();
        $('html').attr('data-theme',theme);
        $('#imgtitle').attr('src','img/title/JEUMEMORYWHITE.png');
    }else{
        let theme="light";
        trans();
        $('html').attr('data-theme',theme);
        $('#imgtitle').attr('src','img/title/JEUMEMORYBLACK.png');
    }
});

let trans = ()=>{
   $('html').addClass('transition');
    window.setTimeout(()=>
    {
       $('html').removeClass('transition'); 
    }, 1000);
}