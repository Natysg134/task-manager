import { useState } from 'react';
import { Form, Button, InputGroup, Alert, FormControl } from 'react-bootstrap';

function AddTaskForm({ onAdd }) {
const [title, setTitle]           = useState('');
const [description, setDescription] = useState('');
const [dueAt, setDueAt]           = useState('');
const [loading, setLoading]       = useState(false);
const [error, setError]           = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  const trimmed = title.trim();
  if (!trimmed) return;

  try {
    setLoading(true);
    setError(null);
    await onAdd({ title: trimmed, description: description.trim() || null, dueAt: dueAt || null });
    setTitle('');
    setDescription('');
    setDueAt('');
  } catch {
    setError('Failed to add task.');
  } finally {
    setLoading(false);
  }
};

return (
  <Form onSubmit={handleSubmit} className="mb-3">
    <InputGroup className="mb-2">
      <Form.Control
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={loading}
        autoFocus
      />
      <Button type="submit" variant="primary" disabled={loading || !title.trim()}>
        {loading ? 'Adding…' : 'Add'}
      </Button>
    </InputGroup>
    <Form.Control
      as="textarea"
      rows={2}
      placeholder="Description (optional)"
      value={description}
      onChange={e => setDescription(e.target.value)}
      disabled={loading}
    />
    <FormControl
      type="date"
      placeholder="Due date (optional, e.g. 2024-12-31)"
      value={dueAt}
      onChange={e => setDueAt(e.target.value)}
      disabled={loading}
    />
    {error && <Alert variant="danger" className="mt-2 py-2 mb-0">{error}</Alert>}
  </Form>
);
}

export default AddTaskForm;