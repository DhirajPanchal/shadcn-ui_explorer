"use client";

import { MdlUser } from "@/types/mdl-user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MdlModal } from "./mdl-modal";

interface Props {
  open: boolean;
  user: MdlUser | null;
  onClose: () => void;
  onSave: (user: MdlUser) => void;
}

export default function MdlUserForm({ open, user, onClose, onSave }: Props) {
  const [form, setForm] = useState({
    id: 0,
    name: "",
    role: "VIEWER",
    region: "",
    site: "",
    ad_user_id: "",
    image_url: "male.png",
  });

  useEffect(() => {
    if (user) {
      setForm({
        id: user.id,
        name: user.name,
        role: user.role,
        region: user.region,
        site: user.site,
        ad_user_id: String(user.ad_user_id),
        image_url: user.image_url ?? "male.png", // <-- fix here
      });
    } else {
      setForm({
        id: 0,
        name: "",
        role: "VIEWER",
        region: "",
        site: "",
        ad_user_id: "",
        image_url: "male.png",
      });
    }
  }, [user]);

  const handleSubmit = () => {
    const now = new Date().toISOString();

    const baseUser = {
      ...form,
      ad_user_id: Number(form.ad_user_id),
      role: form.role as "REVIEWER" | "VIEWER" | "APPROVER",
    };

    if (form.id) {
      // Edit existing user
      onSave({
        ...baseUser,
        creation_date: user!.creation_date,
        creation_user: user!.creation_user,
        last_modification_date: now,
        last_modification_user: "admin",
      });
    } else {
      // Add new user
      onSave({
        ...baseUser,
        creation_date: now,
        creation_user: "admin",
        last_modification_date: now,
        last_modification_user: "admin",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <MdlModal>
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {["name", "ad_user_id", "role", "region", "site", "image_url"].map(
            (field) => (
              <div key={field} className="grid gap-2">
                <Label>{field.replace("_", " ").toUpperCase()}</Label>
                <Input
                  value={(form as any)[field]}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                />
              </div>
            )
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>{user ? "Update" : "Add"}</Button>
        </DialogFooter>
      </MdlModal>
    </Dialog>
  );
}
