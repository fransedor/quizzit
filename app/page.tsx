import Image from "next/image";
import Form from "./form";

export default function Home() {
  return (
    <div className="container mx-auto p-4 h-screen w-full font-inter flex gap-8">
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
        <div className="rounded-3xl border-4 border-black p-8 ml-auto h-4/5 w-3/4">
          <Form></Form>
        </div>
      </div>
    </div>
  );
}
