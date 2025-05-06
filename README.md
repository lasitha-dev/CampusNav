# Campus Navigation Application

A MERN stack application to help new students find buildings and halls for their lectures or exams.

## Features

- **Buildings Management**: Add, edit, and delete buildings with images, locations, and descriptions
- **Halls Management**: Add, edit, and delete lecture halls with building selection, capacity, floor details, and images
- **User-Friendly Dashboard**: Homepage with building listings that link to their respective halls
- **Search and Filter**: Search buildings by name, location or description; filter halls by building
- **Responsive Design**: Works on all devices thanks to Material UI

## Tech Stack

- **Frontend**: React.js with Material UI
- **Backend**: Node.js with Express
- **Database**: MongoDB (Cloud)
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: React Router v6
- **HTTP Requests**: Axios

## Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/campusnav.git
cd campusnav
```

2. Install dependencies for both server and client:
```
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Configure Environment Variables:
   - Navigate to the `server` directory
   - Edit the `.env` file with your MongoDB connection string
   - Replace `<username>` and `<password>` with your MongoDB Atlas credentials

## Running the Application

1. Start the server (backend):
```
cd server
npm run dev
```

2. In a new terminal, start the client (frontend):
```
cd client
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Application Structure

### Backend

- **Models**: Building and Hall schemas
- **Controllers**: Business logic for buildings and halls
- **Routes**: API endpoints for CRUD operations
- **Config**: MongoDB connection and environment variables

### Frontend

- **Components**: Reusable UI components (Navbar, BuildingCard, HallCard)
- **Pages**: Main application views (Home, Buildings, Halls, BuildingHalls)
- **Services**: API calls with axios
- **Theme**: Custom Material UI theme configuration

## API Endpoints

### Buildings

- `GET /api/buildings` - Get all buildings
- `GET /api/buildings/:id` - Get a specific building
- `POST /api/buildings` - Create a new building
- `PUT /api/buildings/:id` - Update an existing building
- `DELETE /api/buildings/:id` - Delete a building

### Halls

- `GET /api/halls` - Get all halls
- `GET /api/halls/:id` - Get a specific hall
- `GET /api/halls/building/:buildingId` - Get all halls for a specific building
- `POST /api/halls` - Create a new hall
- `PUT /api/halls/:id` - Update an existing hall
- `DELETE /api/halls/:id` - Delete a hall

## Future Enhancements

- User authentication and authorization
- Mobile app version using React Native
- Interactive campus map with building locations
- QR codes for buildings and halls to quickly access information
- Class schedules integration
- Real-time occupancy indicators for halls 