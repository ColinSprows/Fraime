const { Schema, model, Types } = require("mongoose");

const promptSchema = new Schema({
	user_id: {
		type: Types.ObjectId,
		required: true,
		ref: "User",
	},
	user_selections: [
		{
			type: String,
		},
	],
	user_text_inputs: [
		{
			type: String,
		},
	],
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

const Prompt = model("Prompt", promptSchema);

module.exports = Prompt;
