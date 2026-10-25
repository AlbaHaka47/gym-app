import { ejercicioPorId } from './ejercicioPorId';

const MODOS = ['lista', 'semana', 'dias'];

export function normalizarRutina(rutina) {
  try {
    const completos = MODOS.every(
      (modo) => Array.isArray(rutina.planes[modo]) && rutina.planes[modo].length > 0
    );
    if (!completos || !MODOS.includes(rutina.modo)) return null;

    const planes = Object.fromEntries(
      Object.entries(rutina.planes).map(([modo, dias]) => [
        modo,
        dias.map((dia) => ({
          ...dia,
          ejercicios: dia.ejercicios.filter((item) =>
            ejercicioPorId(item.ejercicioId)
          ),
        })),
      ])
    );

    return { ...rutina, planes };
  } catch {
    return null;
  }
}