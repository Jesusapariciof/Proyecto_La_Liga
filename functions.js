     let partidos = data.matches;


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
      let partidos =data.matches;
   getMatches(partidos);
  
  //  filtrosTabla(tablaFetch);
  //  filtrarPorNombre(tablaFetch);
  //  getFiltroResultado(tablaFetch);
  //  getFiltroProximamente(tablaFetch);
  //  getGanados(tablaFetch);
  //  getPerdidos(tablaFetch);
    
  })
}
getFetch()
 



function getMatches(partidos) {
  let tbody = document.getElementById("tabla");
  tbody.classList.add("bodyt")
    filtrosTabla() //CREADA PARA APLICAR LOS FILTROS A LA TABLA
    document.getElementById("tabla").innerText = ""
  for(let i = 0; i < partidos.length; i++) {

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
//  let boton = document.getElementById("boton");
 let nombre = document.querySelector("input").value;
//  console.log(nombre)
//  boton.addEventListener("click",() =>{
   

   let equipoNombre = partidos.filter((e) => {
     if (e.homeTeam.name.toLowerCase().includes(nombre.toLocaleLowerCase()) || e.awayTeam.name.toLowerCase().includes(nombre.toLocaleLowerCase())) {
       console.log()
        return true; 
      
     }
     return false;
     
   });

//  })
  getMatches(equipoNombre);
}
  filtrarPorNombre(partidos);

function getFiltroResultado(partidos) {
 
  let resultado = document.querySelector("input").value;
  // if( resultado === ""){
  //   let mensaje = document.createElement("span")
  //   let divMensaje = document.getElementById("mensaje");
  //   mensaje.innerText= "Selecciona equipo"
  //   divMensaje.append(mensaje);
  // }
  let resultadoEmpate = partidos.filter((e) => {
    // if(resultado === ""){
    //   return false
    // }
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
    // if(resultado === ""){
    //   return false
    // }
    if (e.score.fullTime.homeTeam === null) {
      return true;
    }
    return false;
  })

  filtrarPorNombre(proximamente);
}
// getFiltroProximamente(partidos);


function getGanados(partidos) {

  let resultado = document.querySelector("input").value.toLowerCase();
  let ganados = partidos.filter((e) => {
    // if(resultado === ""){
    //   return false
    // }
    if(e.homeTeam.name.toLowerCase().includes(resultado) && e.score.winner === "HOME_TEAM"){  
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
// getGanados(partidos);

function getPerdidos (partidos){

  let resultado = document.querySelector("input").value.toLowerCase();

  let perdidos = partidos.filter((e) => {
    // if(resultado === ""){
    //   return false
    // }
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
// getPerdidos(partidos);





