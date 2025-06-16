"use client";

import Link from "next/link";
import { Dashboard } from "@/components/application/Dashboard";
import { MdlPageGridWrapper } from "@/components/application/MdlPageGridWrapper";
import { MDL_VIEWER_COLUMNS } from "@/components/application/mdl-columns";
import { VIEWER_GRID_DAFAULT_PAYLOAD } from "@/components/application/model";

export default function Page() {
  return (
    <section className="m-4 mt-6">
      <h1 className="text-sm text-muted-foreground m-4">
        <Link href="/poc-app-11" className="hover:underline text-purple-600">
          Model Default List
        </Link>{" "}
        <span className="text-muted-foreground">&gt;</span> Viewer
      </h1>

      {/* <Dashboard /> */}

      <MdlPageGridWrapper
        columns={MDL_VIEWER_COLUMNS}
        initialPayload={VIEWER_GRID_DAFAULT_PAYLOAD}
        title={""}
      />
    </section>
  );
}
