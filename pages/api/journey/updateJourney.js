// when fine tuning, tracks image ids and prompt ids for selected images that are being tuned
import JourneyModel from "../../../models/Journey.js";
import dbConnect from "../../../lib/dbConnect";

export default async function (req, res) {
	await dbConnect();

	if (req.method === "PUT") {
		const { journey_id, prompt_id } = req.body;

    try {
      const response = await JourneyModel.findOneAndUpdate(
        {
          _id: journey_id
        },
        {
          $push: {
            prompt_ids: prompt_id
          }
        }
      );
      console.log(response);
      res.status(200).json(response);
    } catch(err) {
      console.error(err);
    }
	} else {
		console.error("WRONG REQ");
	}
}
