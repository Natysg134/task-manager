import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function EditTaskModal({ task, onSave, onClose }) {
const [title, setTitle]           = useState('');
const [description, setDescription] = useState('');
const [dueAt, setDueAt]           = useState('');
const [loading, setLoading]       = useState(false);

// Populate fields when the modal opens
useEffect(() => {
  if (task) {
    setTitle(task.title);
    setDescription(task.description ?? '');
    setDueAt(task.dueAt ? task.dueAt.split('T')[0] : ''); // format for date input
  }
}, [task]);

const handleSubmit = async (e) => {
  e.preventDefault();
  const trimmed = title.trim();
  if (!trimmed) return;

  try {
    setLoading(true);
    console.log('Saving task with data:', { title: trimmed, description: description.trim() || null, dueAt: dueAt || null });
    await onSave(task.id, { title: trimmed, description: description.trim() || null, dueAt: dueAt || null });
    onClose();
  } finally {
    setLoading(false);
  }
};

return (
  <Modal show={!!task} onHide={onClose} centered>
    <Form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={loading}
            autoFocus
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
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

export default EditTaskModal;