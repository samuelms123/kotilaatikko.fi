import {addUser, deleteUser, getEmail} from '../models/userModel.js';
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
    res.status(201).json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const handleDeleteUser = async (req, res) => {
  const {id} = req.params;
  try {
    const result = await deleteUser(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({message: 'User not found'});
    }
    res.status(200).json({message: 'User deleted successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to delete user'});
  }
};

export {handlePostUser, handleEmailAvailable, handleDeleteUser};
