# Backend Project

## Project Details

**Project Name:** backend  
**Version:** 1.0.0  
**Main File:** index.js  
**Type:** ES Module  
**Description:** Node.js backend with Express, MySQL, JWT authentication, and Google OAuth integration.

---

## Features

- User authentication with **JWT**
- Google OAuth login/signup
- Password hashing using **bcrypt**
- MySQL database integration
- Logging with **morgan**
- Express session support
- CORS enabled
- Protected routes with middleware

---

## Installation

1. **Clone the repository:**

```bash
git clone <repository_url>
cd backend
```

2. **Install dependencies:**

npm install


3. **Set up environment variables:**

```bash
Create .env file in the root directory:

PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. **Run the server**
```bash
npm start
```

## API Endpoints

**Auth Routes**

| Method | Endpoint           | Description             |
| ------ | -----------------  | ---------------------- |
| GET    | `/auth-url`        | Get Google OAuth URL   |
| GET    | `/oauth2callback`  | Handle Google OAuth callback |

**User Routes**

| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| GET    | `/users`           | Get all users (protected)     |
| GET    | `/users/:id`       | Get user by ID (protected)    |
| POST   | `/create-user`     | Create a new user (protected) |
| PUT    | `/update-user/:id` | Update user by ID (protected) |
| DELETE | `/delete-user/:id` | Delete user by ID (protected) |

