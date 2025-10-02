import userModel from "../models/userModel.js";

// ---------------- Add to Cart ----------------
const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId;  

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.json({ success: true, message: "Product added to cart successfully" });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ success: false, message: e.message });
  }
};

// ---------------- Update Cart ----------------
const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1  
      }
      else {
        cartData[itemId][size] = 1
      }
    }
    else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }
    await userModel.findByIdAndUpdate(userId, {cartData})
    res.json({
      success: true,
      message: "Cart updated successfully",
    })
  } catch (err) {
    console.error("Error updating cart:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


// ---------------- Get User Cart ----------------
const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, cartData: userData.cartData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Cart delete route
const deleteFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, size } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!userData.cartData[itemId]) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    delete userData.cartData[itemId][size];

    if (Object.keys(userData.cartData[itemId]).length === 0) {
      delete userData.cartData[itemId];
    }

    userData.markModified("cartData");
    await userData.save();

    return res.json({ success: true, cartData: userData.cartData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


export { addToCart, updateCart, getUserCart, deleteFromCart};
