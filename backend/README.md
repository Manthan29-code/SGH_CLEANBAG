# SGH CleanBag Backend API Documentation

This document provides detailed information about all available endpoints in the SGH CleanBag backend API.

## Response Format

All successful responses follow this general format:
```json
{
  "success": true,
  "data": {
    // Response data specific to the endpoint
  },
  "message": "Optional success message"
}
```

Error responses follow this format:
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {} // Optional additional error details
  }
}
```

## Authentication Endpoints

### POST /api/auth/register
Register a new user.
- **Access**: Public
- **Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "resident" | "garbageCollector" | "admin"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string",
      "createdAt": "ISO date string"
    },
    "token": "JWT token string"
  }
}
```

### POST /api/auth/login
Login user and get authentication token.
- **Access**: Public
- **Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string"
    },
    "token": "JWT token string"
  }
}
```

### GET /api/auth/logout
Logout user and invalidate token.
- **Access**: Protected (requires authentication)
- **Response**:
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

## User Endpoints

### GET /api/users/profile
Get the profile of the currently logged-in user.
- **Access**: Protected (requires authentication)
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "phone": "string",
    "address": "string",
    "createdAt": "ISO date string",
    "updatedAt": "ISO date string"
  }
}
```

### PUT /api/users/profile
Update the profile of the currently logged-in user.
- **Access**: Protected (requires authentication)
- **Request Body**:
```json
{
  "name": "string",
  "phone": "string",
  "address": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "phone": "string",
    "address": "string",
    "updatedAt": "ISO date string"
  }
}
```

### GET /api/users
Get all users (admin only).
- **Access**: Protected (requires admin authentication)
- **Response**:
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "string",
        "name": "string",
        "email": "string",
        "role": "string",
        "phone": "string",
        "address": "string",
        "createdAt": "ISO date string"
      }
    ],
    "total": "number",
    "page": "number",
    "limit": "number"
  }
}
```

### GET /api/users/:id
Get user by ID (admin only).
- **Access**: Protected (requires admin authentication)
- **Response**: User object

### PUT /api/users/:id
Update user by ID (admin only).
- **Access**: Protected (requires admin authentication)
- **Request Body**: Updated user details
- **Response**: Updated user object

### DELETE /api/users/:id
Delete user by ID (admin only).
- **Access**: Protected (requires admin authentication)
- **Response**: Success message

## Collection Endpoints

### POST /api/collections
Create a new collection request.
- **Access**: Protected (requires authentication)
- **Request Body**:
```json
{
  "location": {
    "type": "Point",
    "coordinates": ["number", "number"] // [longitude, latitude]
  },
  "address": "string",
  "description": "string",
  "wasteType": "string",
  "quantity": "number",
  "preferredDate": "ISO date string"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "userId": "string",
    "location": {
      "type": "Point",
      "coordinates": ["number", "number"]
    },
    "address": "string",
    "description": "string",
    "wasteType": "string",
    "quantity": "number",
    "status": "pending",
    "preferredDate": "ISO date string",
    "createdAt": "ISO date string"
  }
}
```

### GET /api/collections
Get all collections.
- **Access**: Protected (requires authentication)
- **Query Parameters**:
  - `page`: number (default: 1)
  - `limit`: number (default: 10)
  - `status`: string (optional)
- **Response**:
```json
{
  "success": true,
  "data": {
    "collections": [
      {
        "id": "string",
        "userId": "string",
        "location": {
          "type": "Point",
          "coordinates": ["number", "number"]
        },
        "address": "string",
        "description": "string",
        "wasteType": "string",
        "quantity": "number",
        "status": "string",
        "preferredDate": "ISO date string",
        "createdAt": "ISO date string"
      }
    ],
    "total": "number",
    "page": "number",
    "limit": "number"
  }
}
```

### GET /api/collections/nearby
Get nearby collections based on location.
- **Access**: Protected (requires authentication)
- **Response**: Array of nearby collection objects

### GET /api/collections/:id
Get collection by ID.
- **Access**: Protected (requires authentication)
- **Response**: Collection object

### PUT /api/collections/:id
Update collection details.
- **Access**: Protected (requires authentication)
- **Request Body**: Updated collection details
- **Response**: Updated collection object

### DELETE /api/collections/:id
Delete collection (admin only).
- **Access**: Protected (requires admin authentication)
- **Response**: Success message

### PUT /api/collections/:id/assign
Assign a collector to a collection (admin only).
- **Access**: Protected (requires admin authentication)
- **Request Body**: Collector assignment details
- **Response**: Updated collection object

## Report Endpoints

### POST /api/reports
Create a new report (garbage collector only).
- **Access**: Protected (requires garbage collector authentication)
- **Request Body**:
```json
{
  "collectionId": "string",
  "status": "completed" | "cancelled",
  "notes": "string",
  "completedAt": "ISO date string",
  "photos": ["string"] // Array of photo URLs
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "collectionId": "string",
    "collectorId": "string",
    "status": "string",
    "notes": "string",
    "completedAt": "ISO date string",
    "photos": ["string"],
    "createdAt": "ISO date string"
  }
}
```

### GET /api/reports
Get all reports.
- **Access**: Protected (requires authentication)
- **Response**: Array of report objects

### GET /api/reports/collector
Get reports for the logged-in collector.
- **Access**: Protected (requires garbage collector authentication)
- **Response**: Array of collector's report objects

### GET /api/reports/:id
Get report by ID.
- **Access**: Protected (requires authentication)
- **Response**: Report object

### PUT /api/reports/:id
Update report (admin only).
- **Access**: Protected (requires admin authentication)
- **Request Body**: Updated report details
- **Response**: Updated report object

### DELETE /api/reports/:id
Delete report (admin only).
- **Access**: Protected (requires admin authentication)
- **Response**: Success message

## Route Endpoints

### POST /api/routes
Create a new route (admin only).
- **Access**: Protected (requires admin authentication)
- **Request Body**:
```json
{
  "name": "string",
  "description": "string",
  "collectorId": "string",
  "collections": ["string"], // Array of collection IDs
  "startTime": "ISO date string",
  "endTime": "ISO date string"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "collectorId": "string",
    "collections": ["string"],
    "startTime": "ISO date string",
    "endTime": "ISO date string",
    "status": "active",
    "createdAt": "ISO date string"
  }
}
```

### GET /api/routes
Get all routes.
- **Access**: Protected (requires authentication)
- **Response**: Array of route objects

### GET /api/routes/collector
Get routes for the logged-in collector.
- **Access**: Protected (requires garbage collector authentication)
- **Response**: Array of collector's route objects

### GET /api/routes/:id
Get route by ID.
- **Access**: Protected (requires authentication)
- **Response**: Route object

### PUT /api/routes/:id
Update route details.
- **Access**: Protected (requires authentication)
- **Request Body**: Updated route details
- **Response**: Updated route object

### DELETE /api/routes/:id
Delete route (admin only).
- **Access**: Protected (requires admin authentication)
- **Response**: Success message

## Schedule Endpoints

### POST /api/schedules
Create a new schedule (admin only).
- **Access**: Protected (requires admin authentication)
- **Request Body**:
```json
{
  "routeId": "string",
  "dayOfWeek": "number", // 0-6 (Sunday-Saturday)
  "startTime": "string", // HH:mm format
  "endTime": "string", // HH:mm format
  "isActive": "boolean"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "routeId": "string",
    "dayOfWeek": "number",
    "startTime": "string",
    "endTime": "string",
    "isActive": "boolean",
    "createdAt": "ISO date string"
  }
}
```

### GET /api/schedules
Get all schedules.
- **Access**: Protected (requires authentication)
- **Response**: Array of schedule objects

### GET /api/schedules/collector
Get schedules for the logged-in collector.
- **Access**: Protected (requires garbage collector authentication)
- **Response**: Array of collector's schedule objects

### GET /api/schedules/:id
Get schedule by ID.
- **Access**: Protected (requires authentication)
- **Response**: Schedule object

### PUT /api/schedules/:id
Update schedule details.
- **Access**: Protected (requires authentication)
- **Request Body**: Updated schedule details
- **Response**: Updated schedule object

### DELETE /api/schedules/:id
Delete schedule (admin only).
- **Access**: Protected (requires admin authentication)
- **Response**: Success message

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Role-Based Access Control

The API implements role-based access control with the following roles:
- **Admin**: Full access to all endpoints
- **Garbage Collector**: Access to collection and report management
- **Resident**: Access to create collection requests and view their own data

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "message": "Invalid input data",
    "code": "VALIDATION_ERROR",
    "details": {
      "field": "Error message for specific field"
    }
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "message": "Authentication required",
    "code": "UNAUTHORIZED"
  }
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "message": "Insufficient permissions",
    "code": "FORBIDDEN"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "message": "Resource not found",
    "code": "NOT_FOUND"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "message": "Internal server error",
    "code": "INTERNAL_ERROR"
  }
}
``` 