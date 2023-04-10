const palabrAdivinar = ingresarPalabra();
let arrCoincidencias = [];
let vidas = 6;
let coincidencias = 0;

const letra = document.querySelector("input");
letra.oninput = function (){
  soloLetras(letra.value, palabrAdivinar);
};

function ingresarPalabra() {
  const palabra = prompt("Ingresa una palabra para adivinar!");
  const arrPalabra = palabra.split("");
  console.log(arrPalabra);
  document.getElementById("tablero").innerHTML = `
            <table border="1">
                <tr>
                    ${creaTablero(arrPalabra)}    
                </tr>    
            </table>
        `;
  return arrPalabra;
}

function creaTablero(arrPalabra) {
  let tablero = "";
  arrPalabra.forEach((letra) => {
    tablero = tablero + "<td> ? </td>";
  });
  return tablero;
}

function soloLetras(cadena, palabrAdivinar) {
  const pattern = new RegExp("[a-zA-Z]");
  console.log(pattern.test(cadena));
  if (!pattern.test(cadena)) {
    document.querySelector("input").value = "";
    document.getElementById("status").innerHTML =
      "Solo puedes ingresar letras!!!..";
    return false;
  } else {
    buscarCoincidencia(cadena, palabrAdivinar);
    return true;
  }
}

function buscarCoincidencia(letra, arrPalabra) {
  let tablero = "";
  
  arrPalabra.forEach((caracter, index) => {
    if (caracter == letra) {
      arrCoincidencias[index] = letra;
      coincidencias = coincidencias + 1;
    }
  });

  arrPalabra.forEach((caracter, index) => {
    if (arrCoincidencias[index]) {
      tablero = tablero + "<td>" + arrCoincidencias[index] + " </td>";
    } else {
      tablero = tablero + "<td> ? </td>";
    }
  });

  leyendaCoincidencia(coincidencias);
  document.getElementById("tablero").innerHTML = `
            <table border="1">
                <tr>
                    ${tablero}    
                </tr>    
            </table>
        `;

  if(coincidencias === arrPalabra.length){
    document.getElementById("fin").innerHTML = 'Ganaste';
  }
}

function leyendaCoincidencia(coincidencias) {
  if (coincidencias > 0) {
    document.getElementById("status").innerHTML = `Hubo ${coincidencias} coincidencias!!!`;
  } else {
    vidas = vidas - 1;
    document.getElementById("status").innerHTML = "No hubo coincidencias :( Te quedan " + vidas + " vidas";
  }

  if (vidas === 0) {
    document.getElementById("fin").innerHTML = 'Perdiste';
  }
}
