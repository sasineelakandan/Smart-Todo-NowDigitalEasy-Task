
import { Button } from '@/components/ui/button';
import { Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { toggleTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode (Alt+T)`}
    >
      <Moon className="h-5 w-5" />
    </Button>
  );
}
