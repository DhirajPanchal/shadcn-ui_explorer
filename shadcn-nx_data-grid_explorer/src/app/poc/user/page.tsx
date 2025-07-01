import MdlUserMgmt from "@/components/poc/user-mgmt/mdl-user-mgmt";

export default function UserPage() {
  return (
    <div className="ml-32 my-12 mr-12  p-12 space-y-4">
      <div className="text-2xl font-semibold">User Management</div>
      <MdlUserMgmt />
    </div>
  );
}
