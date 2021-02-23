
function getFetch() {
  const url = "http://api.football-data.org/v2/competitions/2014/matches";
  fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": "4e11d1dfed8845f79d5c260aff10e68a"
    }
  }).then(response => {
    if (response.ok) return response.json();
  }).then(data => {
    let partidos = data.matches;
    getMatches(partidos);
    ponerListener(partidos)
    quitarLoader()
  })

}
getFetch()

function quitarLoader() {
  let contenedor = document.getElementById("contenedor-carga");
  contenedor.style.visibility = "hidden";
  contenedor.style.opacity = "0";
}

function ponerListener(partidos) {// Creamos la función ponerListener para unir los radiobuttons y que no ocupe tanto en el fetch. Desde aquí llamamos a las funciones.
  let boton = document.getElementById("boton");
  boton.addEventListener("click", () => { //Le decimos que al hacer click nos llame a la función
    filtrarPorNombre(partidos)
  })

  let ganados = document.getElementById("ganado");
  ganados.addEventListener("click", () => {
    getGanados(partidos);
  
  })
  let empatado = document.getElementById("empatado");
  empatado.addEventListener("click", () => {
    getEmpate(partidos)
  })

  let perdidos = document.getElementById("perdido");
  perdidos.addEventListener("click", () => {
    getPerdidos(partidos)
  })

  let proximamente = document.getElementById("proximamente");
  proximamente.addEventListener("click", () => {
    getFiltroProximamente(partidos);
  })

  let todos = document.getElementById("todos");
  todos.addEventListener("click", () => {
    filtrarPorNombre(partidos);
  })


}

function getMatches(partidos) {
  let tbody = document.getElementById("tabla");
  // tbody.classList.add("bodyt")
  filtrosTabla() //CREADA PARA APLICAR LOS FILTROS A LA TABLA
  document.getElementById("tabla").innerText = ""
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
    tdjornada.classList.add("tdL")

    let tdLocal = document.createElement("td");
    tdLocal.innerHTML = `<img src= "${urlEquipoLocal}" alt= "escudo" width= "30px"> ${partidos[i].homeTeam.name}`;
    tdLocal.classList.add("tdL")

    let tdResultado = document.createElement("td");
    // tdResultado.style.textAlign = "center"
    if (partidos[i].score.fullTime.homeTeam === null) {
      tdResultado.innerText = "Próx.";
      tdResultado.classList.add("tdL")
    }

    else {

      tdResultado.innerHTML = `${partidos[i].score.fullTime.homeTeam} - ${partidos[i].score.fullTime.awayTeam}`;
    }
    let tdVisitante = document.createElement("td");
    tdVisitante.innerHTML = `<img src= "${urlEquipoVisitante}" alt= "escudo" width= "30px"> ${partidos[i].awayTeam.name}`;
    tdVisitante.classList.add("tdL")
    
    tr.append(tdjornada);
    tr.append(tdLocal);
    tr.append(tdResultado);
    tr.append(tdVisitante);

    tbody.append(tr);
  }
}
// getMatches(partidos)

function filtrosTabla() { //CREADA PARA APLICAR LOS FILTROS A LA TABLA
  document.getElementById("tabla").innerText = "";
  
}

function filtrarPorNombre(partidos) {
  
  let nombre = document.querySelector("input").value;
  let equipoNombre = partidos.filter((e) => {
    if (e.homeTeam.name.toLowerCase().includes(nombre.toLocaleLowerCase()) || e.awayTeam.name.toLowerCase().includes(nombre.toLocaleLowerCase())) {
    
      return true;
    }
    return false;
    
  });
  if(equipoNombre.length === 0){
  getErrorFiltro()
   }
   else{
     getQuitarErrorFiltro()
   }
   
  getMatches(equipoNombre);
}
// filtrarPorNombre(partidos);

function getEmpate(partidos) {

  let resultado = document.querySelector("input").value;
  let resultadoEmpate = partidos.filter((e) => {
    if(resultado === ""){
      return true
    }
    if (e.score.winner === "DRAW") {
      return true;
    }

    return false
  })
  filtrarPorNombre(resultadoEmpate);
}
// getFiltroResultado(partidos)

function getFiltroProximamente(partidos) {

  let resultado = document.querySelector("input").value;
  let proximamente = partidos.filter((e) => {
    if (resultado === "") {
      return partidos;
    }
    if (e.score.fullTime.homeTeam === null) {
      return true;
    }
    return false;
  })

  filtrarPorNombre(proximamente);
}
// getFiltroProximamente(partidos);

function getGanados(partidos) {

  let nombre = document.querySelector("input").value.toLowerCase();
  let ganados = partidos.filter((e) => {
    if(nombre === ""){
      return true
    }
    if (e.homeTeam.name.toLowerCase().includes(nombre) && e.score.winner === "HOME_TEAM") {
      return true
    }

    else if (e.awayTeam.name.toLowerCase().includes(nombre) && e.score.winner === "AWAY_TEAM") {
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
// getGanados(partidos);

function getPerdidos(partidos) {

  let resultado = document.querySelector("input").value.toLowerCase();

  let perdidos = partidos.filter((e) => {
    if(resultado === ""){
      return true
    }
    if (e.homeTeam.name.toLowerCase().includes(resultado) && e.score.winner === "AWAY_TEAM") {
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
// getPerdidos(partidos);

function getErrorFiltro(){ //Creada para la alerta de filtros. Llamada en función de filtros.
let alerta = document.querySelector(".alerta");
alerta.innerHTML= "";
let texto = document.createElement("p");
texto.innerText = "Filtra tu equipo"
texto.classList.add("textoError")
alerta.append(texto)

}

function getQuitarErrorFiltro (){ //Creada para quitar alerta de filtro.LLamada en función de filtros
  let alerta = document.querySelector(".alerta");
  alerta.innerHTML = ""
}


