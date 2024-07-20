# Lior's E-commerce Application

Welcome to Lior's E-commerce Application, a full-stack MERN project built with a focus on modular architecture, state management using Redux, and JWT authentication and authorization. This project is a part of my portfolio showcasing my skills as a junior developer.

You can log in using these credentials at the following URL: [https://liors-ecommerce-app.onrender.com/login](https://liors-ecommerce-app.onrender.com/login)

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Admin Panel**: Manage products, categories, and users.
- **Product Management**: Add, edit, and delete products with detailed information.
- **Category Management**: Create and manage product categories.
- **User Management**: Admins can view and manage users who bought products.
- **Optimized Performance**: Using React hooks and performance optimization techniques.
- **Image Storage**: Images are stored using Firebase.

## Technologies Used

- **Frontend**: React, Redux, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Image Storage**: Firebase

## Project Structure

- **Frontend**: 
  - `src/components`: Contains all React components.
  - `src/redux`: State management using Redux Toolkit.
  - `src/hooks`: Custom hooks for optimization.
  
- **Backend**:
  - `routes`: Defines API endpoints.
  - `models`: Mongoose models for MongoDB.
  - `controllers`: Business logic for API routes.
  - `middleware`: Custom middleware, including CORS and authentication.

## Operating Instructions

### Register as a Regular User

1. Go to the [Home Page](https://liors-ecommerce-app.onrender.com/login).
2. Click on the "Register" link to create a new account.
3. Fill in your details and submit the registration form.
4. Log in using your new credentials.

### Guest Mode for One-Time Look

1. Go to the [Home Page](https://liors-ecommerce-app.onrender.com/login).
2. Use the guest mode option to explore the application without creating an account.
3. Note: Some features may be restricted in guest mode.

### Admin Mode

1. Go to the [Home Page](https://liors-ecommerce-app.onrender.com/login).
2. Log in using the following credentials:
   - **Username**: `admin`
   - **Password**: `admin`
3. Access the admin panel to manage products, categories, and users.
