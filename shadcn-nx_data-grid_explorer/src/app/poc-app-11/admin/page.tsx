"use client";

import Link from "next/link";
import { Dashboard } from "@/components/application/Dashboard";
import { MdlPageGridWrapper } from "@/components/application/MdlPageGridWrapper";
import { MDL_ADMIN_COLUMNS } from "@/components/application/mdl-columns";
import { ADMIN_GRID_DAFAULT_PAYLOAD } from "@/components/application/model";
import { LogTimeline } from "@/components/application/LogTimeline";

export default function Page() {
  return (
    <section className="m-4 mt-6">
      <LogTimeline
        logItems={[
          {
            user_role: "REVIEWER",
            action: "PENDING_APPROVAL",
            comments: "Reviewed and submitted for approval.",
          },
          {
            user_role: "APPROVER",
            action: "APPROVED",
            comments: "Approved after verification.",
          },
        ]}
      />

      {/* <h1 className="text-sm text-muted-foreground m-4">
        <Link href="/poc-app-11" className="hover:underline text-purple-600">
          Model Default List
        </Link>{" "}
        <span className="text-muted-foreground">&gt;</span> Admin
      </h1>

      <Dashboard />

      <MdlPageGridWrapper
        columns={MDL_ADMIN_COLUMNS}
        initialPayload={ADMIN_GRID_DAFAULT_PAYLOAD}
        title={""}
      /> */}
    </section>
  );
}
