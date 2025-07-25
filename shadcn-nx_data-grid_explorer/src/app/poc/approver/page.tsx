"use client";

import Link from "next/link";
import { Dashboard } from "@/components/application/Dashboard";
import { MdlPageGridWrapper } from "@/components/application/MdlPageGridWrapper";
import { MDL_APPROVER_COLUMNS } from "@/components/application/mdl-columns";
import { APPROVER_GRID_DAFAULT_PAYLOAD } from "@/components/application/model";

export default function Page() {
  return (
    <section className="m-4 mt-6">
      <h1 className="text-sm text-muted-foreground m-4">
        <Link href="/poc" className="hover:underline text-purple-600">
          POC
        </Link>{" "}
        <span className="text-muted-foreground">&gt;</span> Approver
      </h1>

      <Dashboard />

      <MdlPageGridWrapper
        columns={MDL_APPROVER_COLUMNS}
        initialPayload={APPROVER_GRID_DAFAULT_PAYLOAD}
        title={""}
      />
    </section>
  );
}
