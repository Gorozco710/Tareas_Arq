export const APP_NAME = 'TaskFlow';
export const STATUSES = Object.freeze({pending: 'Pendiente', done: 'Completada'});
export function validateTitle(value) {
  if (typeof value !== 'string' || !value.trim()) return 'Escribe un título.';
  if (value.trim().length > 100) return 'El título admite hasta 100 caracteres.';
  return null;
}
export function summarize(tasks) {
  const done = tasks.filter(task => task.status === 'done').length;
  return {total: tasks.length, done, pending: tasks.length - done};
}
