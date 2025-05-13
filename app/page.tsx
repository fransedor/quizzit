import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto p-4 h-screen w-full font-inter flex">
      <div className="flex items-center h-full w-1/2">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl">Turn notes into quizzes. Turn quizzes into results.</h1>
          <span className="text-2xl">
            Go from passive reading to active recall in seconds — Quizzit creates quizzes from any
            document or webpage.
          </span>
        </div>
      </div>
      <div className="flex items-center h-full w-1/2">
        <input type="file" />
      </div>
    </div>
  );
}
