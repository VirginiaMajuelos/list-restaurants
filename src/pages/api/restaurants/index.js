import Restaurant from "models/Restaurant";
import { dbConnect } from "utils/mongoose";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const restaurants = await Restaurant.find();
        return res.status(200).json(restaurants);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case "POST":
      try {
        const newRestaurant = new Restaurant(body);
        const savedRestaurant = await newRestaurant.save();
        return res.status(201).json(savedRestaurant);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
