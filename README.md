# Node.js Movie Review Service

This is a simple crud movie review service built with Node.js, Express, and Sequelize, using TypeScript. User with be able to create, update, and delete movie reviews.
The auth services is provided in a separate repo namely behemoth/nodejs-auth-service. Since the auth use asymmetric encryption, the private key is stored in the auth service and the public key is used in this service.

## Features

- Review Crud (`api/review/{movieId}`,`/api/review/add`, `/api/movie/update`, `/api/movie/delete`)

## Technologies Used

- **Backend:** Node.js, Express.js
- **ORM:** Sequelize
- **Database:** SQLite (in-memory)
- **Language:** TypeScript
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **Monitoring:** Prometheus (prom-client)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd behemoth-nodejs-review-service
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Configuration

Create a `.env` file in the root of the project and add the following environment variables.

```
PORT=3000
```

### Generating RSA Keys

This project uses the RS256 algorithm for signing JWTs, which requires a private/public key pair. A script is provided to generate keys is in the auth service repo. You have to copy the public key to this service.

## Available Scripts

In the project directory, you can run the following commands:

### `npm run dev`

Runs the app in development mode using `ts-node` and `nodemon`. The server will automatically restart if you make changes to the code.

### `npm run build`

Builds the app for production to the `dist` folder. It transpiles TypeScript to JavaScript.

### `npm start`

Runs the compiled app in production mode. Make sure you have run `npm run build` first.

## API Endpoints

### Authentication

### Monitoring

- **Prometheus Metrics**
  - **URL:** `/metrics`
  - **Method:** `GET`
  - **Description:** Exposes application metrics in a format that can be scraped by a Prometheus server.
