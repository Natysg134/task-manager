import { useState } from 'react';
import { Container, Card, Badge, Button } from 'react-bootstrap';
import { useTasks } from './hooks/useTasks';
import TaskModal from './components/TaskModal';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';

function App() {
const { tasks, loading, error, addTask, editTask, toggle, remove } = useTasks();
const [modalOpen, setModalOpen] = useState(false);
const [filter, setFilter] = useState('all');
const [editingTask, setEditingTask] = useState(null); // task being edited

const completedCount = tasks.filter(t => t.isCompleted).length;
const allCompleted = tasks.length > 0 && completedCount === tasks.length;
const badgeVariant = allCompleted ? 'success' : 'secondary';

const handleOpenAddModal = () => {
  setEditingTask(null); // ensure no task is selected for editing
  setModalOpen(true);
}

const handleModalClose = () => {
  setModalOpen(false);
  setEditingTask(null);
}

return (
  <Container className="py-5">
    <div className="d-flex align-items-center gap-3 mb-4">
      <h1 className="h3 mb-0">Task Manager</h1>
      {tasks.length > 0 && (
        <Badge bg={badgeVariant}>{completedCount}/{tasks.length} completed</Badge>
      )}
    </div>

    <Card className="shadow-sm">
      <Button variant="primary" className="rounded-0" onClick={handleOpenAddModal}>
        + Add Task
      </Button>
      <Card.Body>
        <TaskFilter current={filter} onChange={setFilter} />

        {error && <div className="alert alert-danger py-2">{error}</div>}

        {loading ? (
          <p className="text-center text-muted py-4">Loading tasks…</p>
        ) : (
          <div className='w-100 overflow-auto'>
          <TaskList
            tasks={tasks}
            filter={filter}
            onToggle={toggle}
            onDelete={remove}
            onEdit={setEditingTask}
          />
          </div>
        )}
      </Card.Body>
    </Card>
    <TaskModal
      task={editingTask}
      isOpen={modalOpen}
      onSave={addTask}
      onEdit={editTask}
      onClose={handleModalClose}
    />
  </Container>
);
}

export default App;