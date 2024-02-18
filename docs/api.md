# API Documentation

## Overview
This document outlines the API endpoints for the ServiMatch platform, including request and response formats.

### Authentication

- **POST /auth/register**
  - **Description**: Register a new user.
  - **Payload**:
    ```json
    {
      "email": "user@example.com",
      "password": "password",
      "name": "John Doe"
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "message": "User registered successfully.",
      "data": {
        "id": "user_id",
        "email": "user@example.com",
        "name": "John Doe"
      }
    }
    ```

- **POST /auth/login**
  - **Description**: Authenticate a user and return a token.
  - **Payload**:
    ```json
    {
      "email": "user@example.com",
      "password": "password"
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "message": "Login successful.",
      "token": "bearer_token"
    }
    ```

### Bids

- **POST /bids**
  - **Description**: Create a new bid by an issuer.
  - **Payload**:
    ```json
    {
      "title": "Bid Title",
      "description": "Bid Description",
      "status": "OPEN"
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "message": "Bid created successfully.",
      "data": {
        "id": "bid_id",
        "title": "Bid Title",
        "description": "Bid Description",
        "status": "OPEN"
      }
    }
    ```

- **GET /bids**
  - **Description**: List all bids available for vendors to view and apply.
  - **Response**:
    ```json
    {
      "status": "success",
      "data": [
        {
          "id": "bid_id",
          "title": "Bid Title",
          "description": "Bid Description",
          "status": "OPEN"
        }
      ]
    }
    ```

### Applications

- **POST /bids/{bidId}/apply**
  - **Description**: Apply to a specific bid (for vendors).
  - **Payload**:
    ```json
    {
      "vendorId": "vendor_id"
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "message": "Application submitted successfully."
    }
    ```

### Messages

- **POST /messages**
  - **Description**: Send a message between issuer and vendor.
  - **Payload**:
    ```json
    {
      "senderId": "user_id",
      "receiverId": "user_id_receiver",
      "content": "Hello, I'm interested in your bid."
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "message": "Message sent successfully."
    }
    ```

- **GET /messages/{conversationId}**
  - **Description**: Retrieve messages in a conversation.
  - **Response**:
    ```json
    {
      "status": "success",
      "data": [
        {
          "id": "message_id",
          "senderId": "user_id",
          "receiverId": "user_id_receiver",
          "content": "Hello, I'm interested in your bid.",
          "createdAt": "timestamp"
        }
      ]
    }
    ```

