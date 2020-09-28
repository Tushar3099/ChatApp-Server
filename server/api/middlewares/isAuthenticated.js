import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) throw { message: "Invalid token provided" };
    req.user = { _id: payload.id };
    next();
  } catch (error) {
    res.send({ message: error.message || "User is not authenticated" });
  }
};

export default isAuthenticated;
