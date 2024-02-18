# ServiMatch Backend API Documentation

## Introduction

This documentation outlines the backend API endpoints for the ServiMatch platform, designed to facilitate connections between service issuers and contractors through a comprehensive suite of functionalities including user management, contract bidding, and communication.

## Authentication

### Register

- **Endpoint**: `POST /auth/register`
- **Description**: Register a new user account.
- **Payload**: `{ "username": "string", "password": "string", "email": "string", "role": "issuer|vendor" }`

### Login

- **Endpoint**: `POST /auth/login`
- **Description**: Authenticate a user and return a session token.
- **Payload**: `{ "email": "string", "password": "string" }`

## User Management

### Get User Profile

- **Endpoint**: `GET /user/profile`
- **Description**: Retrieve the profile information of the current user.

### Update User Profile

- **Endpoint**: `PUT /user/profile`
- **Description**: Update the profile information of the current user.
- **Payload**: `{ "name": "string", "contactInfo": {}, ... }`

## Contract/Bid Management

### Create Bid

- **Endpoint**: `POST /bids`
- **Description**: Allows an issuer to create a new bid.
- **Payload**: `{ "title": "string", "description": "string", "deadline": "datetime", ... }`

### List Bids

- **Endpoint**: `GET /bids`
- **Description**: Retrieves a list of available bids for vendors to view and apply.

### Bid Details

- **Endpoint**: `GET /bids/{id}`
- **Description**: Retrieves detailed information about a specific bid.

### Apply to Bid

- **Endpoint**: `POST /bids/{id}/apply`
- **Description**: Allows a vendor to apply to a specific bid.
- **Payload**: `{ "proposal": "string", "estimatedCost": "number", ... }`

## Communication

### Send Message

- **Endpoint**: `POST /messages`
- **Description**: Send a message between an issuer and a vendor.
- **Payload**: `{ "recipientId": "string", "message": "string" }`

### Retrieve Messages

- **Endpoint**: `GET /messages`
- **Description**: Retrieve messages between the current user and other users.

## Reviews and Ratings

### Submit Review

- **Endpoint**: `POST /reviews`
- **Description**: Submit a review for a contractor or service issuer.
- **Payload**: `{ "userId": "string", "rating": "number", "comment": "string" }`

## Notifications

### Get Notifications

- **Endpoint**: `GET /notifications`
- **Description**: Retrieve notifications for the logged-in user.

## Live Bidding

### WebSocket Endpoint

- **WebSocket**: `WS /bids/{id}/live`
- **Description**: Real-time bidding actions for a specific bid.

---

Ensure your API documentation is kept up-to-date with any changes to the endpoints or payload structures. This README should serve as a solid foundation for developers integrating with the ServiMatch backend services.
