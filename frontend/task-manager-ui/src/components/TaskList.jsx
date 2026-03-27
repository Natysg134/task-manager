import { Table } from 'react-bootstrap';
import TaskItem from './TaskItem';
import { getDueState } from '../helpers/getDueState';

function TaskList({ tasks, filter, onToggle, onDelete, onEdit }) {
const visible = tasks.filter(t => {
  if (filter === 'active')    return !t.isCompleted;
  if (filter === 'completed') return  t.isCompleted;
  if (filter === 'overdue')   return getDueState (t);
  return true;
});

const emptyMessages = {
  all:       'No tasks yet. Add one above!',
  active:    'No active tasks.',
  completed: 'Nothing completed yet.',
  overdue:   'No overdue tasks.',
};

if (visible.length === 0) {
  return <p className="text-center text-muted py-4">{emptyMessages[filter]}</p>;
}

return (
    <Table striped bordered hover className='text-center'>
      <thead>
        <tr>
          <th>Status</th>
          <th>Task Name</th>
          <th>Details</th>
          <th>Due Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {visible.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
      </tbody>
  </Table>
);
}

export default TaskList;