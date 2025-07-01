import { MdlUser } from "@/types/mdl-user";
import MdlUserCard from "./mdl-user-card";

interface Props {
  users: MdlUser[];
  onEdit: (user: MdlUser) => void;
  onDelete: (user: MdlUser) => void;
  onView: (user: MdlUser) => void;
}

export default function MdlUserCardGrid({
  users,
  onEdit,
  onDelete,
  onView,
}: Props) {
  return (
    <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {users.map((user) => (
          <MdlUserCard
            key={user.id}
            user={user}
            onEdit={() => onEdit(user)}
            onDelete={() => onDelete(user)}
            onView={() => onView(user)}
          />
        ))}
      </div>
    </div>
  );
}
