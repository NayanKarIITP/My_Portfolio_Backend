README.md (Backend Only) — Ready to Use
# 🎯 Portfolio Backend (Node.js + Express + MongoDB)

This is the backend for my personal portfolio website.  
It handles incoming contact form messages and stores them securely in MongoDB.

---

## 🚀 Features

- REST API built using **Node.js + Express**
- Stores messages sent through the portfolio contact form
- MongoDB database integration with Mongoose
- CORS enabled for frontend communication
- Environment variable support using `.env`
- Clean folder structure (`routes`, `model`, `app.js`)

---

## 🗂️ Folder Structure



PORTFOLIOBACKEND
│── node_modules/
│── src/
│ ├── model/
│ │ └── message.js
│ ├── routes/
│ │ └── message.js
│ └── app.js
│── .env
│── package.json
│── package-lock.json
│── README.md


---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Dotenv**
- **CORS**

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:



MONGO_URI=your_mongodb_connection_string
PORT=5000


> ⚠️ NOTE: `.env` is added to `.gitignore` and should NOT be pushed to GitHub.

---

## ▶️ How to Run Locally

1. Clone the repo:



git clone https://github.com/NayanKarIITP/My_Portfolio_Backend.git


2. Install dependencies:



npm install


3. Add your `.env` file:



MONGO_URI=your_mongodb_url
PORT=5000


4. Start the server:



npm start


Server runs at:



http://localhost:5000


---

## 📡 API Endpoints

### **POST /api/message/send**

Stores a new message in the database.

#### **Request Body (JSON)**:
```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "message": "Hello, this is a test message."
}

Response:
{
  "success": true,
  "message": "Message sent successfully"
}
