import { useState, useEffect } from 'react';
import { normalizarRutina } from '../utils/normalizarRutina';

const CLAVE = 'anywherefit:rutinas';

const cargar = () => {
  try {
    const texto = localStorage.getItem(CLAVE);
    const lista = texto ? JSON.parse(texto) : [];
    if (!Array.isArray(lista)) return [];

    return lista
      .map(normalizarRutina)
      .filter((rutina) => rutina && typeof rutina.id === 'string');
  } catch {
    return [];
  }
};

export function useRutinasGuardadas() {
  const [rutinas, setRutinas] = useState(cargar);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(rutinas));
    } catch {
      // Sin espacio o almacenamiento bloqueado: seguimos sin guardar
    }
  }, [rutinas]);

  const guardarRutina = (rutina) => {
    const id = rutina.id ?? crypto.randomUUID();
    const copia = { ...rutina, id, guardadaEn: new Date().toISOString() };

    setRutinas((prev) =>
      prev.some((r) => r.id === id)
        ? prev.map((r) => (r.id === id ? copia : r))
        : [copia, ...prev]
    );

    return id;
  };

  const eliminarRutina = (id) => {
    setRutinas((prev) => prev.filter((r) => r.id !== id));
  };

  return { rutinas, guardarRutina, eliminarRutina };
}