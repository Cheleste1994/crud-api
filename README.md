# CRUD API Implementation

This project implements a simple CRUD (Create, Read, Update, Delete) API using an in-memory database. The API allows managing user records with basic endpoints.

## Implementation Details

1. **Endpoints**:
    - `GET api/users`: Retrieve all users.
    - `GET api/users/{userId}`: Retrieve user by ID.
    - `POST api/users`: Create a new user.
    - `PUT api/users/{userId}`: Update an existing user.
    - `DELETE api/users/{userId}`: Delete a user.

2. **User Properties**:
    - `id`: Unique identifier generated on the server.
    - `username`: User's name (required).
    - `age`: User's age (required).
    - `hobbies`: User's hobbies (an array of strings, required).

3. **Error Handling**:
    - Proper handling for non-existing endpoints.
    - Handling of server-side errors with appropriate status codes and messages.

4. **Configuration**:
    - Port configuration stored in a `.env` file.

5. **Application Modes**:
    - Development mode using `ts-node-dev`.
    - Production mode with a build process using `webpack`.

6. **Testing**:
    - Includes at least 3 test scenarios covering CRUD operations.
    - Tests for retrieving, creating, updating, and deleting user records.

7. **Horizontal Scaling**:
    - Multi-instance setup using Node.js Cluster API.
    - Load balancer distributing requests across worker instances.
    - Consistent database state between different workers.

## Usage

1. **Installation**:
    ```bash
    npm install
    ```

2. **Development**:
    ```bash
    npm run start:dev
    ```

3. **Production**:
    ```bash
    npm run start:prod
    ```

4. **Multi-instance**:
    ```bash
    npm run start:multi
    ```

## Testing

Run tests using:
```bash
npm test
```
