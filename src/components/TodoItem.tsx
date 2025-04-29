
import { useState } from 'react';
import { Todo } from '@/types/todo';
import { Check, Trash2, Calendar, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit, index, moveItem }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [dragOver, setDragOver] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Add a small delay to allow for animation
    setTimeout(() => onDelete(todo.id), 300);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    moveItem(dragIndex, index);
    setDragOver(false);
  };

  // Format the due date if it exists
  const formattedDueDate = todo.dueDate 
    ? format(new Date(todo.dueDate), 'MMM dd')
    : null;

  // Check if todo is overdue
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "group flex items-center justify-between p-4 rounded-lg border mb-2 animate-slide-in transition-all duration-300 hover:bg-secondary/30",
        todo.completed && "bg-muted",
        isDeleting && "opacity-0 transform -translate-y-2",
        dragOver && "border-2 border-dashed border-primary bg-primary/5",
        "cursor-move"
      )}
    >
      <div className="flex items-center space-x-4 overflow-hidden flex-grow">
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
        
        <div className="overflow-hidden flex-grow">
          {isEditing ? (
            <div className="flex gap-2 w-full">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="w-full h-8 text-sm"
              />
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={handleSaveEdit} className="h-8 w-8">
                  <Save className="h-4 w-4 text-muted-foreground hover:text-primary" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleCancelEdit} className="h-8 w-8">
                  <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            </div>
          ) : (
            <p className={cn(
              "text-sm font-medium truncate transition-all",
              todo.completed && "line-through text-muted-foreground"
            )}>
              {todo.text}
            </p>
          )}
          
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
      
      <div className="flex space-x-1">
        {!isEditing && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleEdit}
          >
            <Edit className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
        </Button>
      </div>
    </div>
  );
}
