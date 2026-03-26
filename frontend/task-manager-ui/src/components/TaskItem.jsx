import { useState } from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
const [busy, setBusy] = useState(false);

const handleToggle = async () => {
  setBusy(true);
  await onToggle(task); // full task, not just id
  setBusy(false);
};

const handleDelete = async () => {
  setBusy(true);
  await onDelete(task.id);
};

return (
  <ListGroup.Item className={`px-0 ${busy ? 'opacity-50' : ''}`}>
    <div className="d-flex align-items-center justify-content-between">
      <Form.Check
        type="checkbox"
        id={`task-${task.id}`}
        checked={task.isCompleted}
        onChange={handleToggle}
        disabled={busy}
        label={
          <span
            onClick={handleToggle}
            style={{
              textDecoration: task.isCompleted ? 'line-through' : 'none',
              color: task.isCompleted ? '#6c757d' : 'inherit',
              cursor: 'pointer',
            }}
          >
            {task.title}
          </span>
        }
      />
      <div className="d-flex gap-2">
        <Button
          variant="link"
          size="sm"
          className="text-secondary p-0"
          onClick={() => onEdit(task)}
          disabled={busy}
        >
          <i className="bi bi-pencil" />
        </Button>
        <Button
          variant="link"
          size="sm"
          className="text-danger p-0"
          onClick={handleDelete}
          disabled={busy}
        >
          <i className="bi bi-trash" />
        </Button>
      </div>
    </div>

    {task.description && (
      <p className="text-muted small mb-0 mt-1 ms-4">{task.description}</p>
    )}
  </ListGroup.Item>
);
}

export default TaskItem;