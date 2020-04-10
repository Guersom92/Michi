function game(){
    var svg=document.getElementById("u");
    var svg2=document.getElementById("d");
    var svg3=document.getElementById("t");
    var svg4=document.getElementById("c");
    var aviso=document.getElementById("aviso");

    var tablero;
    var turn;
    tablero=Array.from(Array(9).keys());
    const celdas=document.querySelectorAll(".celda");
    const combina=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    if(1==Math.floor(Math.random()*2)){
        turn=adversario;
    }
    else{
        turn="yo";
    }
    //Códido que se ejecuta si el ordenador empieza
    if(turn=="ordenador"){
        turno((Math.floor(Math.random()*9)),tu);
        turn="yo";
    }
    //Aviso sobre quién empieza
    if(adversario!="ordenador"){
        if(turno=="yo"){
            aviso.textContent=yo;
            aviso.classList.remove("hide");
            aviso.style.animationName="aviso";
        }
        else{
            aviso.classList.remove("hide");
            aviso.textContent=tu;       
            aviso.style.animationName="aviso";
        }
        setInterval(function(){aviso.classList.add("hide")},1500);
        
    }

    for(var i=0;i<celdas.length;i++){
        celdas[i].addEventListener('click',turnoClick);
       }

    
    function turnoClick(cuadrado){
        if(typeof tablero[cuadrado.target.id]=='number'){
            if(turn=="yo"){
                turno(cuadrado.target.id,yo)
                if(adversario=="ordenador"&&!verificar(tablero,yo)&&!empate())
                {turno(mejorLugar(),tu);}
                else{
                    turn="compañero"
                }
            }
            else if(turn=="compañero"){
                turno(cuadrado.target.id,tu)
                turn="yo"
            }
            
        }
        
    }
    //función de turno
    function turno(cuadradoId,jugador){
        tablero[cuadradoId]=jugador;
        document.getElementById(cuadradoId).innerText=jugador;
        let juegoGanado=verificar(tablero,jugador);
        if(juegoGanado) terminar(juegoGanado)
        else{empate();}
        
    }
    //función para determinar si se ha ganado
    function verificar(tablero,jugador){
        let jugadas=tablero.reduce((a,e,i)=>(e==jugador)?a.concat(i):a,[]);
        let juegoGanado=null;
        for(let[index,win]of combina.entries()){
            if(win.every(elem=>jugadas.indexOf(elem)>-1)){
                juegoGanado={index:index,jugador:jugador};
                
                break;
            }
        }
        return juegoGanado;
    }
    //función para determinar si hay un empate
    function empate(){
        if(cuadradosVacios().length==0){
            for(var i=0;i<celdas.length;i++){
                celdas[i].removeEventListener("click",turnoClick)
            }
            mensaje("Empate");
            return true;
        }
        return false;
    }

    //función que se ejecuta cuando se termino el juego
    function terminar(juegoGanado){
        if(combina.slice(0,3).includes(combina[juegoGanado.index])){
            svg.classList.remove("hide");
            svg.style.top=document.getElementById(combina[juegoGanado.index][0]).getBoundingClientRect().top+80+"px";
            svg.style.left=document.getElementById(combina[juegoGanado.index][0]).getBoundingClientRect().left+10+"px";
            svg.style.animation="trazo 1s ease-out forwards";
        }
        else if(combina.slice(3,6).includes(combina[juegoGanado.index])){
            svg2.classList.remove("hide");
            svg2.style.left=document.getElementById(combina[juegoGanado.index][0]).getBoundingClientRect().left+75+"px";
            svg2.style.animation="trazo 1s ease-out forwards";
        }
        else if(combina[juegoGanado.index][0]==2){
            svg3.classList.remove("hide");
            svg3.style.left=document.getElementById(combina[juegoGanado.index][2]).getBoundingClientRect().left+80+"px";
            svg3.style.animation="trazo 1s ease-out forwards";
        }
        else{
            svg4.classList.remove("hide");
            svg4.style.left=document.getElementById(combina[juegoGanado.index][0]).getBoundingClientRect().left+75+"px";
            svg4.style.animation="trazo 1s ease-out forwards";
        }
        for(var i=0;i<celdas.length;i++){
            celdas[i].removeEventListener("click",turnoClick)
        }
        mensaje(juegoGanado.jugador==yo?"ganaste":"perdiste");
        

    }
    //decisión del ordenador
    function mejorLugar(){
        return minimax(tablero,tu).indice;

    }

    //buscador de espacios vacuos
    function cuadradosVacios(){
        return tablero.filter((s)=>typeof s=='number');
    }

    //mensaje
    function mensaje(who){
        document.querySelector(".fin").style.display="flex";
        document.querySelector(".texto").innerText=who;
    }
    //algoritmo minimax 
    function minimax(nuevoTablero,jugador){
        var disponi=cuadradosVacios();
        if(verificar(tablero,yo)){
            return {puntaje:-10};
        }
        else if(verificar(tablero,tu)){
            return {puntaje:10};
        }
        else if(disponi.length==0){
            return{puntaje:0};
        }

        var movimientos=[];
        for(var i=0;i<disponi.length;i++){
            var movimiento={};
            movimiento.indice=disponi[i];
            nuevoTablero[disponi[i]]=jugador;
            if(jugador==tu){
                var resultado = minimax(nuevoTablero,yo);
                movimiento.puntaje=resultado.puntaje;
            }
            else { 
                var resultado = minimax(nuevoTablero,tu);
                movimiento.puntaje=resultado.puntaje;
            }
            nuevoTablero[disponi[i]]=movimiento.indice;
            movimientos.push(movimiento);
        }
        var mejorMov;
        if(jugador==tu){
            var mejorPunt=-Infinity;
            for(var i =0;i<movimientos.length;i++){
                if(movimientos[i].puntaje>mejorPunt){
                    mejorPunt=movimientos[i].puntaje;
                    mejorMov=i;
                }
            }
        }
        else{
            var mejorPunt=Infinity;
            for(var i =0;i<movimientos.length;i++){
                if(movimientos[i].puntaje<mejorPunt){
                    mejorPunt=movimientos[i].puntaje;
                    mejorMov=i;
                }
            }
        }
        return movimientos[mejorMov];


    }

};