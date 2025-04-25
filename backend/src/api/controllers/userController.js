import {addUser, getEmail} from '../models/userModel.js';
import bcrypt from 'bcrypt';

const handleEmailAvailable = async (req, res) => {
  const {email} = req.params;

  try {
    const isAvailable = await getEmail(email);
    res.status(200).json({available: isAvailable});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const handlePostUser = async (req, res) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
  const result = await addUser(req.body);
  if (result) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

export {handlePostUser, handleEmailAvailable};
