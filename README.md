# 📝 DevLog

**Your personal space to write and share ideas.**  
A modern, full-stack blogging platform built with **React.js**, **Node.js**, **Express**, and **MongoDB**. Styled with **Tailwind CSS** and enhanced by **DaisyUI** for beautiful UI components.

---

## 🚀 Features

- ✍️ **Create, Edit & Delete Blogs**
- 🔐 **User Authentication (JWT based)**
- 🧠 **Responsive Design (Mobile Friendly)**
- 📷 **Image Upload with Cloudinary**
- 📚 **User Profile with Blogs Listing**
- 🌈 **Modern UI using Tailwind + DaisyUI**
- ☁️ **Live Toast Notifications**
- 🛡️ **Protected Routes for Authenticated Users**

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | Styling | Misc |
|---------|---------|----------|---------|------|
| React.js | Node.js | MongoDB | Tailwind CSS | Cloudinary |
| React Router | Express.js | Mongoose | DaisyUI | JWT Auth |
| Axios | | | | Toast / Alerts |

---



---

## 🧑‍💻 Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/devlog.git
cd devlog

# 2. Install dependencies
cd client
npm install
cd ../server
npm install

# 3. Create environment files

# .env (inside /server)
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# 4. Run the project
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start
