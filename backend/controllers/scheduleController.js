import Schedule from "../models/scheduleModel.js";

export const createSchedule = async (req, res) => {
  try {
    const { bin, collector, scheduledDate } = req.body;
    if (!bin || !collector || !scheduledDate) {
      return res
        .status(400)
        .json({ success: false, message: "Bin, collector, and date required" });
    }

    const schedule = await Schedule.create({
      bin,
      collector,
      scheduledDate,
      assignedBy: req.user._id,
    });

    res.status(201).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate("bin", "binId status")
      .populate("collector", "name")
      .populate("assignedBy", "name");
    res.status(200).json({ success: true, data: schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate("bin", "binId status")
      .populate("collector", "name")
      .populate("assignedBy", "name");
    if (!schedule) {
      return res
        .status(404)
        .json({ success: false, message: "Schedule not found" });
    }
    if (
      req.user.role === "garbage_collector" &&
      schedule.collector.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }
    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res
        .status(404)
        .json({ success: false, message: "Schedule not found" });
    }

    if (req.user.role === "garbage_collector") {
      if (schedule.collector.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ success: false, message: "Not your schedule" });
      }
      schedule.status = req.body.status || schedule.status;
    } else if (req.user.role === "admin") {
      Object.assign(schedule, req.body);
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    const updatedSchedule = await schedule.save();
    res.status(200).json({ success: true, data: updatedSchedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res
        .status(404)
        .json({ success: false, message: "Schedule not found" });
    }
    await schedule.remove();
    res.status(200).json({ success: true, message: "Schedule deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCollectorSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find({ collector: req.user._id })
      .populate("bin", "binId status")
      .populate("assignedBy", "name");
    res.status(200).json({ success: true, data: schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
