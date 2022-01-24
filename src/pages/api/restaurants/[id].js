import { dbConnect } from "utils/mongoose";
import Restaurant from "models/Restaurant";

dbConnect();

export default async (req, res) => {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        const restaurant = await Restaurant.findById(id);
        if (!restaurant)
          return res.status(400).json({ msg: "Restaurant not found" });
        return res.status(200).json(restaurant);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case "PUT":
      try {
        const restaurant = await Restaurant.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });
        if (!restaurant)
          return res.status(404).json({ msg: "Restaurant does not exists" });
        return res.status(200).json(restaurant);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case "DELETE":
      try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
        if (!deletedRestaurant)
          return res.status(404).json({ msg: "Restaurant not found" });
        return res.status(204).json();
      } catch (error) {
        return res.status(400).json({ msg: "this method is not supported" });
      }
    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
};
