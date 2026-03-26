import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

export function useTasks() {
const [tasks, setTasks]     = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError]     = useState(null);

const fetchTasks = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);
    const { data } = await getTasks();
    setTasks(data);
  } catch {
    setError('Could not load tasks. Is the backend running?');
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  fetchTasks();
}, [fetchTasks]);

const addTask = async (data) => {
  const { data: created } = await createTask(data);
  setTasks(prev => [created, ...prev]);
};

const editTask = async (id, data) => {
  const { data: updated } = await updateTask(id, data);
  setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
};

const toggle = async (task) => {
  await editTask(task.id, {
    title: task.title,
    description: task.description,
    isCompleted: !task.isCompleted,
    dueAt: task.dueAt
  });
};

const remove = async (id) => {
  await deleteTask(id);
  setTasks(prev => prev.filter(t => t.id !== id));
};

return { tasks, loading, error, addTask, editTask, toggle, remove };
}