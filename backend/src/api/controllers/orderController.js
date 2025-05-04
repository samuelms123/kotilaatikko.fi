import { getOrders } from "../models/orderModel.js";

const handleGetOrders = async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to fetch orders (controller)'});
  }
};


const handlePostOrder = async (req, res) => {

}

export {
  handleGetOrders, handlePostOrder
}
