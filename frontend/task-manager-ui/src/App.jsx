import { useState } from 'react';
import { Container, Card, Badge } from 'react-bootstrap';
import { useTasks } from './hooks/useTasks';
import AddTaskForm from './components/AddTaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import EditTaskModal from './components/EditTaskModal';

function App() {
const { tasks, loading, error, addTask, editTask, toggle, remove } = useTasks();
const [filter, setFilter]         = useState('all');
const [editingTask, setEditingTask] = useState(null); // task being edited

const completedCount = tasks.filter(t => t.isCompleted).length;

return (
  <Container className="py-5" style={{ maxWidth: '600px' }}>
    <div className="d-flex align-items-center gap-3 mb-4">
      <h1 className="h3 mb-0">Task Manager</h1>
      {tasks.length > 0 && (
        <Badge bg="secondary">{completedCount}/{tasks.length} completed</Badge>
      )}
    </div>

    <Card className="shadow-sm">
      <Card.Body>
        <AddTaskForm onAdd={addTask} />
        <TaskFilter current={filter} onChange={setFilter} />

        {error && <div className="alert alert-danger py-2">{error}</div>}

        {loading ? (
          <p className="text-center text-muted py-4">Loading tasks…</p>
        ) : (
          <TaskList
            tasks={tasks}
            filter={filter}
            onToggle={toggle}
            onDelete={remove}
            onEdit={setEditingTask}
          />
        )}
      </Card.Body>
    </Card>

    <EditTaskModal
      task={editingTask}
      onSave={editTask}
      onClose={() => setEditingTask(null)}
    />
  </Container>
);
}

export default App;