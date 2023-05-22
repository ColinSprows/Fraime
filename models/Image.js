const { Schema, model, Types } = require("mongoose");

const imageSchema = new Schema({
	url: {
		type: String,
		required: true,
	},
	prompt_id: {
		type: Types.ObjectId,
		required: true,
		ref: "Prompt",
	},
	liked: {
		type: Boolean,
	},
});

const ImageModel = model("Image", imageSchema);

module.exports = ImageModel;
