"use client";

import Link from "next/link";
import { Dashboard } from "@/components/application/Dashboard";
import { MdlPageGridWrapper } from "@/components/application/MdlPageGridWrapper";
import { MDL_REVIEWER_COLUMNS } from "@/components/application/mdl-columns";
import { REVIEWER_GRID_DAFAULT_PAYLOAD } from "@/components/application/model";

export default function Page() {
  return (
    <section className="m-4 mt-6">
      <h1 className="text-sm text-muted-foreground m-4">
        <Link href="/poc-app-11" className="hover:underline text-purple-600">
          Model Default List
        </Link>{" "}
        <span className="text-muted-foreground">&gt;</span> Reviewer
      </h1>

      <Dashboard />

      <MdlPageGridWrapper
        columns={MDL_REVIEWER_COLUMNS}
        initialPayload={REVIEWER_GRID_DAFAULT_PAYLOAD}
        title={""}
      />
    </section>
  );
}
