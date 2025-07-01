"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MdlUser } from "@/types/mdl-user";
import { MdlModal } from "./mdl-modal";

export default function MdlUserView({
  user,
  open,
  onClose,
  onEdit,
  onDelete,
}: {
  user: MdlUser | null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <MdlModal>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <div><strong>Name:</strong> {user.name}</div>
          <div><strong>AD User ID:</strong> {user.ad_user_id}</div>
          <div><strong>Role:</strong> {user.role}</div>
          <div><strong>Region:</strong> {user.region}</div>
          <div><strong>Site:</strong> {user.site}</div>
        </div>

        <DialogFooter className="pt-4 flex justify-between">
          <Button variant="outline" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </MdlModal>
    </Dialog>
  );
}
