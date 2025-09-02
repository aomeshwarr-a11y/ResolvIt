import multer from "multer";
import path from "path";
import fs from "fs";
import { nanoid } from "nanoid";
import Complaint from "../models/Complaint.js";

// Configure multer storage
const baseDir = process.cwd();
const uploadsDir = path.join(baseDir, "resolvit-backend", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${nanoid(8)}${ext}`);
  },
});

export const upload = multer({ storage });

export async function createComplaint(req, res) {
  try {
    const { userName, email, type, description } = req.body;
    if (!userName || !email || !type || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const ticketId = `RSV-${nanoid(10)}`;
    const filePath = req.file ? `/uploads/${req.file.filename}` : undefined;
    const complaint = await Complaint.create({
      ticketId,
      userName,
      email,
      type,
      description,
      filePath,
      status: "Submitted",
    });
    res.status(201).json({ ticketId: complaint.ticketId, id: complaint._id, status: complaint.status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getComplaintById(req, res) {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findOne({ $or: [{ _id: id }, { ticketId: id }] });
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function listComplaints(req, res) {
  try {
    const { q, status, type } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (q) {
      filter.$or = [
        { ticketId: new RegExp(q, "i") },
        { userName: new RegExp(q, "i") },
        { email: new RegExp(q, "i") },
        { description: new RegExp(q, "i") },
      ];
    }
    const items = await Complaint.find(filter).sort({ createdAt: -1 }).limit(200);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateComplaintStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ["Submitted", "In Review", "In Progress", "Resolved"];
    if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid status" });
    const complaint = await Complaint.findOneAndUpdate(
      { $or: [{ _id: id }, { ticketId: id }] },
      { status },
      { new: true }
    );
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

