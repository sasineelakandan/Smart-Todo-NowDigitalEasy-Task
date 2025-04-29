
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Todo, TodoCategory, TodoFilter } from '../types/todo';
import { toast } from 'sonner';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        // Parse the JSON data
        const parsedTodos = JSON.parse(savedTodos);
        
        // Convert string dates back to Date objects
        return parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : null
        }));
      } catch (error) {
        console.error('Failed to parse todos from localStorage', error);
        return [];
      }
    }
    return [];
  });
  
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<TodoCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = useCallback((text: string, category: TodoCategory, dueDate: Date | null) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      category,
      dueDate,
      createdAt: new Date()
    };
    
    setTodos(prevTodos => [newTodo, ...prevTodos]);
    toast.success('Todo added successfully');
  }, []);

  // Toggle a todo's completed status
  const toggleTodo = useCallback((id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Delete a todo
  const deleteTodo = useCallback((id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    toast.success('Todo deleted');
  }, []);

  // Edit a todo's text
  const editTodo = useCallback((id: string, newText: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
    toast.success('Todo updated');
  }, []);

  // Reorder todos (for drag and drop)
  const reorderTodos = useCallback((fromIndex: number, toIndex: number) => {
    setTodos(prevTodos => {
      const result = Array.from(prevTodos);
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  }, []);

  // Filter todos based on current filter state, category filter, and search term
  const filteredTodos = useMemo(() => {
    let result = [...todos];
    
    // Apply status filter
    if (filter === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      result = result.filter(todo => todo.completed);
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(todo => todo.category === categoryFilter);
    }
    
    // Apply search filter if search term is not empty
    if (searchTerm.trim() !== '') {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(todo => 
        todo.text.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    return result;
  }, [todos, filter, categoryFilter, searchTerm]);

  // Set up keyboard shortcut for adding todo
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'n') {
        document.getElementById('add-todo-button')?.click();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return {
    todos: filteredTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    reorderTodos,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    searchTerm,
    setSearchTerm,
    totalTodos: todos.length,
    activeTodos: todos.filter(todo => !todo.completed).length,
    completedTodos: todos.filter(todo => todo.completed).length
  };
}
