import Image from "next/image";
import Link from "next/link";
import Chat from "./components/Chat";

export default function Home() {
  return (
    <main className="p-10">
      {/* Header Section */}
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Hello here is Ying&apos;s blog
          </h1>
          <p className="text-lg italic text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Welcome to my personal space on the internet. Thanks for your
            visiting!
          </p>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-8 mb-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-sm">
          <div className="shrink-0 sm:w-[150px]">
            <Image
              src="/virtualme.ico"
              alt="Virtual Ying"
              width={150}
              height={150}
              className="rounded-full shadow-lg"
              priority
            />
          </div>
          <div className="flex-1 flex flex-col gap-4 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
              About Me
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>🎓 UofT 2nd Year CS Student</li>
              <li>💼 Open to Work</li>
              <li className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:items-start">
                <span className="flex items-center gap-2">
                  💻
                  <a
                    href="https://github.com/xuying7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    GitHub
                  </a>
                </span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                ✉️
                <a
                  href="mailto:xuying4771@outlook.com"
                  className="text-blue-500 hover:underline"
                >
                  xuying4771@outlook.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 mb-6 w-full">
          <Link
            href="/diary"
            className="w-full sm:w-auto px-8 py-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200 shadow-sm text-center"
          >
            📝 My Diary
          </Link>
          <Link
            href="/sql"
            className="w-full sm:w-auto px-8 py-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200 shadow-sm text-center"
          >
            📚 SQL Notes
          </Link>
          <Link
            href="/uoft"
            className="w-full sm:w-auto px-8 py-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200 shadow-sm text-center"
          >
            Systems Programming Notes
          </Link>
        </div>
      </div>

      {/* Chat Component */}
      <div className="mt-8">
        <Chat />
      </div>
    </main>
  );
}
