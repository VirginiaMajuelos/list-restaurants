import { dbConnect } from "utils/mongoose";
import User from "models/User";
import { hash } from "bcryptjs";

dbConnect();

export default async function handlerUser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.find();
        return res.status(200).json(users);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case "POST":
      try {
        const newUser = new User(body);
        const savedUSer = await newUser.save();
        return res.status(201).json(savedUSer);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}

// To do:
// -validate
// if (!email || !email.includes("@") || !password) {
//       res.status(422).json({ message: "Invalid Data" });
//       return;
//     }

// -check if existing:
//
// -Hash password:
// const status = await db.collection("users").insertOne({
//       email,
//       password: await hash(password, 12),
//     });
