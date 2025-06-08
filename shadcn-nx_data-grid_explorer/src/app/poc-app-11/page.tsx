"use client";

import Link from "next/link";

export default function Page() {
  return (
    <section className="m-4">
      <h1>Model Default List</h1>

      <Link href="/poc-app-11/viewer">
        <h1 className="text-2xl text-purple-800">Viewer</h1>
      </Link>

      <Link href="/poc-app-11/reviewer">
        <h1 className="text-2xl text-purple-800">Reviewer</h1>
      </Link>
      <Link href="/poc-app-11/approver">
        <h1 className="text-2xl text-purple-800">Approver</h1>
      </Link>
      <Link href="/poc-app-11/admin">
        <h1 className="text-2xl text-purple-800">Admin</h1>
      </Link>
    </section>
  );
}
