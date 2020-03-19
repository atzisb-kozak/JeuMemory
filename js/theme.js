let checkbox = document.querySelector('input[name=theme]');
        
checkbox.addEventListener('change',function(){
if(this.checked)
    {
        let theme="dark";
        trans();
        document.documentElement.setAttribute('data-theme',theme);
        document.getElementById("imgtitle").setAttribute('src','img/JEUMEMORYWHITE.png');
    }else{
        let theme="light";
        trans();
        document.documentElement.setAttribute('data-theme',theme);
        document.getElementById("imgtitle").setAttribute('src','img/JEUMEMORYBLACK.png');
    }
});

let trans = ()=>{
    document.documentElement.classList.add('transition');
    window.setTimeout(()=>
    {
        document.documentElement.classList.remove('transition'); 
    }, 1000);
}