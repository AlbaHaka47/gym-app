import { useState } from 'react';

const DIAS_SEMANA = [
  { id: 'lunes', nombre: 'Lunes' },
  { id: 'martes', nombre: 'Martes' },
  { id: 'miercoles', nombre: 'Miércoles' },
  { id: 'jueves', nombre: 'Jueves' },
  { id: 'viernes', nombre: 'Viernes' },
  { id: 'sabado', nombre: 'Sábado' },
  { id: 'domingo', nombre: 'Domingo' },
];

export function useRutina() {
  const [rutina, setRutina] = useState({
    nombre: "",
    objetivo: "hipertrofia",
    dias: DIAS_SEMANA.map((dia) => ({ ...dia, ejercicios: [] })),
  });

  const [diaActivo, setDiaActivo] = useState("lunes");

  const agregarEjercicio = (ejercicioId) => {
    const nuevo = {
      uid: crypto.randomUUID(),
      ejercicioId,
      series: 3,
      reps: 10,
      descanso: 60,
    };

    setRutina((prev) => ({
      ...prev,
      dias: prev.dias.map((dia) =>
        dia.id === diaActivo
          ? { ...dia, ejercicios: [...dia.ejercicios, nuevo] }
          : dia
      ),
    }));
  };

  const actualizarEjercicio = (diaId, uid, campo, valor) => {
    setRutina((prev) => ({
      ...prev,
      dias: prev.dias.map((dia) =>
        dia.id === diaId
          ? {
              ...dia,
              ejercicios: dia.ejercicios.map((item) =>
                item.uid === uid ? { ...item, [campo]: valor } : item
              ),
            }
          : dia
      ),
    }));
  };

  const eliminarEjercicio = (diaId, uid) => {
    setRutina((prev) => ({
      ...prev,
      dias: prev.dias.map((dia) =>
        dia.id === diaId
          ? {
              ...dia,
              ejercicios: dia.ejercicios.filter((item) => item.uid !== uid),
            }
          : dia
      ),
    }));
  };

  const moverEjercicio = (diaId, uid, direccion) => {
    setRutina((prev) => ({
      ...prev,
      dias: prev.dias.map((dia) => {
        if (dia.id !== diaId) return dia;

        const indice = dia.ejercicios.findIndex((item) => item.uid === uid);
        const destino = indice + direccion;

        if (destino < 0 || destino >= dia.ejercicios.length) return dia;

        const copia = [...dia.ejercicios];
        [copia[indice], copia[destino]] = [copia[destino], copia[indice]];

        return { ...dia, ejercicios: copia };
      }),
    }));
  };

  return {
    rutina,
    diaActivo,
    setDiaActivo,
    agregarEjercicio,
    actualizarEjercicio,
    eliminarEjercicio,
    moverEjercicio,
  };
}