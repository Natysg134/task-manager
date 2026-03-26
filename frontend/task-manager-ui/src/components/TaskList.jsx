import { ListGroup } from 'react-bootstrap';
import TaskItem from './TaskItem';

function TaskList({ tasks, filter, onToggle, onDelete, onEdit }) {
const visible = tasks.filter(t => {
  if (filter === 'active')    return !t.isCompleted;
  if (filter === 'completed') return  t.isCompleted;
  return true;
});

const emptyMessages = {
  all:       'No tasks yet. Add one above!',
  active:    'No active tasks.',
  completed: 'Nothing completed yet.',
};

if (visible.length === 0) {
  return <p className="text-center text-muted py-4">{emptyMessages[filter]}</p>;
}

return (
  <ListGroup variant="flush">
    {visible.map(task => (
      <TaskItem
        key={task.id}
        task={task}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    ))}
  </ListGroup>
);
}

export default TaskList;