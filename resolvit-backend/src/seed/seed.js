import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { connectToDatabase } from "../config/db.js";
import User from "../models/User.js";
import Complaint from "../models/Complaint.js";
import { nanoid } from "nanoid";

dotenv.config();

async function seed() {
  const mongo = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/resolvit";
  await connectToDatabase(mongo);

  // Create admin user if missing
  const adminEmail = process.env.ADMIN_EMAIL || "admin@resolvit.local";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({ name: "Admin", email: adminEmail, passwordHash, role: "admin" });
  }

  // Seed complaints if none exist
  const count = await Complaint.countDocuments();
  if (count === 0) {
    const types = ["Academic", "Workplace", "Technical", "Other"];
    const statuses = ["Submitted", "In Review", "In Progress", "Resolved"];
    const bulk = Array.from({ length: 10 }).map((_, i) => ({
      ticketId: `RSV-${nanoid(10)}`,
      userName: `Test User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      type: types[i % types.length],
      description: `Sample complaint ${i + 1}`,
      status: statuses[i % statuses.length],
    }));
    await Complaint.insertMany(bulk);
  }

  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

