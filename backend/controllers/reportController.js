import Report from "../models/reportModel.js";

export const createReport = async (req, res) => {
  try {
    const { bin, collectionDate, wasteVolume, issues } = req.body;
    if (!bin || !collectionDate || !wasteVolume) {
      return res
        .status(400)
        .json({ success: false, message: "Bin, date, and volume required" });
    }

    const report = await Report.create({
      bin,
      collector: req.user._id,
      collectionDate,
      wasteVolume,
      issues,
    });

    res.status(201).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("bin", "binId status")
      .populate("collector", "name")
      .populate("reviewedBy", "name");
    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate("bin", "binId status")
      .populate("collector", "name")
      .populate("reviewedBy", "name");
    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });
    }
    if (
      req.user.role === "garbage_collector" &&
      report.collector.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });
    }

    Object.assign(report, req.body);
    report.reviewedBy = req.user._id;
    const updatedReport = await report.save();
    res.status(200).json({ success: true, data: updatedReport });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });
    }
    await report.remove();
    res.status(200).json({ success: true, message: "Report deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCollectorReports = async (req, res) => {
  try {
    const reports = await Report.find({ collector: req.user._id })
      .populate("bin", "binId status")
      .populate("reviewedBy", "name");
    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
