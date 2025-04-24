import {addUser} from '../models/userModel.js';
import bcrypt from 'bcrypt';

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

export {handlePostUser};
