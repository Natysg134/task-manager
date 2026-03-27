export function getDueState(task) {
  if (!task.dueAt || task.isCompleted) return false;
  const now = new Date();
  const dueDate = new Date(task.dueAt);
  return dueDate <= now;
}