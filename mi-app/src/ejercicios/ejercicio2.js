
const persona = {
    nombre: "Lucía",
    edad: 28,
    profesion: "Diseñadora"
  };

  const { nombre, edad, profesion } = persona;
  console.log(`${nombre} tiene ${edad} años y trabaja como ${profesion}.`);

  persona.ciudad = "Rosario";
  console.log("Persona completa:", persona);
