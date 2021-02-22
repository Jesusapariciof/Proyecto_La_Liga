// let estadisticas = data.matches;

function getFetch(){
    const url = "http://api.football-data.org/v2/competitions/2014/matches";
    fetch(url,{
        method: "GET",
        headers: {
            "X-Auth-Token": "4e11d1dfed8845f79d5c260aff10e68a"
        }
    }).then(response =>{
        if(response.ok) return response.json();
    }).then(data=>{
        let tablaFetch =data.matches;

        getStats(tablaFetch);
        getStats2(tablaFetch);
     
    })
  }
  getFetch()

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

    //     if (estadisticas[i].status === "FINISHED") {

    //         if (arrayNueva.length > 0) {
    //             let foundHomeTeam = arrayNueva.find((element) => element.id === idL);
    //             let foundAwayTeam = arrayNueva.find((element) => element.id === idV);

    //             if (foundHomeTeam === undefined) {
    //                 arrayNueva.push({
    //                     id: idL,
    //                     name: eLocal,
    //                     goals: golesL,
    //                     matches: 1
    //                 })

    //             } else if (foundAwayTeam === undefined) {
    //                 arrayNueva.push({
    //                     id: idV,
    //                     name: eVisitante,
    //                     goals: golesV,
    //                     matches: 1
    //                 })
    //             }
    //             // else if(foundHomeTeam){
    //             //     foundHomeTeam.goals+=golesL;
    //             //     foundHomeTeam.matches+=1;
    //             // }
    //             else if (foundAwayTeam && foundHomeTeam) { // las dos condiciones tienen que ser ciertas
    //                 foundAwayTeam.goals += golesV;
    //                 foundAwayTeam.matches += 1;
    //                 foundHomeTeam.goals += golesL;
    //                 foundHomeTeam.matches += 1;
    //             }

    //             else { }

    //         } else {
    //             arrayNueva.push({
    //                 id: idL,
    //                 name: eLocal,
    //                 goals: golesL,
    //                 matches: 1,

    //             })
    //         }


    //     }
    //     else {  }

    // }

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

        // console.log(golesMedia.toFixed(3)); // to fixed para reducir los decimales a 2
        //añadimos un objeto a la array anterior con la asignación de objeto.
        let newObject = {
            avg: golesMedia.toFixed(3)
        };
        Object.assign(arrayNueva[j], newObject);

        //utilizamos el sort para ordenar la tabla
        let sortedByAvg = arrayNueva.sort(function (a, b) {
            return b.avg - a.avg;
        });
    }

    let tbody = document.getElementById("tabla3")
    for (let i = 0; i < 5; i++) {

        let tr = document.createElement("tr");
        
        let tdEquipos = document.createElement("td");
        tdEquipos.innerText = arrayNueva[i].name;

        let tdGolesAFavor = document.createElement("td");
        tdGolesAFavor.innerText = arrayNueva[i].goals;
        // tdGolesAFavor.style.textAlign="center";

        let tdPartidosJugados = document.createElement("td");
        tdPartidosJugados.innerText = arrayNueva[i].matches;
        // tdPartidosJugados.style.textAlign="center";

        let tdMediaGoles = document.createElement("td");
        tdMediaGoles.innerText = arrayNueva[i].avg;
        // tdMediaGoles.style.textAlign="center";

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


    }

    let sortedByGolesContra = segundoArray.sort(function (a, b) {
        return a.goals - b.goals;
    });

    
    
     crearTabla2(sortedByGolesContra)
}

function crearTabla2(arrayGolesContra) {
    let tbody4 = document.getElementById("tabla4")
    for (let i = 0; i < 5; i++) {

        let tr = document.createElement("tr");

        let tdName = document.createElement("td");
        tdName.innerText = arrayGolesContra[i].name;
        

        let tdPartidos = document.createElement("td");
        tdPartidos.innerText = arrayGolesContra[i].matches;
        // tdPartidos.style.textAlign="center";

        let tdGolesE = document.createElement("td");
        tdGolesE.innerText = arrayGolesContra[i].goals;
        // tdGolesE.style.textAlign="center";




        tr.append(tdName);
        tr.append(tdPartidos);
        tr.append(tdGolesE);
        tbody4.append(tr);
    }

}

