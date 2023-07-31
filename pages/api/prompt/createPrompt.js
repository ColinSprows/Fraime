import Prompt from "../../../models/Prompt.js";
import dbConnect from "../../../lib/dbConnect";

export default async function (req, res) {
	await dbConnect();

	if (req.method === "POST") {
		const prompt = req.body;
		console.log(`prompt: ${prompt}`);
		const newPrompt = await Prompt.create({
			user_text_inputs: prompt,
			// until we have full_prompt, we can just use user_text_inputs
			full_prompt: prompt,
		});

		res.status(200).json({ prompt: newPrompt });
	} else {
		console.error("WRONG REQ");
	}
}
