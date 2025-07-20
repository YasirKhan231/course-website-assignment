# Course Platform with Payment Integration

![Platform Screenshot](https://res.cloudinary.com/demo/image/upload/v1634567890/platform-screenshot.jpg)

## Table of Contents

- [imagess](#imagess)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## imagess

- User authentication (JWT)
- Course enrollment
- Razorpay payment processing
- Admin dashboard
- Responsive design

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Payment**: Razorpay API

## Installation

```bash
git clone https://github.com/YasirKhan231/course-website-assignment.git
cd course-website-assignment
cd server && npm install
cd ../client && npm install
```

BACKEND ENV

# Server Configuration

PORT=5000

# Database

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/courses?retryWrites=true&w=majority

# Razorpay

RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_SECRET=yyyyyyyyyyyyyyyyyyyy

FRONTEDND ENV

# API Configuration

VITE_BACKEND_URL=http://localhost:5000/api

# Razorpay

VITE_RAZORPAY_KEY=rzp_test_xxxxxxxxxxxx

# Cloudinary
