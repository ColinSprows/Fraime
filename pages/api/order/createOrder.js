import Order from "../../../models/Order.js";
import dbConnect from "../../../lib/dbConnect";

export default async function (req, res) {
	await dbConnect();

	if (req.method === "POST") {
		// console.log(req.body);

		const newOrder = await Order.create({
			prompt_id: req.body.prompt_id,
			image_id: req.body.image_id,
			product_type: req.body.product_type,
			product_size: req.body.product_size,
			paper_type: req.body.paper_type,
			framing_options: req.body.framing_options,
			framing_type: req.body.framing_type,
			mat_options: req.body.mat_options,
			status: "pending",
		});

		res.status(200).json({ order: newOrder });
	} else {
		console.error("WRONG REQ");
	}
}
