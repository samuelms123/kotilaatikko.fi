import {
  addGuestSubscriber,
  addNewsletter,
  deleteNewsletter,
  getGuestSubscriber,
  getNewsletters,
  getSubscribers,
} from '../models/newsletterModel.js';
import {updateUserSubscription} from '../models/userModel.js';

/**
 * @api {put} /newsletter Toggle User Subscription
 * @apiName UserSubscription
 * @apiGroup Newsletter
 * @apiHeader {String} Authorization User's access token (Bearer Token).
 *
 * @apiSuccess {String} message Confirmation message.
 * @apiSuccess {Object} updatedUser Updated user object.
 *
 * @apiSuccessExample {message: 'update ok',
 *                    updatedUser: {id: 1,
                      firstName: ukko,
                      lastName: pekka,
                      email: ukko.pekka@gmail.com,
                      phone: 12345677,
                      address: ukkotie,
                      city: Tampere,
                      postalCode: 1234,
                      type: user,
                      subscribed: 1}}
 */
const handleUserSubscription = async (req, res) => {
  const user = res.locals.user;
  try {
    const result = await updateUserSubscription(user.id);
    const updatedUser = {
      id: result.user.id,
      firstName: result.user.first_name,
      lastName: result.user.last_name,
      email: result.user.email,
      phone: result.user.phone,
      address: result.user.address,
      city: result.user.city,
      postalCode: result.user.postal_code,
      type: result.user.type,
      subscribed: result.user.is_subscribed,
    };
    res.json({message: 'update ok', updatedUser});
  } catch (error) {
    console.error('Subscription update failed:', error);
    res.status(500).json({error: 'Failed to update subscription'});
  }
};

/**
 * @api {post} /newsletter Add Guest Subscriber
 * @apiName AddGuestSubscription
 * @apiGroup Newsletter
 *
 * @apiBody {String} email Guest's email address.
 *
 * @apiSuccess {String} message Confirmation message.
 * @apiSuccess {Object} result Result of the operation.
 *
 * @apiSuccessExample Success-Response:
 * {
 *   "message": "Guest subscriber added",
 *   "result": {
 *     "insertId": 5,
 *     "affectedRows": 1
 *   }
 * }
 */
const handleAddGuestSubscription = async (req, res) => {
  const email = req.body.email;
  console.log('email', email);
  try {
    const result = await addGuestSubscriber(email);
    res.json({message: 'Guest susbcriber added', result});
  } catch (error) {
    console.error('Adding guest subscriber failed:', error);
    res.status(500).json({error: 'Failed to add guest subscriber'});
  }
};

/**
 * @api {post} /newsletter/modify Add Newsletter
 * @apiName AddNewsletter
 * @apiGroup Newsletter
 * @apiHeader {String} Authorization Admin access token (Bearer Token).
 * @apiParam {String} subject Subject of the newsletter.
 * @apiParam {String} content Content of the newsletter.
 * @apiParam {File} [image] Optional image file for the newsletter.
 *
 * @apiSuccess {String} message Confirmation message.
 * @apiSuccess {Object} result Created newsletter data.
 *
 * @apiSuccessExample Success-Response:
 * {
 *   "message": "Newsletter created",
 *   "result": {
 *     "insertId": 12,
 *     "affectedRows": 1
 *   }
 * }
 */
const handleAddNewsletter = async (req, res) => {
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  const newsLetter = {
    subject: req.body.subject,
    content: req.body.content,
    image: imagePath,
  };
  console.log(newsLetter);
  try {
    const result = await addNewsletter(newsLetter);
    res.status(201).json({message: 'Newsletter created', result});
  } catch (error) {
    console.error('Error adding newsletter:', error);
    res.status(500).json({error: 'Failed to create newsletter'});
  }
};

/**
 * @api {get} /newsletter Get All Newsletters
 * @apiName GetNewsletters
 * @apiGroup Newsletter
 * @apiHeader {String} Authorization Admin access token (Bearer Token).
 *
 * @apiSuccess {Object[]} newsletters List of newsletters.
 *
 * @apiSuccessExample Success-Response:
 * [
 *   {
 *     "id": 1,
 *     "subject": "Monthly Update",
 *     "content": "This month’s update includes...",
 *     "image": "/uploads/news1.png",
 *     "created_at": "2024-11-05T12:34:56.000Z"
 *   },
 *   ...
 * ]
 */
const handleGetNewsletters = async (req, res) => {
  try {
    const result = await getNewsletters();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

/**
 * @api {delete} /newsletter/modify/:id Delete Newsletter
 * @apiName DeleteNewsletter
 * @apiGroup Newsletter
 * @apiHeader {String} Authorization Admin access token (Bearer Token).
 * @apiParam {Number} id ID of the newsletter to delete.
 *
 * @apiSuccess {String} message Confirmation message.
 * @apiSuccess {Object} deleted Result of the delete operation.
 *
 * @apiSuccessExample Success-Response:
 * {
 *   "message": "Newsletter deleted",
 *   "deleted": {
 *     "affectedRows": 1
 *   }
 * }
 */
const handleDeleteNewsletter = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await deleteNewsletter(id);
    res.status(200).json({message: 'Newsletter deleted', deleted: result});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

/**
 * @api {get} /newsletter/subscribers Get Subscribers
 * @apiName GetSubscribers
 * @apiGroup Newsletter
 * @apiHeader {String} Authorization Admin access token (Bearer Token).
 *
 * @apiSuccess {Object[]} subscribers List of all subscribers (users and guests).
 *
 * @apiSuccessExample Success-Response:
 * [
 *   {
 *     "email": "guest1@example.com"
 *   },
 *   {
 *     "email": "user@example.com",
 *     "firstName": "Matti",
 *     "lastName": "Meikäläinen",
 *     "is_subscribed": true
 *   }
 * ]
 */
const handleGetSubscribers = async (req, res) => {
  try {
    const result = await getSubscribers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

/**
 * @api {get} /newsletter/:email Check Guest Subscription
 * @apiName IsSubscribed
 * @apiGroup Newsletter
 *
 * @apiParam {String} email Guest's email address.
 *
 * @apiSuccess {Boolean} isSubscribed Subscription status of the guest.
 *
 * @apiSuccessExample Success-Response:
 * {
 *   "isSubscribed": true
 * }
 */
const handleIsSubscribed = async (req, res) => {
  const {email} = req.params;

  try {
    const isSubscribed = await getGuestSubscriber(email);
    res.status(200).json({isSubscribed: isSubscribed});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export {
  handleUserSubscription,
  handleAddGuestSubscription,
  handleAddNewsletter,
  handleGetNewsletters,
  handleDeleteNewsletter,
  handleGetSubscribers,
  handleIsSubscribed,
};
