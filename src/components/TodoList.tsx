
import { TodoItem } from '@/components/TodoItem';
import { Todo } from '@/types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

export function TodoList({ todos, onToggle, onDelete, onEdit, onReorder }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
        <p>No todos found</p>
        <p className="text-sm mt-1">Add a new todo to get started</p>
      </div>
    );
  }

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    onReorder(dragIndex, hoverIndex);
  };

  return (
    <div className="space-y-2 mt-4">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          index={index}
          moveItem={moveItem}
        />
      ))}
    </div>
  );
}
