"use client";

import { useState } from "react";
import { MdlUser } from "@/types/mdl-user";
import MdlUserCardGrid from "./mdl-user-card-grid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import MdlUserForm from "./mdl-user-form";
import ConfirmDeleteModal from "./confirm-delete-modal";
import { DEFAULT_MDL_USER } from "./dummy";
import RoleToggleButton from "./RoleToggleButton";
import MdlUserView from "./mdl-user-view";

export default function MdlUserMgmt() {
  const [users, setUsers] = useState<MdlUser[]>(DEFAULT_MDL_USER);
  const [formUser, setFormUser] = useState<MdlUser | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<MdlUser | null>(null);
  const [viewUser, setViewUser] = useState<MdlUser | null>(null);
  const handleAdd = () => {
    setFormUser(null);
    setShowForm(true);
  };

  const handleEdit = (user: MdlUser) => {
    setFormUser(user);
    setShowForm(true);
  };

  const handleSave = (user: MdlUser) => {
    if (user.id) {
      // update
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, ...user } : u))
      );
      toast.success("User updated");
    } else {
      // add
      const now = new Date().toISOString();
      const newUser = {
        ...user,
        id: users.length + 1,
        creation_date: now,
        creation_user: "admin",
        last_modification_date: now,
        last_modification_user: "admin",
      };
      setUsers((prev) => [...prev, newUser]);
      toast.success("User added");
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setUserToDelete(null);
    toast.success("User deleted");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-4 px-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search users..."
          className="flex-1 min-w-[200px] max-w-sm border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-900 text-sm"
          onChange={(e) => {
            const query = e.target.value;
            // call API with query
            console.log("Search:", query);
          }}
        />

        {/* Filters + Add Button */}
        <div className="flex items-center gap-4">
          <RoleToggleButton
            role="REVIEWER"
            onToggle={(active: boolean) => console.log("REVIEWER:", active)}
          />
          <RoleToggleButton
            role="APPROVER"
            onToggle={(active: boolean) => console.log("APPROVER:", active)}
          />
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" /> Add User
          </Button>
        </div>
      </div>

      <MdlUserCardGrid
        users={users}
        onEdit={handleEdit}
        onDelete={(u) => setUserToDelete(u)}
        onView={(u) => setViewUser(u)}
      />

      <MdlUserView
        user={viewUser}
        open={!!viewUser}
        onClose={() => setViewUser(null)}
        onEdit={() => {
          setFormUser(viewUser);
          setShowForm(true);
          setTimeout(() => setViewUser(null), 100);
        }}
        onDelete={() => {
          setUserToDelete(viewUser);
          setTimeout(() => setViewUser(null), 100);
        }}
      />

      <MdlUserForm
        open={showForm}
        user={formUser}
        onClose={() => setShowForm(false)}
        onSave={handleSave}
      />

      <ConfirmDeleteModal
        user={userToDelete}
        onCancel={() => setUserToDelete(null)}
        onConfirm={() => userToDelete && handleDelete(userToDelete.id)}
      />
    </div>
  );
}
