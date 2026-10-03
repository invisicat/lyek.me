import Image from "next/image";
import Link from "next/link";
import BaseNav from "@/components/base/BaseNav";

export default function BaseHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-7 sm:py-9">
      <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 font-medium">
        <Image src="/favicon.svg" alt="" width={32} height={32} className="h-8 w-8" />
        <span>Andy Lyek</span>
      </Link>
      <BaseNav />
    </header>
  );
}
