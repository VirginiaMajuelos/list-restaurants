import { Schema, model, models } from "mongoose";

const restaurantSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The restaurant title is required "],
      trim: true,
      maxlength: [40, "title cannot be grater than 40 characters"],
    },
    cuisine: {
      type: String,
      required: [true, "The cuisine is required "],
      trim: true,
      maxlength: [30, "title cannot be grater than 40 characters"],
    },
    description: {
      type: String,
      required: [true, "The description is required "],
      trim: true,
      maxlength: [500, "title cannot be grater than 200 characters"],
    },
    location: {
      type: String,
      requiered: [true, "The location is required "],
      trim: true,
      maxlength: [30, "title cannot be grater than 40 characters"],
    },
    imageUser: {
      type: String,
      default: "../styles/assets/restaurant-default.jpg",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Restaurant || model("Restaurant", restaurantSchema);
