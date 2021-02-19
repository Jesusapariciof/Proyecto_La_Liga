let partidos = data.matches;
console.log(partidos)

function getMatches(partidos) {
  let tbody = document.getElementById("tabla");
  tbody.classList.add("bodyt")
    filtrosTabla() //CREADA PARA APLICAR LOS FILTROS A LA TABLA
  for (let i = 0; i < partidos.length; i++) {

    //Creamos la variable para sacar la id de cada equipo
    let idEquipoLocal = partidos[i].homeTeam.id;
    let idEquipoVisitante = partidos[i].awayTeam.id;
    //Creamos otra variable para separar las diferentes id y unir así con las variables anteriores
    let urlEquipoLocal = "https://crests.football-data.org/" + idEquipoLocal + ".svg";
    let urlEquipoVisitante = "https://crests.football-data.org/" + idEquipoVisitante + ".svg";

    let tr = document.createElement("tr");


    let tdjornada = document.createElement("td");
    tdjornada.innerText = partidos[i].matchday;
    tdjornada.style.paddingLeft = "35px"

    let tdLocal = document.createElement("td");
    tdLocal.innerHTML = `<img src= "${urlEquipoLocal}" alt= "escudo" width= "30px"> ${partidos[i].homeTeam.name}`;

    let tdResultado = document.createElement("td");
    tdResultado.style.paddingLeft = "30px"
    if (partidos[i].score.fullTime.homeTeam === null) {
      tdResultado.innerText = "Próximamente";

    }

    else {

      tdResultado.innerHTML = `${partidos[i].score.fullTime.homeTeam} - ${partidos[i].score.fullTime.awayTeam}`;
    }
    let tdVisitante = document.createElement("td");
    tdVisitante.innerHTML = `<img src= "${urlEquipoVisitante}" alt= "escudo" width= "30px"> ${partidos[i].awayTeam.name}`;

    tr.appendChild(tdjornada);
    tr.appendChild(tdLocal);
    tr.appendChild(tdResultado);
    tr.appendChild(tdVisitante);

    tbody.appendChild(tr);
  }
}
getMatches(partidos)

function filtrarPorNombre(partidos) {

  let nombre = document.querySelector("input").value;
  let equipoNombre = partidos.filter((e) => {
    if (e.homeTeam.name.toLowerCase().includes(nombre.toLocaleLowerCase()) || e.awayTeam.name.toLowerCase().includes(nombre.toLocaleLowerCase())) {
      return true;
    }
    return false;
  });
  getMatches(equipoNombre);
}
filtrarPorNombre(partidos);

function filtrosTabla() { //CREADA PARA APLICAR LOS FILTROS A LA TABLA
  document.getElementById("tabla").innerText = "";
}
function getFiltroResultado(partidos) {

  let resultado = document.querySelector("input").value;
  let resultadoEmpate = partidos.filter((e) => {
    if (e.score.winner === "DRAW") {
      return true;
    }
    
    return false
  })
  filtrarPorNombre(resultadoEmpate);
}
getFiltroResultado(partidos)

function getFiltroProximamente(partidos) {

  // let resultado = document.querySelectorAll("input").value;
  let proximamente = partidos.filter((e) => {
    if (e.score.fullTime.homeTeam === null) {
      return true;
    }
    return false;
  })

  filtrarPorNombre(proximamente);
}
getFiltroProximamente(partidos);


function getGanados(partidos) {

  let resultado = document.querySelector("input").value.toLowerCase();
  let ganados = partidos.filter((e) => {

    if(e.homeTeam.name.toLowerCase().includes(resultado) && e.score.winner === "HOME_TEAM"){  
      console.log (e.homeTeam.name)
      return true
    }

    else if(e.awayTeam.name.toLowerCase().includes(resultado) && e.score.winner === "AWAY_TEAM" ){
      return true
    }

    else if (e.score.winner === null) {
      return false;
    }

    else if (e.score.winner === "DRAW") {
      return false;
    }
    else
      return false;


  })


  filtrarPorNombre(ganados);

}
getGanados(partidos);

function getPerdidos (partidos){

  let resultado = document.querySelector("input").value.toLowerCase();

  let perdidos = partidos.filter((e) => {

      if(e.homeTeam.name.toLowerCase().includes(resultado) && e.score.winner === "AWAY_TEAM"){
        return true;
      }
      else if (e.awayTeam.name.toLowerCase().includes(resultado) && e.score.winner === "HOME_TEAM")
      return true;

      else if (e.score.winner === null) {
        return false;
      }
  
      else if (e.score.winner === "DRAW") {
        return false;
      }
      else
        return false;

  })

  filtrarPorNombre(perdidos);
}
getPerdidos(partidos);