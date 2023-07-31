import Order from "../../../models/Order.js";
import dbConnect from "../../../lib/dbConnect.js";

const calculateOrderAmount = ({
	product_type,
	product_size,
	framing_type,
	framing_options,
	mat_options,
}) => {
	const framing_size =
		framing_options === "No Frame" ? "" : framing_options.split(",")[0];
	const mat_size = mat_options === "No Mat" ? "" : mat_options.split(",")[0];

	const framePrices = {
		'1"': 1000,
		'2"': 2000,
		'3"': 3000,
		'4"': 4000,
	};
	const matPrices = {
		'.5"': 250,
		'1"': 500,
		'1.5"': 750,
		'2"': 1000,
	};
	const sizePrices = {
		Print: {
			'12"x12"': 2000,
			'14"x14"': 3000,
			'16"x16"': 4500,
			'18"x18"': 5500,
		},
		Poster: {
			'10"x10"': 2500,
			'12"x12"': 3000,
			'14"x14"': 3500,
			'16"x16"': 4000,
		},
		Postcard: {
			'4"x4"': 500,
			'5"x5"': 800,
			'6"x6"': 1200,
			'8"x8"': 1500,
		},
	};
	const framePrice = framing_type === "No Frame" ? 0 : framePrices[framing_size];
	const matPrice = mat_options === "No Mat" ? 0 : matPrices[mat_size];
	const sizePrice = sizePrices[product_type][product_size];
	const totalPrice = framePrice + matPrice + sizePrice;
	return totalPrice;
};

export default async function (req, res) {
	await dbConnect();

	if (req.method === "GET") {
		const order = await Order.findById(req.query.orderId).populate('image_id');

		const orderTotal = calculateOrderAmount(order) / 100;

		res.status(200).json({ order, orderTotal });
	} else {
		console.error("WRONG REQ");
	}
}
