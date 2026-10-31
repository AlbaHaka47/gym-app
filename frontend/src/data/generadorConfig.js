// El orden importa: un nivel incluye los ejercicios de los niveles anteriores
export const NIVELES = [
  { id: 'principiante', label: 'Principiante', ajusteSeries: -1 },
  { id: 'intermedio', label: 'Intermedio', ajusteSeries: 0 },
  { id: 'avanzado', label: 'Avanzado', ajusteSeries: 0 },
];

// Un hueco es "una plaza" que el generador rellena con un ejercicio.
// principal: el músculo principal del ejercicio debe ser uno de estos
// grupo: el grupoMuscular que debe tener el ejercicio
export const HUECOS = {
  pecho: { etiqueta: 'Pecho', principal: ['pecho'], grupo: 'Tren superior' },
  espalda: { etiqueta: 'Espalda', principal: ['espalda'], grupo: 'Tren superior' },
  hombros: { etiqueta: 'Hombros', principal: ['hombros'], grupo: 'Tren superior' },
  brazos: { etiqueta: 'Brazos', principal: ['brazos'], grupo: 'Tren superior' },
  empuje: { etiqueta: 'Empuje', principal: ['pecho', 'hombros'], grupo: 'Tren superior' },
  tiron: { etiqueta: 'Tirón', principal: ['espalda'], grupo: 'Tren superior' },
  cuadriceps: { etiqueta: 'Cuádriceps', principal: ['cuadriceps'], grupo: 'Tren inferior' },
  'cadena-posterior': {
    etiqueta: 'Cadena posterior',
    principal: ['isquiotibiales', 'gluteos'],
    grupo: 'Tren inferior',
  },
  pierna: {
    etiqueta: 'Pierna',
    principal: ['cuadriceps', 'isquiotibiales', 'gluteos'],
    grupo: 'Tren inferior',
  },
  gemelos: { etiqueta: 'Gemelos', principal: ['gemelos'], grupo: 'Tren inferior' },
  core: { etiqueta: 'Core', principal: ['abdominales'], grupo: 'Core' },
  'cuerpo-completo': { etiqueta: 'Cuerpo completo', principal: null, grupo: 'Cuerpo completo' },
};

// Cada tipo de día es una lista de huecos (el core va siempre el último)
export const PLANTILLAS_DIA = {
  'cuerpo-completo': {
    nombre: 'Cuerpo completo',
    huecos: ['pierna', 'empuje', 'tiron', 'cuerpo-completo', 'core'],
  },
  torso: {
    nombre: 'Torso',
    huecos: ['pecho', 'espalda', 'hombros', 'brazos', 'core'],
  },
  pierna: {
    nombre: 'Pierna',
    huecos: ['cuadriceps', 'cadena-posterior', 'pierna', 'gemelos', 'core'],
  },
};

// Qué tipo de día toca en cada día de entrenamiento, según los días por semana
export const REPARTO_POR_DIAS = {
  2: ['cuerpo-completo', 'cuerpo-completo'],
  3: ['cuerpo-completo', 'cuerpo-completo', 'cuerpo-completo'],
  4: ['torso', 'pierna', 'torso', 'pierna'],
  5: ['torso', 'pierna', 'torso', 'pierna', 'cuerpo-completo'],
};

// En el modo Semana, a qué días de la semana corresponden (ids de DIAS_SEMANA)
export const DIAS_SEMANA_POR_FRECUENCIA = {
  2: ['lunes', 'jueves'],
  3: ['lunes', 'miercoles', 'viernes'],
  4: ['lunes', 'martes', 'jueves', 'viernes'],
  5: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
};

// En el modo Lista se genera un único bloque de este tipo
export const PLANTILLA_LISTA = 'cuerpo-completo';

// En aire libre también valen los ejercicios de casa que solo necesitan esto
export const EQUIPAMIENTO_PORTATIL = ['sin-equipamiento', 'gomas'];