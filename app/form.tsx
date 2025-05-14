"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import UploadedFile from "./uploadedFile";

export default function Form() {
  const [file, setFile] = useState<File | null>(null);
  const [topic, setTopic] = useState<string>("");
  const [amount, setAmount] = useState<number>(5);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submittedData = {
      file,
      topic,
      amount,
    };
    console.log(submittedData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center gap-6 w-full">
        <span className="rounded-full border-2 h-8 w-8 border-black grid place-content-center shrink-0">
          1
        </span>
        <div className="flex flex-col w-full">
          <span>Upload PDF:</span>
          <div className="flex gap-4 items-center w-full">
            {file ? (
              <UploadedFile file={file} onDelete={() => setFile(null)} />
            ) : (
              <Input required className="w-full" type="file" id="file" onChange={handleFileChange} />
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 w-full">
        <span className="rounded-full border-2 h-8 w-8 border-black  grid place-content-center shrink-0">
          2
        </span>
        <div className="flex flex-col w-full">
          <label htmlFor="topic">Quiz Topic:</label>
          <Input required className="w-full" type="text" id="topic" onChange={handleTopicChange} />
        </div>
      </div>
      <div className="flex items-center gap-6 w-full">
        <span className="rounded-full border-2 h-8 w-8 border-black  grid place-content-center shrink-0">
          3
        </span>
        <div className="flex flex-col w-full">
          <label htmlFor="questionAmount">How many questions:</label>
          <Input required className="w-full" type="number" id="questionAmount" onChange={handleAmountChange} />
        </div>
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
