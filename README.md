# E-Book Portal Backend

This is the backend API for the E-Book Portal project, providing endpoints for managing books, users, and authentication.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone this repository

```bash
git clone https://github.com/iamabraryeasir/E-Book-Portal-Backend.git
cd E-Book-Portal-Backend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file with the following variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server

```bash
npm start
```

## Postman Collection

A Postman collection is available for testing the API endpoints. You can import it into Postman to get started quickly.

### Importing the Collection

1. Open Postman.
2. Click on the "Import" button.
3. Select the file `postman_collection/E-Book Portal Backend.postman_collection.json` from the project's root directory.
4. Once imported, you will see the collection named "E-Book Portal Backend" in your Postman workspace.

### Using the Collection

- The collection includes requests for all available API endpoints.
- Make sure to set the `base_url` environment variable in Postman to your API's base URL (e.g., `http://localhost:5000/api`).
- For endpoints that require authentication, make sure to include the JWT token in the Authorization header as described in the [Authentication](#authentication) section.

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register new user
  - Body: `{ name, email, password }`
- POST `/api/auth/login` - Login user
  - Body: `{ email, password }`

### Books

- GET `/api/books` - Get all books
- GET `/api/books/:id` - Get book by ID
- POST `/api/books` - Add new book (Admin only)
  - Body: `{ title, author, description, price, category }`
- PUT `/api/books/:id` - Update book (Admin only)
- DELETE `/api/books/:id` - Delete book (Admin only)

### Users

- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update user profile
- GET `/api/users/purchases` - Get user's purchased books

## Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## Development

```bash
npm run dev # Starts server in development mode
npm test # Runs tests
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Developer

- **Name:** Abrar Yeasir
- **GitHub:** [iamabraryeasir](https://github.com/iamabraryeasir)
- **Email:** [iamabraryeasir@gmail.com](mailto:iamabraryeasir@gmail.com)

## License

This project is licensed under the MIT License.
