# Bicycle Store Application

## Overview

Welcome to the **Bicycle Store** application, a robust e-commerce platform designed to provide a seamless shopping experience for bicycle enthusiasts. The application allows customers to explore a variety of bicycles, place secure orders, and manage their accounts. For administrators, the platform provides an intuitive dashboard to manage users, products, and orders.

### Key Features

- **Role-Based Authentication**  
  Secure user registration and login with role-based access control (Customer, Admin).
- **User Management**  
  Admins can create, manage, and delete user accounts.

- **Product Management**  
  Admins can manage product inventory, including adding, updating, and deleting bicycles.

- **Order Management**  
  Customers can place orders, and admins can manage and track those orders.

- **Payment Integration**  
  Secure payments via Stripe.

- **Responsive Design**  
  Fully responsive design, ensuring an optimal experience on all devices.

- **User-Friendly Interface**  
  Simple navigation, intuitive forms, and clear feedback for users.

---

## Live Demo

You can explore the live version of the application here:  
**[Bicycle Store Live Demo](https://spinzo.vercel.app/)**

---

## Installation Guide

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (Local or MongoDB Atlas)

### Clone the Repository

To set up the project locally, clone both the frontend and backend repositories:

```bash
git clone https://github.com/md-nahiduzzaman/bicycle-store-frontend
git clone https://github.com/md-nahiduzzaman/bicycle-store
```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd bicycle-store-backend
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and configure the following variables:

   ```bash
   MONGO_URI=your_mongo_database_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

   The backend server will run at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd bicycle-store-frontend
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm start
   ```

   The frontend will run at `http://localhost:3000`.

---

## Admin Access

To log in as an admin, use the following credentials:

- **Email**: `admin@spinzo.com`
- **Password**: `123456`

---

## Technology Stack

This project utilizes the following technologies:

- **Frontend**: React, Redux, TypeScript, Tailwind CSS, Shadcn Ui
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Payment Gateway**: Stripe
- **Deployment**: Vercel (Frontend + Backend)

---

## Contribution

We welcome contributions to enhance the functionality of the Bicycle Store. Please fork the repository, create a feature branch, and submit a pull request with a clear description of the changes.

Ensure all code adheres to the project's coding standards and includes relevant documentation.
