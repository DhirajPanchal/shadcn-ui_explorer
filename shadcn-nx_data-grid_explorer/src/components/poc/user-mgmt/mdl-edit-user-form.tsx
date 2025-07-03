"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MdlModal } from "./mdl-modal";
import { MdlUser } from "@/types/mdl-user";

interface Props {
  open: boolean;
  user: MdlUser;
  onClose: () => void;
  onSave: (user: MdlUser) => void;
}

export default function MdlEditUserForm({ open, user, onClose, onSave }: Props) {
  const [form, setForm] = useState({ ...user });

  useEffect(() => {
    setForm({ ...user });
  }, [user]);

  const handleSubmit = () => {
    const now = new Date().toISOString();
    onSave({
      ...form,
      ad_user_id: Number(form.ad_user_id),
      role: form.role as MdlUser["role"],
      last_modification_date: now,
      last_modification_user: "admin",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <MdlModal>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {["name", "ad_user_id", "role", "region", "site", "image_url"].map(
            (field) => (
              <div key={field} className="grid gap-2">
                <Label>{field.replace("_", " ").toUpperCase()}</Label>
                <Input
                  value={(form as any)[field]}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [field]: e.target.value }))
                  }
                />
              </div>
            )
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogFooter>
      </MdlModal>
    </Dialog>
  );
}
