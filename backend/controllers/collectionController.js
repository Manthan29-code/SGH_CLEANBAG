import Collection from "../models/collectionModel.js";

export const createCollection = async (req, res) => {
  try {
    const { binId, location, wasteType, fillLevel } = req.body;
    if (!binId || !location || !wasteType) {
      return res.status(400).json({
        success: false,
        message: "Bin ID, location, and waste type are required",
      });
    }

    const collection = await Collection.create({
      binId,
      location,
      wasteType,
      fillLevel: fillLevel || 0,
      reportedBy: req.user.role === "resident" ? req.user._id : null,
    });

    res.status(201).json({ success: true, data: collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find()
      .populate("reportedBy", "name email")
      .populate("assignedCollector", "name");
    res.status(200).json({ success: true, data: collections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id)
      .populate("reportedBy", "name email")
      .populate("assignedCollector", "name");
    if (!collection) {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }
    if (
      req.user.role === "resident" &&
      collection.reportedBy?._id.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }
    res.status(200).json({ success: true, data: collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }

    if (req.user.role === "garbage_collector") {
      if (
        collection.assignedCollector?.toString() !== req.user._id.toString()
      ) {
        return res
          .status(403)
          .json({ success: false, message: "Not your assigned bin" });
      }
      collection.status = req.body.status || collection.status;
      collection.fillLevel = req.body.fillLevel || collection.fillLevel;
    } else if (req.user.role === "admin") {
      Object.assign(collection, req.body);
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    const updatedCollection = await collection.save();
    res.status(200).json({ success: true, data: updatedCollection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }
    await collection.remove();
    res.status(200).json({ success: true, message: "Collection deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNearbyCollections = async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.query;
    const collections = await Collection.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseFloat(radius) || 1000, // Default 1km
        },
      },
    });
    res.status(200).json({ success: true, data: collections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const assignCollector = async (req, res) => {
  try {
    const { collectorId } = req.body;
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }
    collection.assignedCollector = collectorId;
    const updatedCollection = await collection.save();
    res.status(200).json({ success: true, data: updatedCollection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
