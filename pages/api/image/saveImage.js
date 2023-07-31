import Image from "../../../models/Image.js";
import dbConnect from "../../../lib/dbConnect";

export default async function (req, res) {
	await dbConnect();

	if (req.method === "POST") {
		const url = req.body.url;
		const prompt_id = req.body.prompt_id;
		const newImage = await Image.create({
			url,
			prompt_id,
			liked: false,
		});

		res.status(200).json({ image: newImage });
	} else {
		console.error("WRONG REQ");
	}
}
