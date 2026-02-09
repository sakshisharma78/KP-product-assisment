# 🌟 Customer Feedback Management System

A high-performance, full-stack web application designed to collect, manage, and analyze customer feedback seamlessly. Built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), this system features a stunning UI, real-time analytics, and robust administrative controls.

---

## 🚀 Key Features

### 🔹 For Users (Frontend)
*   **Interactive Feedback Form**:  
    A sleek, responsive form with hoverable star ratings, category selection (Product, Service, Support), and real-time validation.
*   **Live Feedback Feed**:  
    View submitted feedback in a modern card layout with beautiful entry animations.
*   **Smart Filtering & Search**:  
    Instantly filter feedback by rating or category, and search across names, emails, and comments.
*   **Responsive Design**:  
    Optimized for all devices—desktops, tablets, and mobile phones.

### 🔹 For Admins (Dashboard)
*   **Analytics Dashboard**:  
    Visual insights including total feedback count, average ratings, and a category-wise breakdown using interactive charts (Chart.js).
*   **Feedback Management**:  
    A secure admin panel to view detailed feedback, delete entries, and update status (New, Read, Resolved).
*   **Status Tracking**:  
    Color-coded badges (e.g., New=Blue, Resolved=Green) for easy status monitoring.

---

## 🛠️ Tech Stack & Libraries

This project uses a modern and robust technology stack to ensure performance and scalability.

### **Frontend (Client)**
| Technology | Purpose |
| :--- | :--- |
| **React** (Vite) | Fast and modern UI library for building components. |
| **Tailwind CSS** | Utility-first CSS framework for rapid and beautiful styling. |
| **Framer Motion** | Powerful library for smooth animations and transitions. |
| **Axios** | Promise-based HTTP client for API requests. |
| **React Router** | For seamless client-side navigation. |
| **Chart.js** | For rendering beautiful data visualization charts. |
| **Lucide React** | High-quality, consistent icons. |
| **React Toastify** | Elegant notifications for user actions. |

### **Backend (Server)**
| Technology | Purpose |
| :--- | :--- |
| **Node.js** | JavaScript runtime environment. |
| **Express.js** | Fast and minimalist web framework for building APIs. |
| **MongoDB** | NoSQL database for flexible data storage. |
| **Mongoose** | ODM library for MongoDB schema modeling and validation. |
| **Cors** | Middleware to enable Cross-Origin Resource Sharing. |
| **Dotenv** | Module to load environment variables. |

---

## ⚙️ Installation & Setup Guide

Follow these simple steps to get the project running on your local machine.

### **Prerequisites**
Before you begin, ensure you have the following installed:
1.  **Node.js** (v14 or higher) - [Download Here](https://nodejs.org/)
2.  **MongoDB** (Must be installed and running locally) - [Download Here](https://www.mongodb.com/try/download/community)

### **Step 1: Clone or Download the Project**
Extract the project folder to your desired location (e.g., `Desktop\kp assessment`).

### **Step 2: Start the Backend Server**
1.  Open a terminal/command prompt.
2.  Navigate to the `server` folder:
    ```bash
    cd server
    ```
3.  Install the required dependencies:
    ```bash
    npm install
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    ✅ *You should see: `Server running on port 5000` and `MongoDB Connected`*

### **Step 3: Start the Frontend Application**
1.  Open a **new** terminal window.
2.  Navigate to the `client` folder:
    ```bash
    cd client
    ```
3.  Install the required dependencies:
    ```bash
    npm install
    ```
4.  Start the application:
    ```bash
    npm run dev
    ```
    ✅ *You should see a local URL (e.g., `http://localhost:5173`). Open this in your browser.*

---

## ⚡ Quick Start (Windows Only)
If you are on Windows, you can simply run the included batch script:
1.  Double-click **`start-app.bat`** in the main folder.
2.  The script will automatically install dependencies and launch both the backend and frontend servers for you.

---

## 📂 Project Structure

```
kp assessment/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── components/    # Reusable UI components (Form, Header, Cards)
│   │   ├── pages/         # Application pages (Home, Dashboard, Admin)
│   │   └── App.jsx        # Main application component
│   └── package.json       # Frontend dependencies
│
├── server/                 # Backend Express Application
│   ├── config/            # Database configuration
│   ├── controllers/       # Logic for handling API requests
│   ├── models/            # Mongoose database schemas
│   ├── routes/            # API endpoints definition
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
│
└── README.md              # Project documentation
```

---

