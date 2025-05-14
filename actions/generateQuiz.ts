"use server";

export async function generateQuiz(formData: FormData) {
	console.log(formData);
	const rawFormData = {
		file: formData.get("file"),
		topic: formData.get("topic"),
		amount: formData.get("amount"),
	}
	console.log("raw form", rawFormData);
}
