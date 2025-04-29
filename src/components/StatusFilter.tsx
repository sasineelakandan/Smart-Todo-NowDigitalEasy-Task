
import { TodoFilter } from '@/types/todo';
import { Button } from '@/components/ui/button';

interface StatusFilterProps {
  currentFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export function StatusFilter({ currentFilter, onFilterChange, counts }: StatusFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant={currentFilter === 'all' ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange('all')}
      >
        All ({counts.all})
      </Button>
      <Button
        variant={currentFilter === 'active' ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange('active')}
      >
        Active ({counts.active})
      </Button>
      <Button
        variant={currentFilter === 'completed' ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange('completed')}
      >
        Completed ({counts.completed})
      </Button>
    </div>
  );
}
