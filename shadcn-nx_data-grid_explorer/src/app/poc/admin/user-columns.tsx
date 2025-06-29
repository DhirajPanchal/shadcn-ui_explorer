import { ColumnDef } from "@tanstack/react-table";
import { MdlUser } from "@/types/mdl-user";

export const mdlUserColumns: ColumnDef<MdlUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "ad_id",
    header: "AD User ID",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ getValue }) => (
      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "region",
    header: "Region",
  },
  {
    accessorKey: "site",
    header: "Site",
  },
];
