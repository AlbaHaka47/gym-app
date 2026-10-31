import exercises from '../data/exercises';
import { LUGARES } from '../data/filterOptions';
import { OBJETIVOS } from '../data/objetivos';
import { DIAS_SEMANA } from '../data/diasSemana';
import {
  NIVELES,
  HUECOS,
  PLANTILLAS_DIA,
  REPARTO_POR_DIAS,
  DIAS_SEMANA_POR_FRECUENCIA,
  PLANTILLA_LISTA,
  EQUIPAMIENTO_PORTATIL,
} from '../data/generadorConfig';

// El nivel elegido y todos los anteriores
const nivelesPermitidos = (nivel) => {
  const indice = NIVELES.findIndex((n) => n.id === nivel);
  return NIVELES.slice(0, indice + 1).map((n) => n.id);
};

// ¿Se puede hacer este ejercicio en el lugar elegido?
const esCompatibleConLugar = (ejercicio, lugar) => {
  if (ejercicio.lugar === lugar) return true;
  if (lugar === 'gimnasio') return true;

  if (lugar === 'aire-libre') {
    return (
      ejercicio.lugar === 'casa' &&
      ejercicio.equipamiento.every((q) => EQUIPAMIENTO_PORTATIL.includes(q))
    );
  }

  return false;
};

// ¿Encaja este ejercicio en el hueco? El músculo principal es el primero de su lista
const cumpleHueco = (ejercicio, hueco) =>
  ejercicio.grupoMuscular === hueco.grupo &&
  (hueco.principal === null || hueco.principal.includes(ejercicio.musculos[0]));

const elegirAlAzar = (lista) => lista[Math.floor(Math.random() * lista.length)];

// Prefiere ejercicios que aún no estén en la rutina. Dentro del mismo día nunca repite
const elegirEjercicio = (candidatos, usadosRutina, usadosDia) => {
  const delDia = candidatos.filter((e) => !usadosDia.has(e.id));
  const nuevos = delDia.filter((e) => !usadosRutina.has(e.id));
  const opciones = nuevos.length > 0 ? nuevos : delDia;

  return opciones.length > 0 ? elegirAlAzar(opciones) : null;
};

// Los que trabajan más músculos primero, y el core siempre al final
const ordenarDia = (ejercicios) =>
  [...ejercicios].sort((a, b) => {
    const aEsCore = a.grupoMuscular === 'Core';
    const bEsCore = b.grupoMuscular === 'Core';

    if (aEsCore !== bEsCore) return aEsCore ? 1 : -1;
    return b.musculos.length - a.musculos.length;
  });

const parametrosDe = (objetivoId, nivelId) => {
  const objetivo = OBJETIVOS.find((o) => o.id === objetivoId);
  const nivel = NIVELES.find((n) => n.id === nivelId);

  return {
    series: Math.max(2, objetivo.series + nivel.ajusteSeries),
    reps: objetivo.reps,
    descanso: objetivo.descanso,
  };
}; 

// Devuelve los días que tendrá el plan, cada uno con su tipo (o null si es descanso)
const planificarDias = (modo, diasPorSemana) => {
  if (modo === 'lista') {
    return [{ id: 'lista', nombre: 'Mi lista', tipo: PLANTILLA_LISTA }];
  }

  const tipos = REPARTO_POR_DIAS[diasPorSemana];

  if (modo === 'dias') {
    return tipos.map((tipo, indice) => ({
      id: `dia-${crypto.randomUUID()}`,
      nombre: `Día ${indice + 1}`,
      tipo,
    }));
  }

  // Semana: siempre los 7 días; solo los elegidos llevan ejercicios
  const elegidos = DIAS_SEMANA_POR_FRECUENCIA[diasPorSemana];

  return DIAS_SEMANA.map((dia) => {
    const posicion = elegidos.indexOf(dia.id);
    return { ...dia, tipo: posicion === -1 ? null : tipos[posicion] };
  });
};

export function generarRutina({ objetivo, nivel, lugar, diasPorSemana, modo }) {
  if (modo !== 'lista' && !REPARTO_POR_DIAS[diasPorSemana]) {
    throw new Error(`Número de días no válido: ${diasPorSemana}`);
  }

  const niveles = nivelesPermitidos(nivel);
  const catalogo = exercises.filter(
    (e) => niveles.includes(e.dificultad) && esCompatibleConLugar(e, lugar)
  );

  const parametros = parametrosDe(objetivo, nivel);
  const lugarTexto = LUGARES.find((l) => l.value === lugar)?.label.toLowerCase();
  const nivelTexto = NIVELES.find((n) => n.id === nivel)?.label.toLowerCase();

  const usadosRutina = new Set();
  const avisos = new Set();

  const dias = planificarDias(modo, diasPorSemana).map(({ tipo, ...dia }) => {
    if (!tipo) return { ...dia, ejercicios: [] };

    const usadosDia = new Set();
    const elegidos = [];

    PLANTILLAS_DIA[tipo].huecos.forEach((idHueco) => {
      const hueco = HUECOS[idHueco];
      const candidatos = catalogo.filter((e) => cumpleHueco(e, hueco));
      const elegido = elegirEjercicio(candidatos, usadosRutina, usadosDia);

      if (!elegido) {
        avisos.add(
          `No hay ejercicios de ${hueco.etiqueta.toLowerCase()} para ${lugarTexto} y nivel ${nivelTexto}.`
        );
        return;
      }

      usadosRutina.add(elegido.id);
      usadosDia.add(elegido.id);
      elegidos.push(elegido);
    });

    return {
      ...dia,
      ejercicios: ordenarDia(elegidos).map((e) => ({
        uid: crypto.randomUUID(),
        ejercicioId: e.id,
        ...parametros,
      })),
    };
  });

  return { dias, avisos: Array.from(avisos) };
}