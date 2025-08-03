# Health Care Appointment Booking Application

This is a full-stack application for booking healthcare appointments, with a React frontend and a Node.js backend.

## Project Structure

-   `frontend/`: Contains the React application built with Vite.
-   `backend/`: Contains the Node.js (Express) API.

## Local Development Setup

### Prerequisites

*   Node.js (v14 or higher)
*   npm (Node Package Manager)
*   MySQL database

### 1. Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and add your database connection details and frontend URL:
    ```
    DB_HOST=your_database_host
    DB_PORT=your_database_port
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    FRONTEND_URL=http://localhost:5173
    PORT=5000
    ```
    *Replace `your_database_host`, `your_database_port`, `your_database_user`, `your_database_password`, and `your_database_name` with your actual MySQL database credentials.*
4.  Ensure you have a `ca.pem` file in the `backend` directory if your MySQL connection requires SSL.
5.  Start the backend server:
    ```bash
    npm start
    ```
    The backend server will run on `http://localhost:5000`.

### 2. Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `frontend` directory:
    ```
    VITE_BACKEND_URL=http://localhost:5000
    ```
4.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The frontend application will run on `http://localhost:5173` (or another port if 5173 is in use).

## Deployment

### Backend Deployment (Render)

1.  **Create a new Web Service on Render.**
2.  **Connect your GitHub repository** containing this project.
3.  **Build Command:** `npm install`
4.  **Start Command:** `npm start`
5.  **Environment Variables:** Add the following environment variables in Render:
    *   `DB_HOST`: Your Render PostgreSQL internal database host (or external MySQL host).
    *   `DB_PORT`: Your database port.
    *   `DB_USER`: Your database user.
    *   `DB_PASSWORD`: Your database password.
    *   `DB_NAME`: Your database name.
    *   `FRONTEND_URL`: The URL of your deployed Vercel frontend (e.g., `https://your-vercel-app.vercel.app`).
    *   `PORT`: `5000` (or your desired port).
6.  Ensure your `ca.pem` file is included in your deployment if your database requires it.

### Frontend Deployment (Vercel)

1.  **Create a new Project on Vercel.**
2.  **Connect your GitHub repository** containing this project.
3.  Vercel should automatically detect that it's a Vite React application.
4.  **Environment Variables:** Add the following environment variable in Vercel:
    *   `VITE_BACKEND_URL`: The URL of your deployed Render backend (e.g., `https://your-render-app.onrender.com`).
5.  **Deploy.**

---