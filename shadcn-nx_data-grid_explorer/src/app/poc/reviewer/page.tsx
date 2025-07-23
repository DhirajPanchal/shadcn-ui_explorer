"use client";

import { LogTimeline } from "@/components/application/LogTimeline";
import { LogTimeline5 } from "@/components/application/LogTimeline_animated_scrollable";
import { LogTimeline4 } from "@/components/application/LogTimeline_Final";
import { LogTimeline3 } from "@/components/application/LogTimeline_Fixed";
import { LogTimeline2 } from "@/components/application/LogTimeline_Updated";
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

      <LogTimeline5 />
    </section>
  );
}
