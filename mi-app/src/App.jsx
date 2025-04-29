import React from 'react';
import Ej1 from './ejercicios/ejercicio1';
import Ej2 from './ejercicios/ejercicio2';
import Ej3 from './ejercicios/ejercicio3';
import Ej6 from './ejercicios/ejercicio6';
import Saludo from './components/Saludo';
import Presentacion from './components/Presentacion';
import BotonTailwind from './components/BotonTailwind';
import Hero from './components/Hero';

const App = () => (
  <div className="p-8 space-y-8">
    <section>
      <h2 className="text-2xl font-bold">Actividad 1–3 (JS puro)</h2>
      <Ej1 />
      <Ej2 />
      <Ej3 />
    </section>

    <section>
      <h2 className="text-2xl font-bold">Actividad 4 (React Props)</h2>
      <Saludo nombre="Martín" />
      <Presentacion nombre="María" edad={30} profesion="Ingeniera" />
    </section>

    <section>
      <h2 className="text-2xl font-bold">Actividad 5 (Botón Tailwind)</h2>
      <BotonTailwind />
    </section>

    <section>
      <h2 className="text-2xl font-bold">Actividad 6 (Array methods)</h2>
      <Ej6 />
    </section>

    <section>
      <h2 className="text-2xl font-bold">Actividad 7 (Tailblocks Hero)</h2>
      <Hero />
    </section>
  </div>
);

export default App;