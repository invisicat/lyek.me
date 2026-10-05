import Image from "next/image";
import Link from "next/link";

export default function BaseHeader() {
  return (
    <header className="mb-6">
      <Link href="/" aria-label="Andy Lyek home" className="block w-fit">
        <Image src="/favicon.svg" alt="" width={56} height={56} className="h-14 w-14" />
      </Link>
    </header>
  );
}
