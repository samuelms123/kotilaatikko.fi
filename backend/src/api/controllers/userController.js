import {addUser, deleteUser, getEmail} from '../models/userModel.js';
import bcrypt from 'bcrypt';

/**
 * @api {get} /users/available/:email Check if email is available
 * @apiName CheckEmailAvailability
 * @apiGroup Users
 *
 * @apiParam {String} email Email address to check.
 *
 * @apiSuccess {Boolean} available Indicates whether the email is available.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "available": true
 * }
 *
 * @apiError {String} message Error message if the email availability check fails.
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "Failed to check email availability"
 * }
 */

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

/**
 * @api {post} /users Create a new user
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiBody {String} first_name User's first name.
 * @apiBody {String} last_name User's last name.
 * @apiBody {String} email User's email address.
 * @apiBody {String} password User's password (hashed internally).
 * @apiBody {String} phone User's phone number.
 * @apiBody {String} address User's address.
 * @apiBody {String} city User's city.
 * @apiBody {String} postal_code User's postal code.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Details of the created user.
 * @apiSuccess {Number} result.user_id ID of the created user.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 Created
 * {
 *   "message": "New user added.",
 *   "result": {
 *     "user_id": 123
 *   }
 * }
 *
 * @apiExample {json} Request Body Example:
 * {
 *   "first_name": "John",
 *   "last_name": "Doe",
 *   "email": "john.doe@example.com",
 *   "password": "securepassword123",
 *   "phone": "123456789",
 *   "address": "123 Main Street",
 *   "city": "Helsinki",
 *   "postal_code": "00100"
 * }
 *
 * @apiError {String} message Error message if the user creation fails.
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *   "message": "Failed to create user"
 * }
 */

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

/**
 * @api {delete} /users/:id Delete a user
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiHeader {String} Authorization Bearer token for admin access.
 *
 * @apiParam {Number} id User ID.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "User deleted successfully"
 * }
 *
 * @apiError {String} message Error message if the user could not be deleted.
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "message": "User not found"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "Failed to delete user"
 * }
 */

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
