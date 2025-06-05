import { MdlDataGrid } from "@/components/frame-datagrid/FrameDataGrid";
import { v2Columns } from "./columns";
import { v2Data } from "./data";

export default function Page() {
  //const data = await getUsers();

  return (
    <section className="m-4">
      <div className="p-4">
        <h1 className="text-3xl font-bold">Master Default List</h1>
        <MdlDataGrid columns={v2Columns} data={v2Data} />
      </div>
    </section>
  );
}
