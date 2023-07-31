import { Schema, models, model, Types } from "mongoose";

const orderSchema = new Schema({
	// user_id: {
	// 	type: Types.ObjectId,
	// 	required: true,
	// 	ref: "User",
	// },
	prompt_id: {
		type: Types.ObjectId,
		required: true,
		ref: "Prompt",
	},
	image_id: {
		type: Types.ObjectId,
		required: true,
		ref: "Image",
	},
	status: {
		type: String,
		required: true,
	},
	framing_type: {
		type: String,
		required: true,
	},
	framing_options: {
		type: String,
		required: true,
	},
	mat_options: {
		type: String,
		required: true,
	},
	product_type: {
		type: String,
		required: true,
	},
	product_size: {
		type: String,
		required: true,
	},
	paper_type: {
		type: String,
		required: true,
	},
});

// const OrderModel = model("Order", orderSchema);

export default models.Order || model("Order", orderSchema);
