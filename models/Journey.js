const { Schema, model, Types } = require("mongoose");

const journeySchema = new Schema({
	image_ids: [
		{
			type: Types.ObjectId,
			required: true,
			ref: "Image",
		},
	],
	prompt_ids: [
		{
			type: Types.ObjectId,
			required: true,
			ref: "Prompt",
		},
	],
	accessible_until: {
		type: Date,
		// default accessbile until is set to 1 week from current time
		default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
		required: true,
	},
});

const Journey = model("Journey", journeySchema);

module.exports = Journey;