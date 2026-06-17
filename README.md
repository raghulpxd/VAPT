# VAPT Traffic Monitor

A desktop-based traffic monitoring application developed for Vulnerability Assessment and Penetration Testing (VAPT).

The application captures HTTP/HTTPS traffic using mitmproxy, forwards the captured data to a FastAPI backend, and displays the traffic in a real-time React dashboard. The dashboard can be run in a web browser or packaged as a desktop application using Electron.

---

# Architecture

Browser Traffic
↓
mitmproxy
↓
proxy_capture.py
↓
FastAPI Backend
↓
React Dashboard
↓
Electron Desktop Application

---

# Technologies Used

## Frontend

- React
- Vite
- Electron

## Backend

- FastAPI
- Uvicorn

## Traffic Capture

- mitmproxy

---

# Project Structure

```text
VAPT/
│
├── backend/
│   ├── App/
│   ├── proxy/
│   └── requirements.txt
│
├── frontend/
│   └── web-app/
│       ├── src/
│       ├── public/
│       ├── package.json
│       ├── main.js
│       └── vite.config.js
│
└── README.md
```

---

# Prerequisites

Install the following software before running the project:

## Python

Download:

https://www.python.org/downloads/

Verify installation:

```bash
python --version
```

---

## Node.js

Download:

https://nodejs.org/

Verify installation:

```bash
node --version
npm --version
```

---

## Git

Download:

https://git-scm.com/downloads

Verify installation:

```bash
git --version
```

---

# Backend Setup

Navigate to backend directory:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI server:

```bash
uvicorn App.main:app --reload
```

FastAPI will run on:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

# mitmproxy Setup

Install mitmproxy:

```bash
pip install mitmproxy
```

Navigate to proxy directory:

```bash
cd backend/proxy
```

Run mitmproxy script:

```bash
mitmdump -s proxy_capture.py
```

---

# Windows Proxy Configuration

Open:

Settings → Network & Internet → Proxy

Enable:

```text
Use a proxy server
```

Configure:

```text
Address:
127.0.0.1

Port:
8080
```

Save settings.

This routes browser traffic through mitmproxy for monitoring.

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend/web-app
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

If port 5173 is occupied, Vite may automatically use another port such as:

```text
http://localhost:5174
```

---

# Running the Complete Application

Open three terminals.

## Terminal 1 - FastAPI Backend

```bash
cd backend

venv\Scripts\activate

uvicorn App.main:app --reload
```

---

## Terminal 2 - mitmproxy

```bash
cd backend/proxy

mitmdump -s proxy_capture.py
```

---

## Terminal 3 - React Frontend

```bash
cd frontend/web-app

npm run dev
```

---

After all three services are running:

1. Open browser
2. Visit websites such as Google, YouTube, GitHub, etc.
3. Captured traffic will appear in the dashboard

---

# Electron Desktop Application

Navigate to:

```bash
cd frontend/web-app
```

Run Electron:

```bash
npm run electron
```

Build Desktop Application:

```bash
npm run dist
```

Generated executable:

```text
frontend/web-app/dist/
```

Example:

```text
VAPT Monitor.exe
```

---

# Current Features

- Real-time traffic capture
- HTTP/HTTPS monitoring
- Request method display
- Hostname extraction
- Search functionality
- Request detail viewer
- React web dashboard
- Electron desktop application

---

# Current Limitations

- Traffic stored in memory
- Manual proxy configuration required
- FastAPI and mitmproxy must be started separately
- SQLite persistence not yet implemented

---

# Future Enhancements

- SQLite database integration
- Automatic proxy configuration
- Automatic startup of FastAPI and mitmproxy
- Docker deployment
- Request/response analysis
- Traffic export functionality

---

# Contributors

- Raghul