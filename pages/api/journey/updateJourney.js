// when fine tuning, tracks image ids and prompt ids for selected images that are being tuned
import JourneyModel from "../../../models/Journey.js";
import dbConnect from "../../../lib/dbConnect";

export default async function (req, res) {
	await dbConnect();

	if (req.method === "PUT") {

		const { journey_id, prompt_id, image_id } = req.body;

    try {

      // dynamically handles for pushing new prompt_id, image_id or both
      // returns updated document

      const updateData = [
        {
          _id: journey_id
        },
        {
          $push: {}
        },
        {
          new: true
        }
      ];

      if (prompt_id) updateData[1].$push.prompt_ids = prompt_id;

      if (image_id) updateData[1].$push.image_ids = image_id;

      const response = await JourneyModel.findOneAndUpdate(...updateData);
      
      res.status(200).json(response);
    } catch(err) {
      console.error(err);
    }

	} else {
		console.error("WRONG REQ");
	}
}
