import { Schema, model, Types, models } from "mongoose";

const journeySchema = new Schema({
	image_ids: [
		{
			type: Types.ObjectId,
			ref: "Image",
		},
	],
	prompt_ids: [
		{
			type: Types.ObjectId,
			ref: "Prompt",
		},
	],
	order_id: {
		type: Types.ObjectId,
	},
	ordered_image_id: {
		type: Types.ObjectId,
	},
	accessible_until: {
		type: Date,
		// default accessbile until is set to 1 week from current time
		default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
		required: true,
	},
});

// const JourneyModel = model("Journey", journeySchema);

export default models.Journey || model("Journey", journeySchema);
