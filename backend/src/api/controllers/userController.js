import { addUser } from "../models/userModel.js";

const handlePostUser = async (req, res) => {
  // add password crypt
  const result = await addUser(req.body);
  if (result) {
    res.status(201);
    res.json({ message: "New user added.", result });
  } else {
    res.sendStatus(400);
  }
};

export { handlePostUser };
