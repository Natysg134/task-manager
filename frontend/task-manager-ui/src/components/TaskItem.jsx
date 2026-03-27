import { useState, memo } from 'react';
import { Form, Button, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { formatDate } from '../helpers/formatDate';
import { getDueState } from '../helpers/getDueState';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
const [busy, setBusy] = useState(false);

const isDueDate = getDueState (task);

const handleEdit = () => {
  onEdit(task);
}

const handleToggle = async () => {
  setBusy(true);
  await onToggle(task); // full task, not just id
  // add a small delay to show the spinner for better UX
  setTimeout(() => setBusy(false), 500);
};

const handleDelete = async () => {
  setBusy(true);
  await onDelete(task.id);
  // add a small delay to show the spinner for better UX
  setTimeout(() => setBusy(false), 500);
};

return (
  <tr className="px-0 position-relative">
    <td>
      <div className="d-flex align-items-center justify-content-center">
      <Form.Check
        type="switch"
        id={`task-${task.id}`}
        checked={task.isCompleted}
        onChange={handleToggle}
        disabled={false}
      />
      {busy && 
        <span className="position-absolute bg-black w-100 h-100 d-flex align-items-center justify-content-center" style={{ "--bs-bg-opacity": .5, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Spinner className="text-white" animation="border" size="sm"  />
        </span>
        }
    </div>
  </td>
  <td>
    {isDueDate && (
      <OverlayTrigger overlay={<Tooltip id={`tooltip-${task.id}`}>Due date passed</Tooltip>}>
        <i className='bi bi-exclamation-circle text-danger me-2'/>
      </OverlayTrigger>
    )}
    <span className={isDueDate ? 'text-danger' : ''}>{task.title}</span>
  </td>
  <td>{task.details}</td>
  <td>{formatDate(task.dueAt)}</td>
  <td>
    <div className="d-flex gap-2 justify-content-center">
      <OverlayTrigger overlay={<Tooltip id={`tooltip-${task.id}`}>Edit</Tooltip>}>
        <Button
          variant="primary"
          size="sm"
          className="text-white"
          onClick={handleEdit}
          disabled={false}
          aria-label='edit'
        >
          <i className="bi bi-pencil" />
        </Button>
      </OverlayTrigger>

      <OverlayTrigger overlay={<Tooltip id={`tooltip-${task.id}`}>Delete</Tooltip>}>
        <Button
          variant="danger"
          size="sm"
          className="text-white"
          onClick={handleDelete}
          disabled={false}
          aria-label='delete'
        >
          <i className="bi bi-trash" />
        </Button>
      </OverlayTrigger>
    </div>
  </td>
</tr>
);
}

export default memo(TaskItem);