import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, type FormEvent } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useCodeEditorConfig } from "../../hooks/use-code-editor-config";
import { useOpenEditEditorConfigDialog } from "../../hooks/use-open-editor-config";
import type { editor } from "monaco-editor";

export function EditEditorConfigDialog() {
  const { onClose, isOpen } = useOpenEditEditorConfigDialog();
  const { options, setOptions } = useCodeEditorConfig();

  const [fontSize, setFontSize] = useState(options.fontSize ?? 16);
  const [wordWrap, setWordWrap] = useState(options.wordWrap ?? "on");
  const [lineNumbers, setLineNumbers] = useState<editor.LineNumbersType>(
    options.lineNumbers ?? "off",
  );

  useEffect(() => {
    setFontSize(options.fontSize ?? 16);
    setWordWrap(options.wordWrap ?? "on");
    setLineNumbers(options.lineNumbers ?? "off");
  }, [isOpen]);

  function handleSave(e: FormEvent) {
    e.preventDefault();
    setOptions({
      fontSize: Number(fontSize),
      wordWrap,
      lineNumbers,
    });
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle>Editor Settings</DialogTitle>
            <DialogDescription>
              Customize your code editor experience.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fontSize" className="text-right">
                Font Size
              </Label>
              <Input
                id="fontSize"
                type="number"
                min={10}
                max={36}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Word Wrap</Label>
              <Select
                value={wordWrap}
                onValueChange={(v) => setWordWrap(v as "on" | "off")}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="on">On</SelectItem>
                  <SelectItem value="off">Off</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Line Numbers</Label>
              <Select
                value={lineNumbers as "on" | "off"}
                onValueChange={(v) => setLineNumbers(v as "on" | "off")}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="on">On</SelectItem>
                  <SelectItem value="off">Off</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
