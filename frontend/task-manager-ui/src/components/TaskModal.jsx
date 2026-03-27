import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { getCurrentDate } from '../helpers/getCurrentDate';

function TaskModal({ task, isOpen, onSave, onEdit, onClose }) {
const [title, setTitle]           = useState('');
const [details, setDetails] = useState('');
const [dueAt, setDueAt]           = useState('');
const [loading, setLoading]       = useState(false);

// Populate fields when the modal opens
useEffect(() => {
  if (task) {
    setTitle(task.title);
    setDetails(task.details ?? '');
    setDueAt(task.dueAt ? task.dueAt.split('T')[0] : ''); // format for date input
  }
}, [task]);

const handleSubmit = async (e) => {
  e.preventDefault();
  const trimmed = title.trim();
  if (!trimmed) return;

  try {
    setLoading(true);
    console.log('Saving task with data:', { title: trimmed, details: details.trim() || null, dueAt: dueAt || null });
    if (task) {
      await onEdit(task.id, { title: trimmed, details: details.trim() || null, dueAt: dueAt || null });
    } else {
      await onSave({ title: trimmed, details: details.trim() || null, dueAt: dueAt || null });
    }
    onClose();
  } finally {
    setLoading(false);
  }
};

const handleClose = () => {
  onClose();
  setTitle('');
  setDetails('');
  setDueAt('');
}

return (
  <Modal show={!!task || !!isOpen} onHide={handleClose} centered>
    <Form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        {(task || isOpen) && <Modal.Title>{task ? 'Edit Task' : 'New Task'}</Modal.Title>}
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Title*</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={loading}
            autoFocus
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={details}
            onChange={e => setDetails(e.target.value)}
            disabled={loading}
            placeholder="Optional"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={dueAt}
            onChange={e => setDueAt(e.target.value)}
            disabled={loading}
            min={getCurrentDate()}  
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading || !title.trim()}>
          {loading ? 'Saving…' : 'Save'}
        </Button>
      </Modal.Footer>
    </Form>
  </Modal>
);
}

export default TaskModal;