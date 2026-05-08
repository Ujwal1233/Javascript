var colors=['white','red','blue','green','yellow','pink','cyan'];
let length=colors.length-1

let buttonControl=document.getElementById('btn')
let spanControl=document.querySelector('.color')

buttonControl.addEventListener('click',()=>{
    let randomIndex=Math.floor(Math.random()*length)
     document.body.style.backgroundColor=colors[randomIndex]
     spanControl.innerHTML=colors[randomIndex]
})