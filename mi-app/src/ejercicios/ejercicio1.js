
const nombre = "Ana";
const edad = 22;
console.log(`Hola, me llamo ${nombre} y tengo ${edad} años.`);


const numeros = [3, 7, 12, 5, 2];
const cuadrados = numeros.map(n => n * n);
console.log("Cuadrados:", cuadrados); 
const mayoresA5 = numeros.filter(n => n > 5);
console.log("Mayores a 5:", mayoresA5); 


const parImpar = num => num % 2 === 0 ? "Par" : "Impar";
console.log("4 es", parImpar(4)); 
console.log("7 es", parImpar(7)); 