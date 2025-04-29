
import { TodoCategory } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selectedCategory: TodoCategory | 'all';
  onSelectCategory: (category: TodoCategory | 'all') => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const categories: (TodoCategory | 'all')[] = ['all', 'work', 'personal', 'shopping', 'other'];
  
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map(category => (
        <Button
          key={category}
          variant="outline"
          size="sm"
          onClick={() => onSelectCategory(category)}
          className={cn(
            "capitalize",
            selectedCategory === category && (
              category === 'all' 
                ? "bg-primary text-primary-foreground" 
                : `bg-todo-${category} text-white border-todo-${category}`
            )
          )}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
