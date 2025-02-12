# E-Book Portal Backend

This is the backend API for the E-Book Portal project, providing endpoints for managing books, users, and authentication.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone this repository

```bash
git clone https://github.com/yourusername/ebook-portal-backend.git
cd ebook-portal-backend
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

## License

This project is licensed under the MIT License.
