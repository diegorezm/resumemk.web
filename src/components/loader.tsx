import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = {
  className?: string;
};

export function Loader({ className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-full",
        className,
      )}
    >
      <Loader2 className="animate-spin" />
    </div>
  );
}
