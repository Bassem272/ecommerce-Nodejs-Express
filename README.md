

# User Routes

## Register a new user

- **Endpoint:** `/register`
- **Method:** `POST`
- **Parameters:**
  - `name`: User's name
  - `email`: User's email
  - `password`: User's password
- **Response:**
  - `201 Created`: User registered successfully
  - `400 Bad Request`: User already exists

## Verify user's email

- **Endpoint:** `/verify-email`
- **Method:** `POST`
- **Parameters:**
  - `code`: Verification code
- **Response:**
  - `200 OK`: Email verified successfully
  - `400 Bad Request`: Invalid verification code

## Reset user's password

- **Endpoint:** `/reset-password`
- **Method:** `POST`
- **Parameters:**
  - `email`: User's email
- **Response:**
  - `200 OK`: Email sent for password reset
  - `400 Bad Request`: Invalid email

## User login

- **Endpoint:** `/login`
- **Method:** `POST`
- **Parameters:**
  - `email`: User's email
  - `password`: User's password
- **Response:**
  - `200 OK`: Login successful
  - `400 Bad Request`: Invalid email or password

## Forgot password

- **Endpoint:** `/forgot-password`
- **Method:** `POST`
- **Authorization:** User authentication token
- **Parameters:**
  - `email`: User's email
- **Response:**
  - `200 OK`: Password reset email sent
  - `401 Unauthorized`: User not authenticated
  - `403 Forbidden`: User does not have permission

## User logout

- **Endpoint:** `/logout`
- **Method:** `GET`
- **Authorization:** User authentication token
- **Response:**
  - `200 OK`: Logout successful
  - `401 Unauthorized`: User not authenticated
  - `403 Forbidden`: User does not have permission

## Get user profile

- **Endpoint:** `/profile`
- **Method:** `GET`
- **Authorization:** User authentication token
- **Response:**
  - `200 OK`: User profile retrieved successfully
  - `401 Unauthorized`: User not authenticated
  - `403 Forbidden`: User does not have permission

## Update user's address

- **Endpoint:** `/update-address`
- **Method:** `PUT`
- **Authorization:** User authentication token
- **Parameters:**
  - `address`: User's updated address
- **Response:**
  - `200 OK`: Address updated successfully
  - `401 Unauthorized`: User not authenticated
  - `403 Forbidden`: User does not have permission


# Product Routes

## Get all products

- **Endpoint:** `/products`
- **Method:** `GET`
- **Authorization:** User authentication token
- **Response:**
  - `200 OK`: Products retrieved successfully
  - `401 Unauthorized`: User not authenticated
  - `403 Forbidden`: User does not have permission
  - `404 Not Found`: No products found

## Get a specific product

- **Endpoint:** `/products/:id`
- **Method:** `GET`
- **Authorization:** User authentication token
- **Parameters:**
  - `id`: Product ID
- **Response:**
  - `200 OK`: Product retrieved successfully
  - `401 Unauthorized`: User not authenticated
  - `403 Forbidden`: User does not have permission
  - `404 Not Found`: Product not found

## Search for products

- **Endpoint:** `/search`
- **Method:** `GET`
- **Authorization:** User authentication token
- **Parameters:**
  - `name`: Product name (optional)
  - `category`: Product category (optional)
  - `maxPrice`: Maximum product price (optional)
  - `minPrice`: Minimum product price (optional)
- **Response:**
  - `200 OK`: Products retrieved successfully
  - `401 Unauthorized`: User not authenticated
  - `403 Forbidden`: User does not have permission
  - `404 Not Found`: No products found

# Admin Routes

## Add a new product

- **Endpoint:** `/products`
- **Method:** `POST`
- **Authorization:** Admin authentication token
- **Parameters:**
  - `name`: Product name
  - `price`: Product price
  - `description`: Product description
  - `category`: Product category
  - `image`: Product image URL
  - `quantity`: Product quantity
- **Response:**
  - `201 Created`: Product added successfully
  - `401 Unauthorized`: Admin not authenticated
  - `403 Forbidden`: Admin does not have permission
  - `500 Internal Server Error`: Error adding product

## Get all products (Admin)

- **Endpoint:** `/products`
- **Method:** `GET`
- **Authorization:** Admin authentication token
- **Response:**
  - `200 OK`: Products retrieved successfully
  - `401 Unauthorized`: Admin not authenticated
  - `403 Forbidden`: Admin does not have permission
  - `404 Not Found`: No products found

## Get all users

- **Endpoint:** `/users`
- **Method:** `GET`
- **Authorization:** Admin authentication token
- **Response:**
  - `200 OK`: Users retrieved successfully
  - `401 Unauthorized`: Admin not authenticated
  - `403 Forbidden`: Admin does not have permission
  - `404 Not Found`: No users found

## Get all orders

- **Endpoint:** `/orders`
- **Method:** `GET`
- **Authorization:** Admin authentication token
- **Response:**
  - `200 OK`: Orders retrieved successfully
  - `401 Unauthorized`: Admin not authenticated
  - `403 Forbidden`: Admin does not have permission
  - `404 Not Found`: No orders found

## Get details of a specific order

- **Endpoint:** `/orders/:id`
- **Method:** `GET`
- **Authorization:** Admin authentication token
- **Parameters:**
  - `id`: Order ID
- **Response:**
  - `200 OK`: Order details retrieved successfully
  - `401 Unauthorized`: Admin not authenticated
  - `403 Forbidden`: Admin does not have permission
  - `404 Not Found`: Order not found

## Get details of a specific product (Admin)

- **Endpoint:** `/products/:id`
- **Method:** `GET`
- **Authorization:** Admin authentication token
- **Parameters:**
  - `id`: Product ID
- **Response:**
  - `200 OK`: Product details retrieved successfully
  - `401 Unauthorized`: Admin not authenticated
  - `403 Forbidden`: Admin does not have permission
  - `404 Not Found`: Product not found

## Get details of a specific user

- **Endpoint:** `/users/:id`
- **Method:** `GET`
- **Authorization:** Admin authentication token
- **Parameters:**
  - `id`: User ID
- **Response:**
  - `200 OK`: User details retrieved successfully
  - `401 Unauthorized`: Admin not authenticated
  - `403 Forbidden`: Admin does not have permission
  - `404 Not Found`: User not found

## Get total number of products

- **Endpoint:** `/total-products`
- **Method:** `GET`
- **Authorization:** Admin authentication token
- **Response:**
  - `200 OK`: Total products count retrieved successfully
  - `401 Unauthorized`: Admin not authenticated
  - `403 Forbidden`: Admin does not have permission
  - `500 Internal Server Error`: Error retrieving total products count

## Get total number of users

- **Endpoint:** `/total-users`
- **Method:** `GET`
- **Authorization:** Admin authentication token
- **Response:**
  - `200 OK`: Total users count retrieved successfully
  - `401 Unauthorized`: Admin not authenticated
  - `403 Forbidden`: Admin does not have permission
  - `500 Internal Server Error`: Error retrieving total users count

## Get total number of orders

- **Endpoint:** `/total-orders`
- **Method:** `GET`
- **Authorization:** Admin authentication token
- **Response:**
  - `200 OK`: Total orders count retrieved successfully
  - `401 Unauthorized`: Admin not authenticated
  - `403 Forbidden`: Admin does not have permission
  - `500 Internal Server Error`: Error retrieving total orders count

## Change a user to admin

- **Endpoint:** `/change-user-to-admin/:userId`
- **Method:** `POST`
- **Authorization:** Admin authentication token
- **Parameters:**
  - `userId`: User ID to be changed to admin
- **Response:**
  - `201 Created`: User role changed to admin successfully
  - `401 Unauthorized`: Admin not authenticated
  - `403 Forbidden`: Admin does not have permission
  - `404 Not Found`: User not found

## Get orders within a date range

- **Endpoint:** `/orders-in-range`
- **Method:** `GET`
- **Authorization:** Admin authentication token
- **Parameters:**
  - `startDate`: Start date of the range
  - `endDate`: End date of the range
- **Response:**
  - `200 OK`: Orders within the date range retrieved successfully
  - `401 Unauthorized`: Admin not authenticated
  - `403 Forbidden`: Admin does not have permission
  - `500 Internal Server Error`: Error retrieving orders within the date range

