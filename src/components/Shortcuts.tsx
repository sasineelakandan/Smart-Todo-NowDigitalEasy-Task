
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

export function Shortcuts() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">Keyboard Shortcuts</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Keyboard Shortcuts</DrawerTitle>
            <DrawerDescription>
              Keyboard shortcuts to enhance your productivity
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <div className="font-medium">Add new todo</div>
                <kbd className="pointer-events-none inline-flex h-8 select-none items-center gap-1 rounded border bg-muted px-3 font-mono text-sm font-medium">
                  <span>Alt</span> + <span>N</span>
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <div className="font-medium">Toggle dark/light mode</div>
                <kbd className="pointer-events-none inline-flex h-8 select-none items-center gap-1 rounded border bg-muted px-3 font-mono text-sm font-medium">
                  <span>Alt</span> + <span>T</span>
                </kbd>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
