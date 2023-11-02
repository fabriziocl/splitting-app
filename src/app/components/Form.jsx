"use client"
import React, { useState } from 'react';
import Gastos from '../utils/Gastos';
import Pibes from '../utils/Pibes';

const Form = () => {
  const [gastos, setGastos] = useState([]);
  const [selectedGasto, setSelectedGasto] = useState('');
  const [selectedPibe, setSelectedPibe] = useState([]);
  const [montoGasto, setMontoGasto] = useState(0);
  const [resultados, setResultados] = useState(null);

  const handleGastoChange = (e) => {
    setSelectedGasto(e.target.value);
  };

  const handleMontoGastoChange = (e) => {
    setMontoGasto(parseFloat(e.target.value) || 0);
  };

  const handlePibeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedPibe(selectedOptions);
  };

  const handleAgregarGasto = () => {
    if (selectedGasto && montoGasto > 0 && !isNaN(montoGasto) && selectedPibe.length > 0) {
      const nuevoGasto = {
        tipoGasto: selectedGasto,
        monto: montoGasto,
        participantes: selectedPibe,
      };
      setGastos([...gastos, nuevoGasto]);
      setSelectedGasto('');
      setMontoGasto(0);
      setSelectedPibe([]);
    }
  };

  const handleSubmit = () => {
    const totalPorPersona = {};

    // Inicializar el total por persona
    Pibes.forEach((pibe) => {
      totalPorPersona[pibe] = 0;
    });

    // Calcular los totales por persona para cada gasto
    gastos.forEach((gasto) => {
      const totalParticipantes = gasto.participantes.length;
      if (totalParticipantes === 0) return; // No hay participantes

      const montoPorPersona = gasto.monto / totalParticipantes;
      gasto.participantes.forEach((participante) => {
        totalPorPersona[participante] += montoPorPersona;
      });
    });

    // Mostrar los resultados
    const resultadosTexto = Pibes.map((pibe) => `${pibe}: $${totalPorPersona[pibe].toFixed(2)}`).join(', ');

    setResultados(resultadosTexto);
  };

  return (
    <div>
      <form className="flex flex-col items-stretch md:flex-row">
        <h3 className="lg:text-lg sm:text-sm mr-2 mt-8 py-2 px-2">Nuevo gasto:</h3>
        <select
          className="bg-[#555555] py-2 px-2 m-2 outline-1 text-white rounded-md border-2 border-black/30 shadow-md shadow-black/70"
          value={selectedGasto}
          onChange={handleGastoChange}
        >
          <option value="" disabled>
            Elegir gasto
          </option>
          {Gastos?.map((g, index) => (
            <option key={index} value={g} className="py-2 px-2 mr-2">
              {g}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="overflow-hidden p-2 bg-[#555555] py-2 px-2 m-2 outline-1 text-white rounded-md border-2 border-black/30 shadow-md shadow-black/70"
          placeholder="Monto del gasto"
          value={montoGasto}
          onChange={handleMontoGastoChange}
        />
        <select
          className="overflow-hidden p-2  bg-[#555555] p-x outline-1 text-white rounded-md border-2 border-black/30 shadow-md shadow-black/70"
          multiple
          onChange={handlePibeChange}
        >
          {Pibes.map((pibe, index) => (
            <option key={index} value={pibe}>
              {pibe}
            </option>
          ))}
        </select>
        <button
          type="button"
          className={`bg-[#555555] text-white shadow-md shadow-black/70 p-2 m-2 outline-1 border-black/30 rounded-md border-2 ${
            !(selectedGasto && montoGasto > 0 && !isNaN(montoGasto) && selectedPibe.length > 0)
              ? 'cursor-not-allowed opacity-50' 
              : '' 
          }`}
          onClick={handleAgregarGasto}
          disabled={!(selectedGasto && montoGasto > 0 && !isNaN(montoGasto) && selectedPibe.length > 0)}
        >
          Agregar Gasto
        </button>
      </form>
      <div>
        {gastos.map((gasto, index) => (
          <div key={index} className="bg-gray-100 p-2 mt-2 rounded-md">
            <p className="text-black">
              Gasto: {gasto.tipoGasto}, Monto: ${gasto.monto.toFixed(2)}, Participantes: {gasto.participantes.join(', ')}
            </p>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="bg-[#555555] text-white shadow-md shadow-black/70 py-2 px-2 m-2 outline-1 border-black/30 rounded-md border-2"
        onClick={handleSubmit}
      >
        Calcular total
      </button>
      {resultados && (
        <div className="bg-gray-100 p-2 mt-4 rounded-md">
          <p className="text-black ">{resultados}</p>
        </div>
      )}
    </div>
  );
};

export default Form;

// import React, { useState } from 'react'
// import Gastos from '../utils/Gastos'
// import Pibes from '../utils/Pibes'

// const Form = () => {
//     const [selectedGasto, setSelectedGasto] = useState('');
//     const [selectedPibe, setSelectedPibe] = useState([]);
//     const [montoGasto, setMontoGasto] = useState('');
//     const [resultados, setResultados] = useState(null);

//     const handleGastoChange = (e) => {
//         setSelectedGasto(e.target.value);
//     };

//     const handlePibeChange = (e) => {
//         const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
//         setSelectedPibe(selectedOptions);
//     };

//     const handleMontoGastoChange = (e) => {
//         setMontoGasto(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!selectedGasto) {
//             setResultados("Selecciona un gasto válido antes de calcular.");
//             return;
//         }

//         if (montoGasto <= 0 || isNaN(montoGasto)) {
//             setResultados("Ingresa un monto de gasto válido mayor a cero.");
//             return;
//         }

//         const totalPersonas = selectedPibe.length;
//         const montoPorPersona = montoGasto / totalPersonas;

//         const resultadoTexto = `El monto de $${montoGasto} se divide entre ${totalPersonas} personas, cada uno debe pagar $${montoPorPersona.toFixed(2)}.`;

//         setResultados(resultadoTexto);

//         // Aquí puedes procesar los datos seleccionados (selectedGasto y selectedPibe)
//         console.log('Gasto seleccionado:', selectedGasto);
//         console.log('Personas seleccionadas:', selectedPibe);
//         console.log("Monto del gasto:", montoGasto);
//     };

//     return (
//         <form className="flex flex-col items-stretch md:flex-row"
//             onSubmit={handleSubmit}
//         >
//             <h3 className="lg:text-lg sm:text-sm m-2 mt-8 py-2 px-2">
//                 Nuevo gasto:
//             </h3>
//             <select
//                 className="bg-[#555555] py-2 px-2 m-2 outline-1 text-white rounded-md border-2 border-black/30 shadow-md shadow-black/70"
//                 value={selectedGasto}
//                 onChange={handleGastoChange}
//             >
//                 <option value="" disabled>
//                     Elegir gasto
//                 </option>
//                 {Gastos?.map((g, index) => (
//                     <option
//                         key={index}
//                         value={g}
//                         className="py-2 px-2 mr-2"
//                     >
//                         {g}
//                     </option>
//                 ))}
//             </select>
//             <input
//                 type="number"
//                 className="overflow-hidden pr-2 bg-[#555555] py-2 px-2 m-2 outline-1 text-white rounded-md border-2 border-black/30 shadow-md shadow-black/70"
//                 placeholder="Monto del gasto"
//                 value={montoGasto}
//                 onChange={handleMontoGastoChange}
//             />
//             <select
//                 className="overflow-hidden pr-2  bg-[#555555] py-2 px-2 outline-1 text-white rounded-md border-2 border-black/30 shadow-md shadow-black/70"
//                 multiple
//                 onChange={handlePibeChange}
//             >
//                 {Pibes.map((pibe, index) => (
//                     <option key={index} value={pibe}>
//                         {pibe}
//                     </option>
//                 ))}
//             </select>
//             <button
//                 type='submit'
//                 className="bg-[#555555] text-white shadow-md shadow-black/70 py-2 px-2 m-2 outline-1 border-black/30 rounded-md border-2"
//             >
//                 Calcular
//             </button>
//             {resultados && (
//                 <div className="bg-gray-100 p-2 mt-4 rounded-md">
//                     <p className="text-black">{resultados}</p>
//                 </div>
//             )}
//         </form>
//     )
// }

// export default Form