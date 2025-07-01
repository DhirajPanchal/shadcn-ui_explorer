import { DialogContent } from "@/components/ui/dialog";

export function MdlModal({ children }: { children: React.ReactNode }) {
  return (
    <DialogContent className="max-w-md sm:max-w-lg rounded-lg shadow-xl border">
      {children}
    </DialogContent>
  );
}
