
import { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useTodos } from '@/hooks/useTodos';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TodoList } from '@/components/TodoList';
import { AddTodoForm } from '@/components/AddTodoForm';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { StatusFilter } from '@/components/StatusFilter';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Shortcuts } from '@/components/Shortcuts';

const Index = () => {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    searchTerm,
    setSearchTerm,
    totalTodos,
    activeTodos,
    completedTodos
  } = useTodos();

  return (
    <ThemeProvider>
      <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Smart Todo
            </h1>
            <div className="flex items-center gap-2">
              <Shortcuts />
              <ThemeToggle />
            </div>
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle>Your Tasks</CardTitle>
                <AddTodoForm onAddTodo={addTodo} />
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <StatusFilter
                    currentFilter={filter}
                    onFilterChange={setFilter}
                    counts={{
                      all: totalTodos,
                      active: activeTodos,
                      completed: completedTodos,
                    }}
                  />
                  
                  <CategoryFilter
                    selectedCategory={categoryFilter}
                    onSelectCategory={setCategoryFilter}
                  />
                </div>
                
                <Separator className="my-4" />
                
                <div className="h-[500px] overflow-y-auto pr-1 scrollbar-hide">
                  <TodoList
                    todos={todos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Smart Todo Compass &copy; 2023 - Press <kbd className="px-1 border rounded text-xs">Alt+N</kbd> to add a new todo, <kbd className="px-1 border rounded text-xs">Alt+T</kbd> to toggle theme
          </p>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
