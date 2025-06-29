"use client";

import { useState } from "react";
import { MdlUser } from "@/types/mdl-user";
import { mdlUserColumns } from "./user-columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const initialUsers: MdlUser[] = [
  {
    id: 1,
    name: "User 1",
    role: "VIEWER",
    creation_date: new Date().toISOString(),
    creation_user: "admin",
    last_modification_date: new Date().toISOString(),
    last_modification_user: "admin",
    region: "US-East",
    site: "SiteA",
    ad_id: 10001,
  },
];

export default function MdlUserGrid() {
  const [users, setUsers] = useState<MdlUser[]>(initialUsers);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<MdlUser | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    role: "VIEWER",
    region: "",
    site: "",
    ad_id: "",
  });

  function openAddDialog() {
    setEditingUser(null);
    setFormState({ name: "", role: "VIEWER", region: "", site: "", ad_id: "" });
    setOpen(true);
  }

  function openEditDialog(user: MdlUser) {
    setEditingUser(user);
    setFormState({
      name: user.name,
      role: user.role,
      region: user.region,
      site: user.site,
      ad_id: String(user.ad_id),
    });
    setOpen(true);
  }

  function handleSave() {
    const now = new Date().toISOString();
    if (editingUser) {
      // Edit

      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                name: formState.name,
                role: formState.role as "VIEWER" | "REVIEWER" | "APPROVER",
                region: formState.region,
                site: formState.site,
                ad_id: Number(formState.ad_id),
                last_modification_date: now,
                last_modification_user: "admin",
              }
            : u
        )
      );

      toast.success("User updated");
    } else {
      // Add
      const newUser: MdlUser = {
        id: users.length + 1,
        name: formState.name,
        role: formState.role as any,
        region: formState.region,
        site: formState.site,
        ad_id: Number(formState.ad_id),
        creation_date: now,
        creation_user: "admin",
        last_modification_date: now,
        last_modification_user: "admin",
      };
      setUsers((prev) => [...prev, newUser]);
      toast.success("User added");
    }
    setOpen(false);
  }

  function handleDelete(id: number) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success("User deleted");
  }

  const columns = [
    ...mdlUserColumns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => {
        const user: MdlUser = row.original;
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => openEditDialog(user)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(user.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">All Users</h2>
        <Button onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-2" /> Add User
        </Button>
      </div>

      <DataTable columns={columns} data={users} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>AD User ID</Label>
              <Input
                value={formState.ad_id}
                onChange={(e) =>
                  setFormState({ ...formState, ad_id: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>Role</Label>
              <Input
                value={formState.role}
                onChange={(e) =>
                  setFormState({ ...formState, role: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>Region</Label>
              <Input
                value={formState.region}
                onChange={(e) =>
                  setFormState({ ...formState, region: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>Site</Label>
              <Input
                value={formState.site}
                onChange={(e) =>
                  setFormState({ ...formState, site: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>
              {editingUser ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
