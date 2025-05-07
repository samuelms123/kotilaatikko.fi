import {login} from '../models/authModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 * @api {post} /auth/login User login
 * @apiName Login
 * @apiGroup Users
 *
 * @apiBody {String} email User's email address.
 * @apiBody {String} password User's password.
 *
 * @apiExample {json} Request Body Example:
 * {
 *   "email": "admin@admin.com",
 *   "password": "adminn"
 * }
 *
 * @apiSuccess {Object} user User details.
 * @apiSuccess {Number} user.id User ID.
 * @apiSuccess {String} user.firstName User's first name.
 * @apiSuccess {String} user.lastName User's last name.
 * @apiSuccess {String} user.email User's email address.
 * @apiSuccess {String} user.phone User's phone number.
 * @apiSuccess {String} user.address User's address.
 * @apiSuccess {String} user.city User's city.
 * @apiSuccess {String} user.postalCode User's postal code.
 * @apiSuccess {String} user.type User type (e.g., admin or regular user).
 * @apiSuccess {Boolean} user.subscribed Indicates if the user is subscribed.
 * @apiSuccess {String} token JWT token for authentication.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "user": {
 *     "id": 36,
 *     "firstName": "adminin nimi",
 *     "lastName": "adminin sukunimi",
 *     "email": "admin@admin.com",
 *     "phone": "0405222123",
 *     "address": "adminin katu",
 *     "city": "Helsinki",
 *     "postalCode": "12345",
 *     "type": "admin",
 *     "subscribed": 1
 *   },
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImZpcnN0TmFtZSI6ImFkbWluaW4gbmltaSIsImxhc3ROYW1lIjoiYWRtaW5pbiBzdWt1bmltaSIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGhvbmUiOiIwNDA1MjIyMTIzIiwiYWRkcmVzcyI6ImFkbWluaW4ga2F0dSIsImNpdHkiOiJIZWxzaW5raSIsInBvc3RhbENvZGUiOiIxMjM0NSIsInR5cGUiOiJhZG1pbiIsInN1YnNjcmliZWQiOjEsImlhdCI6MTc0NjU1NTQ0MiwiZXhwIjoxNzQ2NjQxODQyfQ.fEF6LgQcCPpYAgLMCZC-UjYCl5ZHc-edNXUUgXom260"
 * }
 *
 * @apiError {String} message Error message if login fails.
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 *   "message": "Invalid email or password"
 * }
 */

const handleLogin = async (req, res) => {
  const result = await login(req.body.email);
  let passwordValid = false;
  passwordValid = bcrypt.compareSync(req.body.password, result.password);

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
    subscribed: result.is_subscribed,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  res.json({user: userWithNoPassword, token});
};

/**
 * @api {get} /auth/me Get authenticated user's data
 * @apiName GetMe
 * @apiGroup Users
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} user Authenticated user's details.
 * @apiSuccess {Number} user.id User ID.
 * @apiSuccess {String} user.firstName User's first name.
 * @apiSuccess {String} user.lastName User's last name.
 * @apiSuccess {String} user.email User's email address.
 * @apiSuccess {String} user.phone User's phone number.
 * @apiSuccess {String} user.address User's address.
 * @apiSuccess {String} user.city User's city.
 * @apiSuccess {String} user.postalCode User's postal code.
 * @apiSuccess {String} user.type User type (e.g., admin or regular user).
 * @apiSuccess {Boolean} user.subscribed Indicates if the user is subscribed.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "token ok",
 *   "user": {
 *     "id": 1,
 *     "firstName": "John",
 *     "lastName": "Doe",
 *     "email": "john.doe@example.com",
 *     "phone": "123456789",
 *     "address": "123 Main Street",
 *     "city": "Helsinki",
 *     "postalCode": "00100",
 *     "type": "user",
 *     "subscribed": true
 *   }
 * }
 *
 * @apiError {String} message Error message if the user is not authenticated.
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 *   "message": "Unauthorized"
 * }
 */
const getMe = async (req, res) => {
  console.log('getMe: ' + res.locals.user);
  if (res.locals.user) {
    res.json({message: 'token ok', user: res.locals.user});
  } else {
    res.status(401).json({message: 'Unauthorized'});
  }
};

export {handleLogin, getMe};
