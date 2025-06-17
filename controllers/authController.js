import User from "../models/User.js";
import Student from "../models/Student.js";
import Company from "../models/Company.js";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const {
    email,
    password,
    role,
    name,
    rollNumber,
    branch,
    contactEmail,
    contactNumber,
  } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ email, password, role });
    await user.save();

    if (role === "student") {
      const student = new Student({ user: user._id, name, rollNumber, branch });
      await student.save();
    } else if (role === "company") {
      const company = new Company({
        user: user._id,
        name,
        contactEmail,
        contactNumber,
      });
      await company.save();
    } else if (role === "admin") {
      const admin = new Admin({ user: user._id, name, contactNumber });
      await admin.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
