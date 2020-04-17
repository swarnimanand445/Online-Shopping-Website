let modal1 = document.getElementById("myModal1");
let modal2 = document.getElementById("myModal2");
// Get the button that opens the modal
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
// Get the <span> element that closes the modal
let span1 = document.getElementsByClassName("close1")[0];
let span2 = document.getElementsByClassName("close2")[0];
let p1=document.getElementById("p1");
// When the user clicks the button, open the modal 
btn1.addEventListener("click",function(){
    modal1.style.display = "block";
})

btn2.addEventListener("click",function(){
    modal2.style.display="block";
})

span1.addEventListener("click",function(){
    modal1.style.display = "none";
})
span2.addEventListener("click",function(){
    modal2.style.display = "none";
    p1.style.display="block";
})



