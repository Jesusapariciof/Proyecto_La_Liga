for (let i = 0; i < partidos.length; i++) {
    let idLocal = partidos[i].homeTeam.id;
    let idVisitante = partidos[i].awayTeam.id;
    let equipoLocal = partidos[i].homeTeam.name;
    let equipoVisitante = partidos[i].awayTeam.name;
    let golesLocal = partidos[i].score.fullTime.homeTeam;
    let golesVisitante = partidos[i].score.fullTime.awayTeam;
    let estado = partidos[i].status;

    if (partidos[i].status === "FINISHED") {
        let foundHomeTeam = arrayNueva.find(
          (element) => element.id === idLocal
        );
        let foundAwayTeam = arrayNueva.find(
          (element) => element.id === idVisitante
        );

        if (foundHomeTeam === undefined) {
          arrayNueva.push({
            id: idLocal,
            name: equipoLocal,
            goals: golesLocal,
            matches: 1,
          });
        } else {
          foundHomeTeam.goals += golesLocal;
          foundHomeTeam.matches += 1;
        }

        if (foundAwayTeam === undefined) {
          arrayNueva.push({
            id: idVisitante,
            name: equipoVisitante,
            goals: golesVisitante,
            matches: 1,
          });
        } else {
          foundAwayTeam.goals += golesVisitante;
          foundAwayTeam.matches += 1;
        }
    }
  }






  //añadir la media de goles

  for (let j = 0; j < arrayNueva.length; j++) {
    let average = arrayNueva[j].goals / arrayNueva[j].matches;

    arrayNueva[j].average = average;


