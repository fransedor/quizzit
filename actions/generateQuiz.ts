"use server";

export async function generateQuiz(formData: FormData) {
  const { file, topic, amount } = {
    file: formData.get("file"),
    topic: formData.get("topic"),
    amount: formData.get("amount"),
  };
  if (!file || !topic || !amount) {
    throw new Error("Missing required fields");
  }
  if (!(file instanceof File)) {
    throw new Error("Expected a file in formData");
  }
  try {
    const arrayBuffer = await file.arrayBuffer();

    const uint8Array = new Uint8Array(arrayBuffer);
		console.log(uint8Array);
    return;
  } catch (error) {
    console.log(error);
  }
}
