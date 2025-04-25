import {login} from '../models/authModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const handleLogin = async (req, res) => {
  const result = await login(req.body.email);

  const passwordValid = bcrypt.compareSync(req.body.password, result.password);

  console.log('password is valid', passwordValid);

  if (!passwordValid) {
    res.sendStatus(401);
    return;
  }

  const userWithNoPassword = {
    firstName: result.first_name,
    lastName: result.last_name,
    email: result.email,
    phone: result.phone,
    address: result.address,
    city: result.city,
    postalCode: result.postal_code,
    type: result.type,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  res.json({user: userWithNoPassword, token});
};

export {handleLogin};
