import http from "http";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.js";
import { createApp } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/resolvit";

async function start() {
  try {
    await connectToDatabase(MONGODB_URI);
    const app = createApp();
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`ResolvIt backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();

