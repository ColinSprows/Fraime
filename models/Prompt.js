import { Schema, models, model, Types } from "mongoose";

const promptSchema = new Schema({
	// user_id: {
	// 	type: Types.ObjectId,
	// 	ref: "User",
	// },
	user_selections: [
		{
			type: String,
		},
	],
	user_text_inputs: {
		type: String,
	},
	pre_prompt: {
		type: String,
	},
	full_prompt: {
		type: String,
	},
	fine_tuning_options: [
		{
			type: String,
		},
	],
});

promptSchema.pre("validate", function (next) {
	if (!this.user_text_inputs && !this.user_selections)
		return next(new Error("Must select some options or enter some text"));
	next();
});

// const PromptModel = model("Prompt", promptSchema);

export default models.Prompt || model("Prompt", promptSchema);
