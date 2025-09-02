import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Academic", "Workplace", "Technical", "Other"],
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    filePath: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Submitted", "In Review", "In Progress", "Resolved"],
      default: "Submitted",
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", ComplaintSchema);

