# Smart Career and Job Recommendation Portal

A MERN Stack-based web application that helps students and job seekers explore suitable career opportunities and receive job recommendations based on their education, skills, interests, and career preferences.

## 1. Project Overview

The **Smart Career and Job Recommendation Portal** is designed to help students and fresh graduates identify suitable career paths and job opportunities.

Users can register, log in, manage their profiles, enter their educational qualifications, add skills and interests, and view relevant career and job recommendations.

The system aims to make career planning easier by connecting users' skills and interests with suitable opportunities.

## 2. Objectives

- To develop a user-friendly career recommendation platform.
- To help students identify suitable career opportunities.
- To maintain user education, skills, and interests.
- To provide personalized career and job recommendations.
- To simplify the job-search and career-planning process.

## 3. Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- React Router DOM
- Vite

### Backend
- Node.js
- Express.js
- REST API
- JWT Authentication
- bcryptjs

### Database
- MongoDB Atlas
- Mongoose

### Development Tools
- Visual Studio Code
- Git and GitHub
- Postman / Thunder Client
- npm

## 4. Main Features

- **User Registration:** New users can create an account.
- **User Login:** Registered users can securely log in.
- **Authentication:** JWT-based authentication.
- **User Profile:** Users can manage their personal and educational details.
- **Skills Management:** Users can add their technical and professional skills.
- **Interests Management:** Users can specify their career interests.
- **Career Recommendations:** Provides career suggestions based on user information.
- **Job Recommendations:** Helps users explore relevant job opportunities.
- **Database Management:** Stores user information using MongoDB.

## 5. Project Structure

```text
SmartCareerPortal/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── backend/
│   ├── models/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── careerRoutes.js
│   │   └── profileRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## 6. Installation and Setup

### Prerequisites

Install the following software:

- Node.js
- npm
- MongoDB Atlas account
- Visual Studio Code

### Step 1: Clone the Repository

```bash
git clone https://github.com/BMSharada/SmartCareerPortal.git
```

### Step 2: Open the Project

```bash
cd SmartCareerPortal
```

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 4: Configure Environment Variables

Create a `.env` file inside the backend folder.

Add the following configuration:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace the MongoDB connection string with your MongoDB Atlas connection string.

### Step 5: Start the Backend Server

```bash
npm run dev
```

If the development script is not configured, use the start command defined in your backend `package.json`.

### Step 6: Install Frontend Dependencies

Open another terminal in VS Code.

```bash
cd frontend
npm install
```

### Step 7: Start the Frontend

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

## 7. Database

The project uses MongoDB Atlas as its database.

The database stores information such as:

- User details
- Email and encrypted passwords
- Educational qualifications
- Skills
- Interests
- Profile information

Mongoose is used to connect the Node.js application with MongoDB.

## 8. Application Workflow

1. User opens the Smart Career Portal.
2. User registers with the required details.
3. User logs in using their credentials.
4. User updates their profile.
5. User adds education, skills, and interests.
6. The system processes the available profile information.
7. Relevant career and job recommendations are displayed.

## 9. Advantages

- Easy-to-use interface.
- Helps students explore career options.
- Centralized user profile management.
- Secure user authentication.
- Personalized career guidance.
- Reduces difficulty in identifying suitable career opportunities.

## 10. Future Enhancements

- AI-based career recommendation.
- Resume analysis and skill-gap identification.
- Live job portal integration.
- Job application tracking.
- Online skill assessment.
- Learning resource recommendations.

## 11. Author

**Developed by:** Budimatha Sharada

**Project Title:** Smart Career and Job Recommendation Portal Using MERN Stack

**Project Type:** MCA Academic Project

## 12. GitHub Repository

[Smart Career and Job Recommendation Portal](https://github.com/BMSharada/SmartCareerPortal)

---

**Note:** This project is developed for academic purposes using the MERN Stack (MongoDB, Express.js, React.js, and Node.js).
