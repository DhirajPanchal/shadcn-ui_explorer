"use client";

import { useState } from "react";
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
import MdlUserCard from "./mdl-user-card";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (user: MdlUser) => void;
}

export default function MdlAddUserForm({ open, onClose, onSave }: Props) {
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<MdlUser | null>(null);
  const [selectedUser, setSelectedUser] = useState<MdlUser | null>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/corp-profile/${searchId}`);
      if (response.ok) {
        const user = await response.json();
        setSearchResult(user);
      } else {
        setSearchResult(null);
        toast.error("User not found");
      }
    } catch (err) {
      toast.error("Error fetching user");
    }
  };

  const handleSelectUser = () => {
    setSelectedUser(searchResult);
  };

  const handleAddUser = () => {
    if (!selectedUser) return;
    const now = new Date().toISOString();
    onSave({
      ...selectedUser,
      id: 0,
      ad_user_id: Number(selectedUser.ad_user_id),
      creation_date: now,
      creation_user: "admin",
      last_modification_date: now,
      last_modification_user: "admin",
    });
  };

  const handleReset = () => {
    setSearchId("");
    setSearchResult(null);
    setSelectedUser(null);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <MdlModal>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Label>AD User ID</Label>
              <Input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                disabled={!!selectedUser}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={!searchId || !!selectedUser}
            >
              Search
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>

          {/* Search Result */}
          {searchResult && !selectedUser && (
            <div>
              <div className="text-sm mb-2">Click to select this user:</div>
              <MdlUserCard
                user={searchResult}
                onEdit={() => {}}
                onDelete={() => {}}
                onView={handleSelectUser}
              />
            </div>
          )}

          {/* Readonly Fields */}
          {selectedUser && (
            <div className="space-y-2 text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded border">
              {[
                "name",
                "ad_user_id",
                "role",
                "region",
                "site",
                "image_url",
              ].map((field) => (
                <div key={field}>
                  <strong>{field.replace("_", " ").toUpperCase()}:</strong>{" "}
                  {(selectedUser as any)[field]}
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="pt-4">
          <Button onClick={handleAddUser} disabled={!selectedUser}>
            Add
          </Button>
        </DialogFooter>
      </MdlModal>
    </Dialog>
  );
}
