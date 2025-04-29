
import { useState } from 'react';
import { Todo } from '@/types/todo';
import { Check, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Add a small delay to allow for animation
    setTimeout(() => onDelete(todo.id), 300);
  };

  // Format the due date if it exists
  const formattedDueDate = todo.dueDate 
    ? format(new Date(todo.dueDate), 'MMM dd')
    : null;

  // Check if todo is overdue
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div 
      className={cn(
        "group flex items-center justify-between p-4 rounded-lg border mb-2 animate-slide-in transition-all duration-300 hover:bg-secondary/30",
        todo.completed && "bg-muted",
        isDeleting && "opacity-0 transform -translate-y-2",
      )}
    >
      <div className="flex items-center space-x-4 overflow-hidden">
        <Button 
          variant="outline" 
          size="icon" 
          className={cn(
            "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors",
            todo.completed ? "bg-primary border-primary" : "bg-transparent",
            `border-todo-${todo.category}`
          )} 
          onClick={() => onToggle(todo.id)}
        >
          {todo.completed && <Check className="h-4 w-4 text-primary-foreground" />}
        </Button>
        
        <div className="overflow-hidden">
          <p className={cn(
            "text-sm font-medium truncate transition-all",
            todo.completed && "line-through text-muted-foreground"
          )}>
            {todo.text}
          </p>
          
          <div className="flex items-center mt-1 text-xs text-muted-foreground">
            <span className={cn(
              "inline-block h-2 w-2 rounded-full mr-2",
              `bg-todo-${todo.category}`
            )}></span>
            <span className="capitalize">{todo.category}</span>
            
            {formattedDueDate && (
              <div className={cn(
                "flex items-center ml-3",
                isOverdue && !todo.completed && "text-destructive"
              )}>
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formattedDueDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleDelete}
      >
        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
      </Button>
    </div>
  );
}
