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

const crearDias = (lista) =>
  lista.map((dia) => ({ ...dia, ejercicios: [] }));

const PLANES_INICIALES = {
  lista: crearDias([{ id: 'lista', nombre: 'Mi lista' }]),
  semana: crearDias(DIAS_SEMANA),
  dias: crearDias([
    { id: 'dia-1', nombre: 'Día 1' },
    { id: 'dia-2', nombre: 'Día 2' },
    { id: 'dia-3', nombre: 'Día 3' },
  ]),
};

export function useRutina() {
  const [rutina, setRutina] = useState({
    nombre: "",
    objetivo: "hipertrofia",
    modo: "semana",
    planes: PLANES_INICIALES,
  });

  const [diaActivo, setDiaActivo] = useState("lunes");

  const dias = rutina.planes[rutina.modo];

  const cambiarModo = (nuevoModo) => {
    setRutina((prev) => ({ ...prev, modo: nuevoModo }));
    setDiaActivo(rutina.planes[nuevoModo][0].id);
  };

  const actualizarDias = (cambiar) => {
    setRutina((prev) => ({
      ...prev,
      planes: {
        ...prev.planes,
        [prev.modo]: cambiar(prev.planes[prev.modo]),
      },
    }));
  };

  const agregarEjercicio = (ejercicioId) => {
    const nuevo = {
      uid: crypto.randomUUID(),
      ejercicioId,
      series: 3,
      reps: 10,
      descanso: 60,
    };

    actualizarDias((diasActuales) =>
      diasActuales.map((dia) =>
        dia.id === diaActivo
          ? { ...dia, ejercicios: [...dia.ejercicios, nuevo] }
          : dia
      )
    );
  };

  const actualizarEjercicio = (diaId, uid, campo, valor) => {
    actualizarDias((diasActuales) =>
      diasActuales.map((dia) =>
        dia.id === diaId
          ? {
              ...dia,
              ejercicios: dia.ejercicios.map((item) =>
                item.uid === uid ? { ...item, [campo]: valor } : item
              ),
            }
          : dia
      )
    );
  };

  const eliminarEjercicio = (diaId, uid) => {
    actualizarDias((diasActuales) =>
      diasActuales.map((dia) =>
        dia.id === diaId
          ? {
              ...dia,
              ejercicios: dia.ejercicios.filter((item) => item.uid !== uid),
            }
          : dia
      )
    );
  };

  const moverEjercicio = (diaId, uid, direccion) => {
    actualizarDias((diasActuales) =>
      diasActuales.map((dia) => {
        if (dia.id !== diaId) return dia;

        const indice = dia.ejercicios.findIndex((item) => item.uid === uid);
        const destino = indice + direccion;

        if (destino < 0 || destino >= dia.ejercicios.length) return dia;

        const copia = [...dia.ejercicios];
        [copia[indice], copia[destino]] = [copia[destino], copia[indice]];

        return { ...dia, ejercicios: copia };
      })
    );
  };

  return {
    rutina,
    dias,
    diaActivo,
    setDiaActivo,
    cambiarModo,
    agregarEjercicio,
    actualizarEjercicio,
    eliminarEjercicio,
    moverEjercicio,
  };
}