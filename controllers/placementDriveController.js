import PlacementDrive from "../models/PlacementDrive.js";

export const createPlacementDrive = async (req, res) => {
  const { name, date, companies, participants } = req.body;
  try {
    const placementDrive = new PlacementDrive({
      name,
      date,
      companies,
      participants,
    });
    await placementDrive.save();
    res.status(201).json(placementDrive);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getPlacementDrives = async (req, res) => {
  try {
    const placementDrives = await PlacementDrive.find().populate(
      "companies participants"
    );
    res.json(placementDrives);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updatePlacementDrive = async (req, res) => {
  const { name, date, companies, participants, status } = req.body;
  try {
    const placementDrive = await PlacementDrive.findByIdAndUpdate(
      req.params.id,
      { name, date, companies, participants, status },
      { new: true }
    );
    res.json(placementDrive);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
