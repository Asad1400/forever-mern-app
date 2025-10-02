import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Gateway Initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing order using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod, date } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      paymentMethod: paymentMethod || "COD",
      payment: false,
      date: date || Date.now(),
      address,
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
};

// Placing order using Stripe Method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod, date } = req.body;
    const origin = req.headers.origin?.startsWith("http")
      ? req.headers.origin
      : "http://localhost:4000";

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      paymentMethod: paymentMethod || "Stripe",
      payment: false,
      date: date || Date.now(),
      address,
    });

    await newOrder.save();

    // Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery fee
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Delivery Fee" },
        unit_amount: 1000,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

// Verify Stripe
const verifyStripe = async (req, res) => {
    const {orderId, success, userId} = req.body
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: "Payment Successfull" });
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Payment Failed" });
        }
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
}

// All Order data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      orders,
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: e.message,
    });
  }
};

// User Order data for front end
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({
      success: true,
      orders,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
};

// Update Order Status for Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({
      success: true,
      message: "Status Updated Successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: e.message,
    });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe
};
