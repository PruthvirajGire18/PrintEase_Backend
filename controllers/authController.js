// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const JWT_SECRET = process.env.JWT_SECRET;

// // Signup
// exports.signup = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   if (!name || !email || !password || !role)
//     return res.status(400).json({ error: "All fields required" });

//   const existingUser = await User.findOne({ email });
//   if (existingUser) return res.status(400).json({ error: "Email exists" });

//   const hashed = await bcrypt.hash(password, 10);
//   const user = await User.create({ name, email, password: hashed, role });
//   res.json({ message: "Signup successful", userId: user._id });
// };

// // Login
// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ error: "User not found" });

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) return res.status(400).json({ error: "Invalid password" });

//   const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
//   res.json({ token, role: user.role, name: user.name });
// };
