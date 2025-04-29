
function procesar(array, callback) {
    const resultado = [];
    for (const elemento of array) {
      resultado.push(callback(elemento));
    }
    return resultado;
  }
  

  const datosOriginales = [1, 2, 3];
  const datosProcesados = procesar(datosOriginales, x => x * 2);
  console.log("Procesados:", datosProcesados); 