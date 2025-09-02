import { Router } from "express";
import { createComplaint, getComplaintById, listComplaints, updateComplaintStatus, upload } from "../controllers/complaint.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

// Public create with optional file upload
router.post("/", upload.single("file"), createComplaint);

// Admin/staff routes
router.get("/", requireAuth, requireRole(["admin", "staff"]), listComplaints);
router.put("/:id", requireAuth, requireRole(["admin", "staff"]), updateComplaintStatus);

// Public fetch by id or ticketId
router.get("/:id", getComplaintById);

export default router;

