import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; 
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};