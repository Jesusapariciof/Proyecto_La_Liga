
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

function ponerListener(partidos) {
  let boton = document.getElementById("boton");
  boton.addEventListener("click", () => {
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
  filtrosTabla()
  document.getElementById("tabla").innerText = ""
  for (let i = 0; i < partidos.length; i++) {
    let idEquipoLocal = partidos[i].homeTeam.id;
    let idEquipoVisitante = partidos[i].awayTeam.id;
    let urlEquipoLocal = "https://crests.football-data.org/" + idEquipoLocal + ".svg";
    let urlEquipoVisitante = "https://crests.football-data.org/" + idEquipoVisitante + ".svg";

    let tr = document.createElement("tr");

    let tdjornada = document.createElement("td");
    tdjornada.innerText = partidos[i].matchday;
    tdjornada.classList.add("tdJ");

    let tdLocal = document.createElement("td");
    tdLocal.innerHTML = `<img src= "${urlEquipoLocal}" alt= "escudo" width= "30px"> ${partidos[i].homeTeam.name}`;
    tdLocal.classList.add("tdL");

    let tdResultado = document.createElement("td");
    tdResultado.classList.add("tdR")
    if (partidos[i].score.fullTime.homeTeam === null) {
      tdResultado.innerText = "Próx.";
    }
    else {
      tdResultado.innerHTML = `${partidos[i].score.fullTime.homeTeam} - ${partidos[i].score.fullTime.awayTeam}`;
    }
    let tdVisitante = document.createElement("td");
    tdVisitante.innerHTML = `<img src= "${urlEquipoVisitante}" alt= "escudo" width= "30px"> ${partidos[i].awayTeam.name}`;
    tdVisitante.classList.add("tdV")

    tr.append(tdjornada);
    tr.append(tdLocal);
    tr.append(tdResultado);
    tr.append(tdVisitante);

    tbody.append(tr);
  }
}

function filtrosTabla() {
  document.getElementById("tabla").innerText = "";
}

function filtrarPorNombre(partidos) {

  let nombre = document.querySelector("input").value;
  let equipoNombre = partidos.filter((e) => {
    if (e.homeTeam.name.toLowerCase().includes(nombre.toLowerCase()) || e.awayTeam.name.toLowerCase().includes(nombre.toLowerCase())) {
      return true;
    }
    return false;
  });
  if (equipoNombre.length === 0) {
    getErrorFiltro()
  }
  else {
    getQuitarErrorFiltro()
  }
  getMatches(equipoNombre);
}

function getEmpate(partidos) {

  let resultado = document.querySelector("input").value;
  let resultadoEmpate = partidos.filter((e) => {
    if (resultado === "") {
      return true
    }
    if (e.score.winner === "DRAW") {
      return true;
    }
    return false
  })
  filtrarPorNombre(resultadoEmpate);
}

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

function getGanados(partidos) {

  let nombre = document.querySelector("input").value.toLowerCase();
  let ganados = partidos.filter((e) => {
    if (nombre === "") {
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

function getPerdidos(partidos) {
  let resultado = document.querySelector("input").value.toLowerCase();
  let perdidos = partidos.filter((e) => {
    if (resultado === "") {
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

function getErrorFiltro() {

  let alerta = document.querySelector(".alerta");
  alerta.innerHTML = "";
  let texto = document.createElement("p");
  texto.innerText = "Filtra tu equipo"
  texto.classList.add("textoError")
  alerta.append(texto)
}

function getQuitarErrorFiltro() {

  let alerta = document.querySelector(".alerta");
  alerta.innerHTML = ""
}


