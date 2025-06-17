import Company from "../models/Company.js";

export const updateCompanyProfile = async (req, res) => {
  const { name, contactEmail, contactNumber, website } = req.body;
  try {
    const company = await Company.findOneAndUpdate(
      { user: req.user._id },
      { name, contactEmail, contactNumber, website },
      { new: true }
    );
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user._id });
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
