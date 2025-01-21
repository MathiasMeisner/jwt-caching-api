# JWT Caching API
A lightweight and optimized authentication API using **JWT authentication, in-memory caching, and PostgreSQL**.

## Features
- User authentication with JWT (register, login, and role-based access)  
- In-memory caching for optimized database performance  
- Automatic cache invalidation when data updates  
- PostgreSQL with optimized queries and indexing  

## Installation
1. **Clone the repository:**  
   Run the following commands:
   git clone https://github.com/YOUR_GITHUB_USERNAME/jwt-caching-api.git
   cd jwt-caching-api

2. **Install dependencies:**
	Run:
	npm install

3. **Set up the .env file:**
    Create a file named .env in the root directory and add:
		
	PORT=3000
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=your_database
    DEBUG=false

 4. **Start the server:**
    npx nodemon app.js

 ## API Endpoints
- **Authentication:**  
- `POST /register` → Register a new user (returns JWT)  
- `POST /login` → Authenticate and receive JWT  

- **User Management:**  
- `GET /users` → Retrieve users (cached for performance)  
- `DELETE /cache/users` → Clear the user cache  

## Performance Optimizations
- **In-memory caching** reduces database load  
- **Indexed database queries** for faster lookups  
- **Benchmarking with `autocannon`** for performance testing  

## License
This project is **MIT licensed** – feel free to use and modify it.
	
