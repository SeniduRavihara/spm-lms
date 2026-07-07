# IDEACADE - Learning Management System (LMS)

Welcome to **IDEACADE**, a premium, full-stack Learning Management System (LMS) designed to offer interactive learning platforms for students and courses/lesson administration for teachers.

---

## 🚀 Features

### 💻 Client Web Application (Next.js)
*   **Vibrant Marketing Landing Page**: Designed with Inter typography, smooth animations, and curated color palettes featuring:
    *   Interactive Hero section with clean Call-to-Actions.
    *   Bestsellers & Featured Courses grid.
    *   Categories filter.
    *   Instructor profiles.
    *   Dynamic FAQs accordion.
*   **Aesthetic Authentication (JWT)**: Fully-animated sign-in and sign-up interfaces using `framer-motion` with built-in demo credentials for quick access.
*   **Unified Navbar**: Smart routing header that switches seamlessly between marketing layout (for public visitors) and LMS dashboard controls (for signed-in users).
*   **Interactive Student Dashboard**:
    *   Metrics grid (Enrolled Courses, Active Modules, Finished Courses, Overall Progress bar).
    *   Real-time search and filter tabs (All, In Progress, Completed, Not Started).
    *   Interactive checklist syllabus to mark lessons as completed with immediate progress percentage bar updates.
*   **Comprehensive Teacher Dashboard**:
    *   Manage and list all authored courses.
    *   Create, edit, and delete courses.
    *   Dynamic syllabus editor to add, rename, and remove lessons for each course.
*   **Profile Editor**: Update profile settings, change emails, names, or passwords.

### ⚙️ Backend Server (Express.js)
*   **JWT Authentication**: Secure endpoints for signup, sign-in, profile updates, and active session fetching.
*   **In-Memory Database**: Seeded mock data store that gets initialized automatically at boot time with courses, lessons, progress tables, and default users.
*   **API Coverage**: Restful endpoints for:
    *   `/api/auth` (User signup, login, updating profile)
    *   `/api/courses` (CRUD for courses, syllabus fetch)
    *   `/api/lessons` (CRUD for course syllabus lessons)
    *   `/api/progress` (Track and toggle student completion status for individual lessons)

---

## 📂 Project Structure

```text
spm-lms/
├── client/                 # Next.js Frontend App
│   ├── src/
│   │   ├── app/            # Next.js App Router (auth, dashboard, profile, student, teacher)
│   │   ├── components/     # UI components (Navbar, checklist, custom elements)
│   │   ├── contexts/       # AuthContext provider
│   │   └── lib/            # Axios/Fetch API client wrappers
│   └── package.json        # Frontend scripts and packages
│
├── server/                 # Express.js API Backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth checks
│   │   ├── routes/         # Router endpoints
│   │   └── db.ts           # Mock database storage and seed logic
│   └── package.json        # Backend scripts and packages
│
└── README.md               # Main project documentation
```

---

## 🛠️ Prerequisites

*   [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
*   [npm](https://www.npmjs.com/) (v9.0.0 or higher recommended)

---

## 🏎️ Getting Started (Local Development)

To run the application locally, start both the backend server and the frontend client.

### 1. Run the Backend API Server
Navigate to the `server/` directory, install dependencies, and start the development server:

```bash
cd server
npm install
npm run dev
```

The API server will launch at: **`http://localhost:4000`**

### 2. Run the Next.js Frontend Client
Navigate to the `client/` directory, install dependencies, and start the Next.js dev server:

```bash
cd ../client
npm install
npm run dev
```

The web application will launch at: **`http://localhost:3000`**

---

## 🔑 Demo Credentials

Once the servers are running, navigate to `http://localhost:3000/login` and use these pre-seeded accounts:

| Role | Email | Password | Description |
| :--- | :--- | :--- | :--- |
| **Teacher** | `teacher@test.com` | `password` | Accesses the Teacher Dashboard to create courses and manage syllabus structures. |
| **Student** | `student@test.com` | `password` | Accesses the Student Dashboard to view progress, filter courses, and check off completed lessons. |

---

## 🏗️ Production Build & Deployment

### 1. Backend Server Deployment
To compile the TypeScript server codebase into plain JavaScript and run it in a production state:

```bash
cd server
npm run build      # Compiles TS files to build output in `dist/`
npm run start      # Runs the compiled JavaScript from `dist/index.js`
```

#### Server Environment Variables
Create a `.env` file in the `server/` directory if you wish to override defaults:
*   `PORT`: Port number for the Express server (default: `4000`).
*   `JWT_SECRET`: Secret signature key used for signing JWT payload tokens.

---

### 2. Frontend Next.js Client Deployment
To generate a highly-optimized static/server-rendered Next.js release and serve it:

```bash
cd client
npm run build      # Builds the production bundle using Turbopack compiler
npm run start      # Starts the production server hosting the built bundle
```

#### Client Environment Variables
Create a `.env.production` or `.env.local` file in the `client/` directory to configure build-time endpoints:
*   `NEXT_PUBLIC_API_URL`: The URL where the backend Express API is running (default: `http://localhost:4000/api`).

---

## 🧪 Verification & Health Check

You can verify that the backend API is up and running by sending a GET request to the health check endpoint:

```bash
curl http://localhost:4000/api/health
# Response: {"status":"ok"}
```
