import exercises from '../data/exercises';

export const ejercicioPorId = (id) => exercises.find((e) => e.id === id);