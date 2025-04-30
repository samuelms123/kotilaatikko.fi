import {
  addGuestSubscriber,
  addNewsletter,
  deleteNewsletter,
  getNewsletters,
  getSubscribers,
} from '../models/newsletterModel.js';
import {updateUserSubscription} from '../models/userModel.js';

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

const handleAddNewsletter = async (req, res) => {
  try {
    const newsLetter = req.body;
    const result = await addNewsletter(newsLetter);
    res.status(201).json({message: 'Newsletter created', result});
  } catch (error) {
    console.error('Error adding newsletter:', error);
    res.status(500).json({error: 'Failed to create newsletter'});
  }
};

const handleGetNewsletters = async (req, res) => {
  try {
    const result = await getNewsletters();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const handleDeleteNewsletter = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await deleteNewsletter(id);
    res.status(200).json({message: 'Newsletter deleted', deleted: result});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const handleGetSubscribers = async (req, res) => {
  try {
    const result = await getSubscribers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export {
  handleUserSubscription,
  handleAddGuestSubscription,
  handleAddNewsletter,
  handleGetNewsletters,
  handleDeleteNewsletter,
  handleGetSubscribers,
};
