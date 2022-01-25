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

    // imageUser: {
    //   type: String,
    //   default:
    //     "https://res.cloudinary.com/dhn7lkwbd/image/upload/v1639589185/legooo_xtsb5y.jpg",
    // },

    productLike: [
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
