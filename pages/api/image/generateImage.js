import { Configuration, OpenAIApi } from "openai";

export default async function (req, res) {
	if (req.method === "POST") {
		const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
		const configuration = new Configuration({ apiKey: apiKey });
		const openai = new OpenAIApi(configuration);

		const prompt = req.body.prompt;
		console.log(req.body);
		console.log("prompt: " + prompt);

		const response = await openai.createImage({
			prompt: prompt,
			n: 2,
			size: "256x256",
			// max_tokens: 2200,
		});

		const urls = response.data.data.map((item) => item.url);

		res.status(200).json({ urls: urls });
	} else {
		console.error("WRONG REQ");
	}
}
