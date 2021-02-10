let partidos = data.matches;
console.log(partidos)


function getMatches (){
let tbody = document.getElementById("tabla");
for(let i = 0; i < partidos.length; i++){

//Creamos la variable para sacar la id de cada equipo
    let idEquipoLocal = partidos[i].homeTeam.id;
    let idEquipoVisitante = partidos[i].awayTeam.id;
//Creamos otra variable para separar las diferentes id y unir así con las variables anteriores
    let urlEquipoLocal = "https://crests.football-data.org/" + idEquipoLocal + ".svg";
    let urlEquipoVisitante = "https://crests.football-data.org/" + idEquipoVisitante +".svg";

    let tr = document.createElement("tr");
    

   let tdLocal = document.createElement ("td");
   tdLocal.innerHTML =`<img src= "${urlEquipoLocal}" alt= "escudo" width= "30px"> ${partidos[i].homeTeam.name}`;

// dentro del resultado, para poder poner el escudo, usamos innerHTML y añadimos una imagen. Esta va siempre entre acentos ´´ 
    let tdResultado = document.createElement("td");
    
    if(partidos[i].score.fullTime.homeTeam===null){
       tdResultado.innerText = "Próximamente";

    }

     else{

    tdResultado.innerHTML = `${partidos[i].score.fullTime.homeTeam} - ${partidos[i].score.fullTime.awayTeam}`;
 }
   
    let tdVisitante = document.createElement("td");
    tdVisitante.innerHTML = `<img src= "${urlEquipoVisitante}" alt= "escudo" width= "30px"> ${partidos[i].awayTeam.name}`;

    tr.appendChild(tdLocal);
    tr.appendChild(tdResultado);
    tr.appendChild(tdVisitante);
    
    tbody.appendChild(tr);

}

}
getMatches()
