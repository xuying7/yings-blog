import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bond">Hello here is Yings blog</h1>
      <p className="text-lg italic mt-2">
        Welcome to my personal space on the internet. Thanks for your visiting!
      </p>
      <Link href="/diary">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition">
          Next.js Notes
        </button>
      </Link>
    </main>
  );
}
