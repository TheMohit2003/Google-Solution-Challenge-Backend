# Google solution challenge 2024

<p align="center">
  <img src="./assets/logo1.png" />

<h2 align="center">Servimatch , a Service Marketplace Platform</h2>

</p>

## Introduction

This Service Marketplace Platform connects service providers (vendors) with customers (issuers) who need services. It supports service listings, bidding, and interest expression functionalities.

![alt text](/assets/image.png)

## Features

-   **User Authentication**: Secure login and registration system for users with roles (Issuer and Vendor).
-   **Service Listings**: Issuers can create listings for services they need, specifying details such as service descriptions, amounts, and dates.
-   **Bidding System**: Vendors can place bids on services, indicating their interest and proposed terms.
-   **Interest Expression**: Vendors can express interest in services, and issuers can view interested vendors.

## Project Architecture

-   **Backend**: Node.js with Express.js framework, providing a RESTful API.
-   **Database**: Utilizes Prisma ORM with PostgreSQL for data management.
-   **Authentication**: Uses JSON Web Tokens (JWT) for handling user authentication and protecting routes.

## Dependencies

-   **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
-   **Express.js**: Web application framework for Node.js, designed for building web applications and APIs.
-   **Prisma**: Next-generation ORM for Node.js , used for database operations.
-   **PostgreSQL**: Open-source relational database system.
-   **JWT**: For secure user authentication.

## Setup and Installation

1. **Clone the repository**

```bash
git clone https://github.com/TheMohit2003/Google-Solution-Challenge-Backend.git
cd Google-Solution-Challenge-Backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up the database**

Ensure you have PostgreSQL installed and running. Create a database for the project and update the `.env` file with your `DATABASE_URL`.

4. **Add jwt secret key**

Add jwt secret to the `.env` file

5. **Run Prisma migrations**

```bash
npx prisma migrate dev
```

5. **Start the server**

```bash
npm start
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

-   `DATABASE_URL`: Your PostgreSQL database connection string.
-   `JWT_SECRET`: A secret key for JWT token generation and verification.
-   `PORT`: (Optional) Port for the server to listen on.

## API Documentation

Refer to the ![openapi.yaml](./docs/api/openapi.yaml) file for OpenAPI (Swagger) documentation of the API endpoints. You can upload this file to tools like Swagger UI or Bump.sh to visualize and interact with the API's resources.

## Contributing

Contributions are welcome! Please read our contributing guidelines for how to propose bugfixes, features, and submit pull requests.

## License
