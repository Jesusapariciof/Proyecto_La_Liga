
function getFetch() {
  const url = "http://api.football-data.org/v2/competitions/2019/matches";
  fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": "4e11d1dfed8845f79d5c260aff10e68a"
    }
  }).then(response => {
    if (response.ok) return response.json();
  }).then(data => {
    let tablaFetch = data.matches;
    getStats(tablaFetch);
    getStats2(tablaFetch);
    quitarLoader();
    console.log(tablaFetch)
  })
} 
getFetch()

function quitarLoader() {
  let contenedor = document.getElementById("contenedor-carga");
  contenedor.style.visibility = "hidden";
  contenedor.style.opacity = "0";
}

function getStats(estadisticas) {
  let arrayNueva = [];

  for (let i = 0; i < estadisticas.length; i++) {

    let idL = estadisticas[i].homeTeam.id;
    let idV = estadisticas[i].awayTeam.id;
    let eLocal = estadisticas[i].homeTeam.name;
    let eVisitante = estadisticas[i].awayTeam.name;
    let golesL = estadisticas[i].score.fullTime.homeTeam;
    let golesV = estadisticas[i].score.fullTime.awayTeam;
    let estado = estadisticas[i].status;
    let matchesL = estadisticas[i].season.currentMatchday;
    let crests = "https://crests.football-data.org/" + estadisticas[i].id + ".svg";

    if (estadisticas[i].status === "FINISHED") {
      let foundHomeTeam = arrayNueva.find(
        (element) => element.id === idL
      );
      let foundAwayTeam = arrayNueva.find(
        (element) => element.id === idV
      );

      if (foundHomeTeam === undefined) {
        arrayNueva.push({
          id: idL,
          name: eLocal,
          goals: golesL,
          matches: 1,
        });
      } else {
        foundHomeTeam.goals += golesL;
        foundHomeTeam.matches += 1;
      }

      if (foundAwayTeam === undefined) {
        arrayNueva.push({
          id: idV,
          name: eVisitante,
          goals: golesV,
          matches: 1,
        });
      } else {
        foundAwayTeam.goals += golesV;
        foundAwayTeam.matches += 1;
      }
    }
  }
  for (let j = 0; j < arrayNueva.length; j++) {

    let golesMedia = arrayNueva[j].goals / arrayNueva[j].matches;
    let newObject = {
      avg: golesMedia.toFixed(3)
    };
    Object.assign(arrayNueva[j], newObject);
    let sortedByAvg = arrayNueva.sort(function (a, b) {
      return b.avg - a.avg;
    });
  }

  let tbody = document.getElementById("tabla3")
  for (let i = 0; i < 5; i++) {
    let escudo = "https://crests.football-data.org/" + arrayNueva[i].id + ".svg"
    let tr = document.createElement("tr");

    let tdEquipos = document.createElement("td");
    tdEquipos.innerHTML= `<img src="${escudo}" alt="logotipo" width="40px"> ${arrayNueva[i].name}`;

    let tdGolesAFavor = document.createElement("td");
    tdGolesAFavor.innerText = arrayNueva[i].goals;

    let tdPartidosJugados = document.createElement("td");
    tdPartidosJugados.innerText = arrayNueva[i].matches;

    let tdMediaGoles = document.createElement("td");
    tdMediaGoles.innerText = arrayNueva[i].avg;

    tr.append(tdEquipos);
    tr.append(tdGolesAFavor);
    tr.append(tdPartidosJugados);
    tr.append(tdMediaGoles);
    tbody.append(tr);
  }
}

function getStats2(estadisticas) {

  let segundoArray = [];

  for (let i = 0; i < estadisticas.length; i++) {

    let idV = estadisticas[i].awayTeam.id;
    let eVisitante = estadisticas[i].awayTeam.name;
    let golesL = estadisticas[i].score.fullTime.homeTeam;
    let estado = estadisticas[i].status;

    if (estado !== "FINISHED") {
      continue;
    }

    let foundAwayTeam = segundoArray.find((element) => element.id === idV);

    if (foundAwayTeam === undefined) {
      segundoArray.push({
        id: idV,
        name: eVisitante,
        goals: golesL,
        matches: 1
      })
    }
    else {
      foundAwayTeam.goals += golesL;
      foundAwayTeam.matches += 1;
    }
  } console.log(segundoArray)

  let sortedByGolesContra = segundoArray.sort(function (a, b) {
    return a.goals - b.goals;
  });
  crearTabla2(sortedByGolesContra)
}

function crearTabla2(arrayGolesContra) {
  let tbody4 = document.getElementById("tabla4")
  for (let i = 0; i < 5; i++) {
    let escudo = "https://crests.football-data.org/" + arrayGolesContra[i].id + ".svg"

    let tr = document.createElement("tr");

    let tdName = document.createElement("td");
    tdName.innerHTML= `<img src="${escudo}" alt="logotipo" width="40px"> ${arrayGolesContra[i].name}`;

    let tdPartidos = document.createElement("td");
    tdPartidos.innerText = arrayGolesContra[i].matches;

    let tdGolesE = document.createElement("td");
    tdGolesE.innerText = arrayGolesContra[i].goals;

    tr.append(tdName);
    tr.append(tdPartidos);
    tr.append(tdGolesE);
    tbody4.append(tr);
  }
}

