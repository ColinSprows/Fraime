// when fine tuning, tracks image ids and prompt ids for selected images that are being tuned
import JourneyModel from "../../../models/Journey.js";
import dbConnect from "../../../lib/dbConnect";

export default async function (req, res) {
	await dbConnect();

	if (req.method === "POST") {
		const { prompt_id, image_id } = req.body;

    try {
      const newJourney = await JourneyModel.create({
        image_ids: image_id,
        prompt_ids: prompt_id
      });

      res.status(200).json({ journey: newJourney });
    } catch(err) {
      console.error(err);
    }
	} else {
		console.error("WRONG REQ");
	}
}
