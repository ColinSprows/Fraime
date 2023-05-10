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

const Image = model("Image", imageSchema);

module.exports = Image;
