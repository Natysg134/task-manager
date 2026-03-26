import { ButtonGroup, Button } from 'react-bootstrap';

const FILTERS = [
{ label: 'All',       value: 'all' },
{ label: 'Active',    value: 'active' },
{ label: 'Completed', value: 'completed' },
];

function TaskFilter({ current, onChange }) {
return (
  <ButtonGroup className="w-100 mb-3">
    {FILTERS.map(({ label, value }) => (
      <Button
        key={value}
        size="sm"
        variant={current === value ? 'primary' : 'outline-primary'}
        onClick={() => onChange(value)}
      >
        {label}
      </Button>
    ))}
  </ButtonGroup>
);
}

export default TaskFilter;