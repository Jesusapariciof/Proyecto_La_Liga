let estadistica = data2.standings[0].table;
console.log(estadistica)

    function getEstadisticas(){
    let tbdoy = document.getElementById("tabla3");
    for(let i = 0; i < 5; i++){
    
        let tr = document.createElement("tr");
    
        let tdEquipos = document.createElement("td");
        tdEquipos.innerText = estadistica[i].team.name;

        let tdGf = document.createElement ("td");
        tdGf.innerText = estadistica[i].goalsFor;
       
        let tdResult = document.createElement("td");
        let golesmedia = estadistica[i].goalsFor;
        let partidosjugados = estadistica[i].playedGames;
        
        let operacionGoles = golesmedia / partidosjugados;
        tdResult.innerText = operacionGoles;
        


        tr.appendChild(tdEquipos);
        tr.appendChild(tdGf);
        tr.append(tdResult);
        tbdoy.appendChild(tr);
    }

    }
    getEstadisticas();

    
