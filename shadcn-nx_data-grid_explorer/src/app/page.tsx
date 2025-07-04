import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1>WelcomeCard</h1>
        <Link href="/poc">
          <h1 className="text-4xl text-purple-800">POC</h1>
        </Link>
      </div>
    </div>
  );
}
