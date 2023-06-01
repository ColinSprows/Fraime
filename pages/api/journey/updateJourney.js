// Updates with purchased image and order id
import JourneyModel from "../../../models/Journey.js";
import dbConnect from "../../../lib/dbConnect";

export default async function (req, res) {
	await dbConnect();

	if (req.method === "PUT") {
		const { journey_id, order_id, ordered_image_id } = req.body;
		const newJourney = await JourneyModel.findByIdAndUpdate(
			journey_id,
			{
				ordered_image_id,
				order_id,
			},
			{ new: true }
		);

		res.status(200).json({ journey: newJourney });
	} else {
		console.error("WRONG REQ");
	}
}
