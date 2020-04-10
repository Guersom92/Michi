//Conseguir los elementos
var tabla=document.querySelector("table");
var inicioDiv=document.querySelector(".inicio");
let compañeroDiv=document.getElementById("compañero");
let ordenadorDiv=document.getElementById("ordenador");
let xDiv= document.getElementById("X");
let oDiv= document.getElementById("O");
let jugar=document.getElementById("jugar");
//variables
var yo;
var tu;
var adversario;
//añadir listeners
compañeroDiv.addEventListener("click",function(){
    rojo(ordenadorDiv,compañeroDiv);
    adversario="compañero";
});
ordenadorDiv.addEventListener("click",function(){
    rojo(compañeroDiv,ordenadorDiv);
    adversario="ordenador";
});
xDiv.addEventListener("click",function(){
    rojo(oDiv,xDiv);
    yo="X";
});
oDiv.addEventListener("click",function(){
    rojo(xDiv,oDiv);
    yo="O";
});

jugar.addEventListener("click",function(){
   if(!yo||!adversario){
      return 
   }
   if(yo=="O"){
       tu="X";
   }
   else{
       tu="O";
   }
    game();
    inicioDiv.classList.add("hide");
    tabla.classList.remove("hide");


});




function rojo(desactivar,activar){
    activar.style.backgroundColor="rgb(22, 40, 92)";
    activar.style.color="white";
    desactivar.style.backgroundColor="white";
    desactivar.style.color="black";
};

