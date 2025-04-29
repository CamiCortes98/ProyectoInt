import React from 'react';

const Presentacion = ({ nombre, edad, profesion }) => (
  <p>{nombre}, de {edad} años, trabaja como <strong>{profesion}</strong>.</p>
);

export default Presentacion;