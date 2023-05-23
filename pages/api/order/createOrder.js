import OrderModel from "../../../models/Order.js";
import dbConnect from "../../../lib/dbConnect";

export default async function (req, res) {
	await dbConnect();

	if (req.method === "POST") {
		console.log(req.body);

		const newOrder = await OrderModel.create({
			promt_id: req.body.promt_id,
			image_id: req.body.image_id,
			print_type: req.body.print_type,
			print_size: req.body.print_size,
			paper_type: req.body.paper_type,
			framing_options: req.body.framing_options,
			status: "pending",
		});

		res.status(200).json({ order: newOrder });
	} else {
		console.error("WRONG REQ");
	}
}
