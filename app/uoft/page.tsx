import W3 from "@/markdown/csc209/w3.mdx";
import W4 from "@/markdown/csc209/w4.mdx";
import W5 from "@/markdown/csc209/w5.mdx";
import W6 from "@/markdown/csc209/w6.mdx";

export default function Page() {
  return (
    <main className="p-10">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            CSC209 - Systems Programming
          </h1>
          <p className="text-lg italic text-gray-600 dark:text-gray-400">
            Course notes and learning materials
          </p>
        </div>

        {/* Weekly Notes */}
        <div className="space-y-12">
          <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6"></h2>
            <W3 />
          </div>

          <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6"></h2>
            <W4 />
          </div>

          <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6"></h2>
            <W5 />
          </div>

          <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Week 6</h2>
            <W6 />
          </div>
        </div>
      </div>
    </main>
  );
}
