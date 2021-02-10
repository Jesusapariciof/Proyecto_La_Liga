let clasificacion = data2.standings[0].table;
console.log(clasificacion)


function getClasificacion (){
let tbody = document.getElementById("tabla2");
for(let i = 0; i < clasificacion.length; i++){

     let idEquipoLocal = clasificacion[i].team.id;
     let idEquipoVisitante = clasificacion[i].team.id;

     let urlEquipoLocal = "https://crests.football-data.org/" + idEquipoLocal + ".svg";
     let urlEquipoVisitante = "https://crests.football-data.org/" + idEquipoVisitante + ".svg";


    let tr = document.createElement("tr");

  
    let tdEquipo = document.createElement ("td");
    tdEquipo.innerHTML =`<img src="${urlEquipoLocal}" alt="escudo" width= "30px"> ${clasificacion[i].team.name}`;
   

    let tdPosicion = document.createElement("td"); 
    tdPosicion.innerText = clasificacion[i].position;
    
    let tdPuntos = document.createElement("td"); 
    tdPuntos.innerText = clasificacion[i].points;

    let tdPartidosJugados = document.createElement("td"); 
    tdPartidosJugados.innerText = clasificacion[i].playedGames;

    let tdVictorias = document.createElement("td"); 
    tdVictorias.innerText = clasificacion[i].won;

    let tdEmpates = document.createElement("td"); 
    tdEmpates.innerText = clasificacion[i].draw;

    let tdDerrotas = document.createElement("td"); 
    tdDerrotas.innerText = clasificacion[i].lost;

    let tdGfavor = document.createElement("td"); 
    tdGfavor.innerText = clasificacion[i].goalsFor;

    let tdGcontra = document.createElement("td"); 
    tdGcontra.innerText = clasificacion[i].goalsAgainst;

    let tdDiferencia = document.createElement("td"); 
    tdDiferencia.innerText = clasificacion[i].goalDifference;

    let tdUltimos = document.createElement("td"); 
    tdUltimos.innerText = clasificacion[i].form;


    tr.appendChild(tdPosicion);
    tr.appendChild(tdEquipo);
    tr.appendChild(tdPuntos)
    tr.appendChild(tdPartidosJugados)
    tr.appendChild(tdVictorias);
    tr.appendChild(tdEmpates);
    tr.appendChild(tdDerrotas);
    tr.appendChild(tdGfavor);
    tr.appendChild(tdGcontra);
    tr.appendChild(tdDiferencia);
    tr.appendChild(tdUltimos);

    tbody.appendChild(tr);
}

}
getClasificacion()


