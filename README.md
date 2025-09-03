# ResolvIt
diff --git a/README.md b/README.md
--- a/README.md
+++ b/README.md
@@ -1,1 +1,60 @@
-# ResolvIt
+## ResolvIt - Complaint Management System
+
+Production-ready scaffold with React + Tailwind frontend and Node.js + Express + MongoDB backend.
+
+### Quick Start
+
+1) Start MongoDB (Docker):
+
+```bash
+docker compose up -d
+```
+
+2) Backend
+
+```bash
+cd resolvit-backend
+echo "PORT=4000
+MONGODB_URI=mongodb://127.0.0.1:27017/resolvit
+JWT_SECRET=supersecret
+ADMIN_EMAIL=admin@resolvit.local
+ADMIN_PASSWORD=admin123" > .env
+npm run seed         # optional, seeds admin and sample complaints
+npm run dev
+```
+
+Default backend: `http://localhost:4000`
+
+3) Frontend
+
+```bash
+cd resolvit-frontend
+npm run dev
+```
+
+Frontend dev: as printed by Vite (API proxied to `/api`).
+
+### Credentials
+
+- Admin: `admin@resolvit.local`
+- Password: `admin123`
+
+### API Endpoints (prefix `/api`)
+
+- POST `/complaints` - Submit complaint (multipart, field `file` optional)
+- GET `/complaints/:id` - Get by Mongo `_id` or `ticketId`
+- GET `/complaints` - List complaints (admin/staff)
+- PUT `/complaints/:id` - Update status (admin/staff)
+- POST `/auth/login` - Login (email, password)
+- GET `/auth/me` - Current user
+- POST `/auth/logout` - Logout
+
+### Project Structure
+
+- `resolvit-backend` - Express app (routes, controllers, models, seed)
+- `resolvit-frontend` - React app (pages, components, context)
+
+### Notes
+
+- File uploads are stored in `resolvit-backend/uploads` and served at `/uploads/...`.
+- Dashboard includes search and filters; workflow statuses: Submitted → In Review → In Progress → Resolved.