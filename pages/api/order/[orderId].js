import OrderModel from "../../../models/Order.js";
import dbConnect from "../../../lib/dbConnect.js";

export default async function (req, res) {
	await dbConnect();

	if (req.method === "GET") {
		const order = await OrderModel.findById(req.query.orderId);

		res.status(200).json(order);
	} else {
		console.error("WRONG REQ");
	}
}
