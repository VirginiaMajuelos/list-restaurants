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

// async function handlerSign(req, res) {
//   //Only POST mothod is accepted
//   if (req.method === "POST") {
//     //Getting email and password from body
//     const { email, password } = req.body;
//     //Validate
//     if (!email || !email.includes("@") || !password) {
//       res.status(422).json({ message: "Invalid Data" });
//       return;
//     }
//     //Check existing
//     const checkExisting = await db
//       .collection("users")
//       .findOne({ email: email });
//     //Send error response if duplicate user is found
//     if (checkExisting) {
//       res.status(422).json({ message: "User already exists" });
//       client.close();
//       return;
//     }
//     //Hash password
//     const status = await db.collection("users").insertOne({
//       email,
//       password: await hash(password, 12),
//     });
//     //Send success response
//     res.status(201).json({ message: "User created", ...status });
//     //Close DB connection
//     client.close();
//   } else {
//     //Response for other than POST method
//     res.status(500).json({ message: "Route not valid" });
//   }
// }

// export default handlerSign;
