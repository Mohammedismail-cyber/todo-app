# Todo // Terminal Console

A fast, modern single-page Todo application engineered with a **"terminal-meets-product"** aesthetic. Features a luminous-green on near-black palette, hairline console dividers, subtle reactive glow effects, and a resilient Express + TypeScript backend.

---

## ⚡ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS (Custom Color Tokens) |
| **Typography** | Space Grotesk, Inter, IBM Plex Mono (Google Fonts) |
| **Backend Runtime** | Node.js + Express (TypeScript) |
| **Database / ODM** | MongoDB Atlas / Mongoose |
| **State Management** | Optimistic UI updates with React hooks |

---

## 🎨 Design System & Palette

- **Page Background (`bg`)**: `#0B0D0C` (near-black with subtle organic undertone)
- **Todo Row Surface (`surface`)**: `rgba(18, 21, 20, 0.4)` (translucent dark surface)
- **Hairline Border (`border`)**: `#1F2421` (sleek row and container dividers)
- **Neon Accent (`accent`)**: `#39FF88` (luminous green for terminal checkboxes, focus rings, and active filters)
- **Accent Dim (`accent-dim`)**: `#1F6B45` (hover borders and subtle details)
- **Primary Text (`text-primary`)**: `#F5FFF9` (off-white, faint green warmth)
- **Muted Text (`text-muted`)**: `#8FA79B` (counts, timestamps, placeholder copy)

### Typography
- **Display / Heading**: **Space Grotesk** (`32px`, bold geometric personality)
- **Body / UI**: **Inter** (task inputs and items)
- **Data / Meta**: **IBM Plex Mono** (`X items left`, filter counter tags)

---

## 🚀 Features

- **Terminal Aesthetic Checkboxes**: Circular indicators with a luminous neon glow (`box-shadow: 0 0 12px #39FF88`) when completed.
- **One-Motion Fluid Transitions**: Smooth slide-in motion on item addition (`animate-slide-in`).
- **Interactive Filtering**: Client-side filtering across **All**, **Active**, and **Completed** with live counter pills.
- **Optimistic Updates**: Instant UI reactions on toggle and delete actions, backed by seamless API sync.
- **Dual-Mode Resilient Backend**: Out-of-the-box MongoDB Atlas support with an automatic in-memory fallback store so testing works without database setup delays.

---

## 📂 Project Structure

```
Todo-app/
├── backend/
│   ├── src/
│   │   ├── config/db.ts              # MongoDB Atlas / Mongoose connection
│   │   ├── controllers/todo.controller.ts # REST CRUD handlers
│   │   ├── models/todo.model.ts      # Mongoose schema and types
│   │   ├── routes/todo.routes.ts     # /api/todos route declarations
│   │   ├── app.ts                    # Express app configuration & CORS
│   │   └── server.ts                 # Server entry point
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoInput.tsx         # Controlled input with focus glow
│   │   │   ├── TodoItem.tsx          # Terminal row, checkbox & hover actions
│   │   │   ├── TodoList.tsx          # List renderer & custom empty state
│   │   │   └── FilterTabs.tsx        # All / Active / Completed filters
│   │   ├── lib/api.ts                # Fetch client for backend API
│   │   ├── types/todo.ts             # TypeScript interfaces
│   │   ├── App.tsx                   # Main layout container & state
│   │   ├── main.tsx                  # Application entry point
│   │   └── index.css                 # Tailwind directives & glow effects
│   ├── index.html                    # Google fonts & meta tags
│   ├── tailwind.config.ts            # Design system palette configuration
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v20+ recommended
- **npm** or **yarn**

### 1. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend server will start at `http://localhost:5000`.
- API Base: `http://localhost:5000/api/todos`
- Health check: `http://localhost:5000/health`

#### Database Configuration (`.env`)
By default, the backend runs in resilient fallback mode if no database is connected. To connect to your MongoDB Atlas cluster:
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Set your connection string:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/tododb?retryWrites=true&w=majority
   CLIENT_URL=http://localhost:5173
   ```

---

### 2. Frontend Setup

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173`.

---

## 📡 REST API Reference

Base Endpoint: `/api/todos`

| Method | Endpoint | Description | Request Body | Response Code |
|---|---|---|---|---|
| `GET` | `/api/todos` | List all todos (newest first) | — | `200 OK` |
| `POST` | `/api/todos` | Create a new todo | `{ "title": "Buy groceries" }` | `201 Created` / `400` |
| `PATCH` | `/api/todos/:id` | Update title or completion status | `{ "completed": true }` | `200 OK` / `404` |
| `DELETE` | `/api/todos/:id` | Remove a todo | — | `204 No Content` / `404` |

---

## 🚢 Deployment

### Frontend (Vercel)
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) → **Add New Project** → Select repository.
3. Framework preset: **Vite**.
4. Set Root Directory to `frontend`.
5. Add Environment Variable:
   - `VITE_API_URL`: Your deployed backend API URL (e.g., `https://your-api.onrender.com/api/todos`).
6. Deploy.

### Backend (Render)
1. In [Render](https://render.com), create a new **Web Service** linked to your repository.
2. Root Directory: `backend`.
3. Build Command: `npm install && npm run build`.
4. Start Command: `npm start`.
5. Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection URI.
   - `CLIENT_URL`: Your Vercel frontend domain.
