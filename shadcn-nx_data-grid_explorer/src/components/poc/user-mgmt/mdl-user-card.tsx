import { MdlUser } from "@/types/mdl-user";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function MdlUserCard({
  user,
  onEdit,
  onDelete,
  onView,
}: {
  user: MdlUser;
  onEdit: () => void;
  onDelete: () => void;
  onView?: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  const imageSrc =
    !user.image_url || imgError ? "/fallback-avatar.png" : `/${user.image_url}`;

  const roleColor = {
    REVIEWER: "bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-200",
    VIEWER: "bg-teal-200 text-teal-900 dark:bg-teal-800 dark:text-teal-200",
    APPROVER:
      "bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-200",
  };

  return (
    <div
      onClick={onView}
      className="flex items-center p-4 bg-white dark:bg-gray-800 hover:bg-cyan-50 text-gray-600 border-1 border-gray-50 rounded-lg shadow-md gap-4 min-w-0"
    >
      <Image
        src={imageSrc}
        alt={user.name}
        width={56}
        height={56}
        className="rounded-full object-cover"
        onError={() => setImgError(true)}
      />
      <div className="flex-1 text-right">
        <div
          className={`text-sm px-4 py-1 m-1 tracking-wider font-semibold rounded-full inline-block ${
            roleColor[user.role]
          }`}
        >
          {user.role}
        </div>
        <div className="text-2xl font-semibold tracking-wide pt-2 truncate">
          {user.name}
        </div>
        <div className="text-sm font-semibold text-gray-500 dark:text-gray-300 truncate">
          {user.site} | {user.region}
        </div>
        {/* <div className="flex justify-end gap-2 mt-2">
          <Button size="sm" variant="outline" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div> */}
      </div>
    </div>
  );
}
