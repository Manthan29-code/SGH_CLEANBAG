import Route from "../models/routeModel.js";

export const createRoute = async (req, res) => {
  try {
    const { collector, bins, startLocation, endLocation } = req.body;
    if (!collector || !bins || !startLocation || !endLocation) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    const route = await Route.create({
      collector,
      bins,
      startLocation,
      endLocation,
      plannedBy: req.user._id,
    });

    res.status(201).json({ success: true, data: route });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find()
      .populate("collector", "name")
      .populate("bins", "binId status")
      .populate("plannedBy", "name");
    res.status(200).json({ success: true, data: routes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id)
      .populate("collector", "name")
      .populate("bins", "binId status")
      .populate("plannedBy", "name");
    if (!route) {
      return res
        .status(404)
        .json({ success: false, message: "Route not found" });
    }
    if (
      req.user.role === "garbage_collector" &&
      route.collector.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }
    res.status(200).json({ success: true, data: route });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res
        .status(404)
        .json({ success: false, message: "Route not found" });
    }

    if (req.user.role === "garbage_collector") {
      if (route.collector.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ success: false, message: "Not your route" });
      }
      route.status = req.body.status || route.status;
    } else if (req.user.role === "admin") {
      Object.assign(route, req.body);
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    const updatedRoute = await route.save();
    res.status(200).json({ success: true, data: updatedRoute });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res
        .status(404)
        .json({ success: false, message: "Route not found" });
    }
    await route.remove();
    res.status(200).json({ success: true, message: "Route deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCollectorRoutes = async (req, res) => {
  try {
    const routes = await Route.find({ collector: req.user._id })
      .populate("bins", "binId status")
      .populate("plannedBy", "name");
    res.status(200).json({ success: true, data: routes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
