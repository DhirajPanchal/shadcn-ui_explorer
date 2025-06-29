"use client";

import Link from "next/link";

export default function Page() {
  return (
    <section className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md rounded-xl border bg-card text-card-foreground shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Proof of Concept
        </h1>

        <div className="space-y-4">
          <Link
            href="/poc/viewer"
            className="block text-center text-lg text-purple-700 hover:underline"
          >
            Viewer
          </Link>
          <Link
            href="/poc/reviewer"
            className="block text-center text-lg text-purple-700 hover:underline"
          >
            Reviewer
          </Link>
          <Link
            href="/poc/approver"
            className="block text-center text-lg text-purple-700 hover:underline"
          >
            Approver
          </Link>
          <Link
            href="/poc/admin"
            className="block text-center text-lg text-purple-700 hover:underline"
          >
            Admin
          </Link>
        </div>
      </div>
    </section>
  );
}
