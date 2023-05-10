const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/.+@.+\..+/, "Must match an email address!"],
	},
	password: {
		type: String,
		required: true,
		validate: {
			validator: function (value) {
				// tests password for having one digit, one lowercase, one uppercase, one special character, and to be at least 8 characters long
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
					value
				);
			},
			message: (props) => "Not a valid password!",
		},
	},
	prompt_ids: [
		{
			type: Types.ObjectId,
			ref: "Prompt",
		},
	],
	liked_image_ids: [
		{
			type: Types.ObjectId,
			ref: "Image",
		},
	],
	order_ids: [
		{
			type: Types.ObjectId,
			ref: "Order",
		},
	],
	journey_ids: [
		{
			type: Types.ObjectId,
			ref: "Journey",
		},
	],
});

userSchema.pre("save", async function (next) {
	// this will run before saving a new user or modifying a password
	if (this.isNew || this.isModified("password")) {
		// if the user is new, hash the password
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});

userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
