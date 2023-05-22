import { Schema, model, Types, models } from "mongoose";

const imageSchema = new Schema({
	url: {
		type: String,
		required: true,
	},
	prompt_id: {
		type: Types.ObjectId,
		ref: "Prompt",
	},
	liked: {
		type: Boolean,
	},
});

// const ImageModel = model("Image", imageSchema);

export default models.ImageModel || model("ImageModel", imageSchema);
