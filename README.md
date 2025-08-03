live-link: healthcare-appointment-seven.vercel.app

# 🏥 Doctor Appointment Booking Platform

A responsive full-stack web application that allows users to view doctor profiles and book appointments with them. The platform includes doctor listing, detailed doctor profile view, and a dynamic appointment booking system.

---

## 🚀 Features

- View a list of available doctors with search and filter functionality.
- See detailed information about each doctor including specialization, experience, ratings, hospital, and more.
- Book appointments through a popup form.
- Responsive UI for both desktop and mobile screens.
- Backend with REST API support for doctor and appointment data.

---

## 🛠️ Tools / Libraries Used

### Frontend:

- **React** – JavaScript library for building user interfaces.
- **TypeScript** – Superset of JavaScript adding static type checking.
- **Tailwind CSS** – Utility-first CSS framework for custom UI design.
- **React Router** – For handling client-side routing.
- **React Popup** – Lightweight modal library for showing booking form.
- **Vite** – Fast build tool and dev server.

### Backend:

- **Node.js** – Runtime for building the server.
- **Express.js** – Framework for creating REST APIs.
- **MySQL** – Relational database for storing doctor and appointment data.
- **CORS & Body Parser** – Middleware for handling requests.

---

## ⚙️ Challenges Faced and Solutions

### 1. **Handling Popups in TypeScript**

- **Challenge**: The popup modal component from `reactjs-popup` required custom typing to work correctly with dynamic content.
- **Solution**: Used type assertions (`as unknown as React.ReactNode`) to safely cast the inline function rendering the modal, solving type errors without breaking functionality.

### 2. **Displaying JSON Data from MySQL**

- **Challenge**: MySQL’s `JSON` type required proper parsing on the backend to deliver `schedule` as an array.
- **Solution**: Used `JSON.parse()` on the backend before sending data to the frontend to ensure the schedule was properly rendered.

### 3. **Mobile Responsiveness**

- **Challenge**: Making the profile and list pages fully responsive while keeping a clean layout.
- **Solution**: Leveraged Tailwind CSS’s responsive utilities (`sm:`, `md:`, `lg:`) to create adaptive designs.

### 4. **Conditional Rendering for Edge Cases**

- **Challenge**: Handling states like "No data found" in search and booking form submission success.
- **Solution**: Implemented conditional rendering based on filtered results and `success`/`error` flags to provide feedback to users gracefully.

---

## ✅ How to Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/doctor-booking-app.git
cd doctor-booking-app

# Start Backend
cd server
npm install
npm run dev

# Start Frontend
cd ../client
npm install
npm run dev
```
