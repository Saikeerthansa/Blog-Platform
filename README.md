# Blog Platform

A full-stack blog platform built with **MongoDB**, **Express.js**, **React.js**, and **Node.js** (MERN stack). This platform allows users to view, create, update, and delete blog posts while managing user authentication and data security.

## Features

- **User Authentication:** Secure login and registration with JWT and bcrypt for password hashing.
- **CRUD Operations:** Create, Read, Update, and Delete blog posts.
- **Role-Based Access Control:** Admin users can manage posts, while regular users can view and create their own posts.
- **Responsive UI:** Built with React.js to ensure a smooth user experience across all devices.
- **API Integration:** Backend API built with Express.js to handle data fetching and management.
- **MongoDB Integration:** Store and retrieve data in MongoDB, including posts and user details.

## Tech Stack

- **Frontend:**
  - React.js
  - Axios (for making HTTP requests)
  - CSS (for styling)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JWT (JSON Web Tokens) for authentication
  - bcrypt for password hashing

- **Development Tools:**
  - Git
  - npm/yarn
  - Postman (for testing API endpoints)

## Setup and Installation

Follow these steps to get your development environment up and running.

### Prerequisites

Make sure you have the following installed:
- **Node.js** (https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)

### Backend Setup

1. Navigate to the `blog-backend` directory.
   ```bash
   cd blog-backend
   ```
Install dependencies:
```
npm install
```
Create a .env file in the root of blog-backend and add the following environment variables:

```
MONGODB_URI=<Your MongoDB Connection URI>
JWT_SECRET=<Your JWT Secret>
```
Start the backend server:
```
node server.js
```
Frontend Setup
  Navigate to the blog-frontend directory.
```
cd blog-frontend
```
Install dependencies:
```
npm install
```
Start the frontend server:
```
npm start
```
Your application should now be running at http://localhost:3000 (frontend) and http://localhost:5000 (backend).

**Usage**
- Register a New User: Sign up with a username and password.
- Login: Use your credentials to log in and access the platform.
- Create a Post: Logged-in users can create new blog posts.
- Edit/Delete Posts: Admins can manage posts, while regular users can edit their own posts.

**API Endpoints**
  **Authentication**
  - POST /api/auth/register: Register a new user.
  - POST /api/auth/login: Login with username and password to receive a JWT token.
**Posts**
- GET /api/posts: Fetch all blog posts.
- GET /api/posts/:id: Fetch a specific blog post by ID.
- POST /api/posts: Create a new post (requires authentication).
- PUT /api/posts/:id: Edit an existing post (requires authentication).
- DELETE /api/posts/:id: Delete a post (requires authentication).
