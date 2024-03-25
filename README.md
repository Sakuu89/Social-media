# GraphQL Server

This is a GraphQL server implementation with CRUD functionality for users and posts, built using Node.js, Express.js, MongoDB, and GraphQL.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   MONGODB_URI=<your-mongodb-uri>
   PORT=<server-port>
   ```

4. **Start the server:**

   ```bash
   node index
   ```

   The server will start running on the port 4001.
   Try to run on localhost - http://localhost:4001/graphql
   

## Directory Structure

- `src/`: Contains the source code of the GraphQL server.
  - `models/`: Contains Mongoose models for users and posts.
  - `resolvers/`: Contains resolver functions for GraphQL queries and mutations.
  - `schemas/`: Contains the GraphQL schema definitions.
  - `utils/`: Contains utility functions (e.g., userFollows).
- `index.js`: Entry point of the application.

## GraphQL Operations

The GraphQL server supports the following operations:

- **Queries:**
  - `getUser(id: ID!): User`: Get a user by ID.
  - `getAllUsers: [User!]!`: Get all users.
  - `getPost(id: ID!): Post`: Get a post by ID.
  - `getAllPosts: [Post!]!`: Get all posts.

- **Mutations:**
  - `registerUser(username: String!, email: String!, password: String!): UserResponse`: Register a new user.
  - `loginUser(email: String!, password: String!): UserResponse`: Login an existing user.
  - `createPost(userId: ID!, content: String!): Post`: Create a new post.
  - `followUser(userId: ID!, followUserId: ID!): UserResponse`: Follow another user.
  - `unfollowUser(userId: ID!, unfollowUserId: ID!): UserResponse`: Unfollow a user.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- GraphQL

