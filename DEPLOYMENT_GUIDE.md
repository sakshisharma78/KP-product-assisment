# Deployment Guide to Render & Netlify

## 🚀 Part 1: Deploy Backend (Node.js) to Render

Since this project requires a Node.js backend to connect to MongoDB, deploying to **Render** is the best free option.

1.  **Preparation**:
    *   Ensure your `server` code is pushed to a GitHub repository (e.g., `feedback-system`).
    *   The structure is already updated with `start` script and `engines` in `package.json`.

2.  **Steps on Render**:
    *   Go to [Render Dashboard](https://dashboard.render.com/).
    *   Click **New +** -> **Web Service**.
    *   Select "Build and deploy from a Git repository" and connect your GitHub repo.
    *   **Settings**:
        *   **Name**: `feedback-backend` (or similar)
        *   **Region**: Choose closest to you (e.g., Singapore/Oregon).
        *   **Branch**: `main`
        *   **Root Directory**: `server` (IMPORTANT! Set this as your backend is in a subfolder).
        *   **Build Command**: `npm install`
        *   **Start Command**: `node index.js`
    *   **Environment Variables**:
        *   Click **Advanced** -> **Add Environment Variable**.
        *   Key: `MONGODB_URI`
        *   Value: `mongodb+srv://s8634878:WOkoyhTXP6QpjIo2@cluster0.3wonooh.mongodb.net/feedback_system?retryWrites=true&w=majority`
        *   Key: `PORT`
        *   Value: `5000` (Render will assign a dynamic port, but good to have as fallback).

3.  **Finish**:
    *   Click **Create Web Service**.
    *   Render will deploy your backend. once live, copy the URL (e.g., `https://feedback-backend.onrender.com`).

---

## 🌐 Part 2: Deploy Frontend (React) to Netlify

Now that the backend is live, let's deploy the frontend and connect it.

1.  **Preparation**:
    *   In your local project, go to `client/src/api/axios.js`.
    *   Update the `baseURL` to match your *new Render backend URL* or set it via environment variables on Netlify.
    *   Ensure `netlify.toml` and `_redirects` exist (I have already created these for you!).

2.  **Steps on Netlify**:
    *   Go to [Netlify](https://app.netlify.com/).
    *   Click **Add new site** -> **Import an existing project**.
    *   Connect to **GitHub** and select your repository.
    *   **Settings**:
        *   **Base directory**: `client` (IMPORTANT!)
        *   **Build command**: `npm run build`
        *   **Publish directory**: `client/dist` (Vite outputs to `dist` by default).
    *   **Environment Variables**:
        *   Click **Show advanced** -> **New Variable**.
        *   Key: `VITE_API_URL`
        *   Value: `https://your-backend-app.onrender.com` (Replace this with the actual URL from Step 1).
    *   Click **Deploy site**.

3.  **Verification**:
    *   Once deployed, open your Netlify URL.
    *   The app should now be live, fetching data from your MongoDB Atlas database via the Render backend!

---

### ✅ Summary of Changes Made
*   Updated `server/.env` with your MongoDB Atlas connection string.
*   Added `netlify.toml` and `_redirects` to `client/` for smooth SPA routing.
*   Updated `server/package.json` with Node engine requirements for Render.
