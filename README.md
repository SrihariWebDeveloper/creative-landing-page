# Creative Landing Page

A full-stack creative landing page project with a React + Vite frontend and an Express + MongoDB + Cloudinary backend.

## Project Overview

This project is a creative portfolio or personal-brand landing page with:

- A hero section with a dynamic name/title rendering
- About / intro content
- Showcase cards
- Gallery image thumbnails and main preview
- Admin-style or content-editing flow for updating the landing page content
- Cloudinary image upload support
- MongoDB persistence for the landing page document

## Project Structure

```text
creative-landing-page/
├── client/               # React + Vite frontend
│   ├── src/              # UI components, pages, styling, services
│   ├── public/           # Static public assets
│   └── package.json      # Frontend dependency scripts
├── server/               # Express + Mongoose API
│   ├── config/           # MongoDB connection setup
│   ├── controllers/      # Content CRUD logic
│   ├── models/           # Mongoose content model
│   ├── routes/           # API route definitions
│   └── server.js         # Express server entry
├── postman/              # Postman API collection export
└── README.md             # Project documentation
```

## Tech Stack

### Frontend

- React
- Vite
- React Router
- React Toastify
- CSS styling

### Backend

- Node.js
- Express
- Mongoose
- MongoDB
- Cloudinary
- Multer

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- MongoDB running locally or an accessible MongoDB URI
- A Cloudinary account and valid cloud credentials
- A `.env` file configured for the server

## Environment Variables

Create a `.env` file inside the `server/` folder with values such as:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/creativeLanding
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Backend Setup

Go to the server directory:

```bash
cd server
npm install
```

Run the server:

```bash
npm run dev
```

Or start normally:

```bash
npm start
```

The API server will run on:

```text
http://localhost:5000
```

## Frontend Setup

Go to the client directory:

```bash
cd client
npm install
```

Run the Vite development server:

```bash
npm run dev
```

Build the production files:

```bash
npm run build
```

The UI will be available locally through Vite at:

```text
http://localhost:5173
```

## API Endpoints

### GET

```http
GET /api/content
```

Returns the stored landing-page content document.

### POST

```http
POST /api/content
```

Creates the initial landing-page content document.

### PUT

```http
PUT /api/content/:id
```

Updates the existing landing-page content document by ID.

### Upload

```http
POST /api/upload
```

Uploads an image file using `multer` and stores it in Cloudinary.

## Example Content Document

```json
{
  "name": "JENNY",
  "aboutCompany": "We create modern digital experiences through creativity, technology and thoughtful design.",
  "whyChoose": "We focus on quality, creativity and meaningful experiences that make every project stand out.",
  "heroImage": "https://res.cloudinary.com/.../hero.png",
  "galleryImages": [
    "https://res.cloudinary.com/.../image1.jpg",
    "https://res.cloudinary.com/.../image2.jpg"
  ],
  "introImages": [
    "https://res.cloudinary.com/.../intro1.jpg"
  ],
  "showcaseImages": [
    "https://res.cloudinary.com/.../showcase1.jpg"
  ]
}
```

## Postman Collection

A Postman API collection export has been added under:

```text
postman/creative_landing_page_api_collection.json
```

## Production Build

To generate the production frontend files:

```bash
cd client
npm run build
```

The build output is written to:

```text
client/dist/
```

## Notes

- Uploaded images are stored via Cloudinary and the returned `secure_url` is saved in the content object.
- The gallery and image fallback paths should point to valid local image assets or Cloudinary URLs.
- Ensure the backend server is running before making API requests from the client.
