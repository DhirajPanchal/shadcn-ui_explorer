"use client";

import { LogTimeline } from "@/components/application/LogTimeline";
import Link from "next/link";

export default function Page() {
  return (
    <section className="m-4 mt-6">
      <h1 className="text-sm text-muted-foreground m-4">
        <Link href="/poc" className="hover:underline text-purple-600">
          POC
        </Link>{" "}
        <span className="text-muted-foreground">&gt;</span> Reviewer
      </h1>

      <LogTimeline />
    </section>
  );
}
