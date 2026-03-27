export function getDueState(task) {
  if (!task.dueAt || task.isCompleted) return false;
  const dueDate = new Date(task.dueAt);
  const today = new Date();
  
  // Set both to midnight for date-only comparison
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  
  // Task is overdue if due date is in the past (before today)
  return dueDate < today;
}