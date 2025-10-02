import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach userId to request
    req.userId = decoded.id;

    // if you *really* need it in body (for POST routes), make sure body exists
    if (!req.body) req.body = {};
    req.body.userId = decoded.id;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
