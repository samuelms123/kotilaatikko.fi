import {login} from '../models/authModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const handleLogin = async (req, res) => {
  const result = await login(req.body.email);
  let passwordValid = false;
  if (result.type === 'admin') {
    // dangerous, but for now, we allow admin to login without password
    passwordValid = true;
  } else {
    passwordValid = bcrypt.compareSync(req.body.password, result.password);
  }

  console.log('password is valid', passwordValid);

  if (!passwordValid) {
    res.sendStatus(401);
    return;
  }

  const userWithNoPassword = {
    id: result.id,
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

// Get authenticated user's data
const getMe = async (req, res) => {
  console.log('getMe: ' + res.locals.user);
  if (res.locals.user) {
    res.json({message: 'token ok', user: res.locals.user});
  } else {
    res.status(401).json({message: 'Unauthorized'});
  }
};

export {handleLogin, getMe};
