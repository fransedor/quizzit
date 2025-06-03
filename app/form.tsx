"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateQuiz } from "@/actions/generateQuiz";

export default function Form() {
  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await generateQuiz(formData);
      console.log(result);
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center gap-6 w-full">
        <span className="rounded-full border-2 h-8 w-8 border-black grid place-content-center shrink-0">
          1
        </span>
        <div className="flex flex-col w-full">
          <span>Upload PDF:</span>
          <div className="flex gap-4 items-center w-full">
            <Input required className="w-full" type="file" accept=".pdf" id="file" name="file" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 w-full">
        <span className="rounded-full border-2 h-8 w-8 border-black  grid place-content-center shrink-0">
          2
        </span>
        <div className="flex flex-col w-full">
          <label htmlFor="topic">Quiz Topic:</label>
          <Input required className="w-full" type="text" id="topic" name="topic" />
        </div>
      </div>
      <div className="flex items-center gap-6 w-full">
        <span className="rounded-full border-2 h-8 w-8 border-black  grid place-content-center shrink-0">
          3
        </span>
        <div className="flex flex-col w-full">
          <label htmlFor="amount">How many questions:</label>
          <Input required className="w-full" type="number" id="amount" name="amount" />
        </div>
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
