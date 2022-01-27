const { Schema, model, models } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "The email is required"],
    },

    password: {
      type: String,
      required: [true, "The password is required"],
    },

    productFavourite: [
      {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.User || model("User", userSchema);
