let estadisticas = data.matches;
console.log(estadisticas)
function getStats() {
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


        if (estadisticas[i].status === "FINISHED") {

            if (arrayNueva.length > 0) {
                let foundHomeTeam = arrayNueva.find((element) => element.id === idL);
                let foundAwayTeam = arrayNueva.find((element) => element.id === idV);

                if (foundHomeTeam === undefined) {
                    arrayNueva.push({
                        id: idL,
                        name: eLocal,
                        goals: golesL,
                        matches: 1
                    })

                } else if (foundAwayTeam === undefined) {
                    arrayNueva.push({
                        id: idV,
                        name: eVisitante,
                        goals: golesV,
                        matches: 1
                    })
                }
                // else if(foundHomeTeam){
                //     foundHomeTeam.goals+=golesL;
                //     foundHomeTeam.matches+=1;
                // }
                else if (foundAwayTeam && foundHomeTeam) { // las dos condiciones tienen que ser ciertas
                    foundAwayTeam.goals += golesV;
                    foundAwayTeam.matches += 1;
                    foundHomeTeam.goals += golesL;
                    foundHomeTeam.matches += 1;
                }

                else { console.log("no entres aquí") }

            } else {
                arrayNueva.push({
                    id: idL,
                    name: eLocal,
                    goals: golesL,
                    matches: 1,

                })
            }


        }
        else { console.log("partidospendientes") }

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

getStats();



function getStats2(){

    let segundoArray = [];

    for(let i = 0; i < estadisticas.length; i++){

        let idL = estadisticas[i].homeTeam.id;

        let idV = estadisticas[i].awayTeam.id;

        let eLocal = estadisticas[i].homeTeam.name;

        let eVisitante = estadisticas[i].awayTeam.name;

        let golesL = estadisticas[i].score.fullTime.homeTeam;

        let golesV = estadisticas[i].score.fullTime.awayTeam;

        let estado = estadisticas[i].status;

        if(estadisticas[i].status === "FINISHED"){

            if (segundoArray.length > 0) {
                let foundHomeTeam = segundoArray.find((element) => element.id === idL);
                let foundAwayTeam = segundoArray.find((element) => element.id === idV);

                if (foundAwayTeam === undefined) {
                    segundoArray.push({
                        id: idV,
                        name: eVisitante,
                        goals: golesL,
                        matches: 1
                    })
                } 
                else if (foundHomeTeam === undefined) {
                    segundoArray.push({
                        id: idL,
                        name: eLocal,
                        goals: golesL,
                        matches: 1
                    })
                }

                else if (foundAwayTeam) { 
                    foundAwayTeam.goals += golesL;
                    foundAwayTeam.matches += 1;
                    
                }

            } else {
                segundoArray.push({
                    id: idL,
                    name: eLocal,
                    goals: golesL,
                    matches: 1,

                })
            }

        }

        let sortedByGolesContra = segundoArray.sort(function (a, b) {
            return a.goals - b.goals;
        });

    
    }

    let tbody4 = document.getElementById("tabla4")
    for(let i = 0; i < 5; i++){

        let tr = document.createElement("tr");

        let tdName = document.createElement("td");
        tdName.innerText = segundoArray[i].name;

        let tdPartidos = document.createElement("td");
        tdPartidos.innerText =segundoArray[i].matches;

        let tdGolesE = document.createElement("td");
        tdGolesE.innerText = segundoArray[i].goals;




        tr.append(tdName);
        tr.append(tdPartidos);
        tr.append(tdGolesE);
        tbody4.append(tr);
    }

    console.log(segundoArray)
}

getStats2();