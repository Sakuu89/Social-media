const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        id: ID!
        username: String!
        email: String!
        posts: [Post!]!
    }

    type Post {
        id: ID!
        content: String!
        author: User!
    }

    type Query {
        getUser(id: ID!): User
        getAllUsers: [User!]!
        getPost(id: ID!): Post
        getAllPosts: [Post!]!
    }

    type Mutation {
        registerUser(username: String!, email: String!, password: String!): String
        loginUser(email: String!, password: String!): String
        createPost(userId: ID!, content: String!): String
        followUser(userId: ID!, followUserId: ID!): String
        unfollowUser(userId: ID!, unfollowUserId: ID!): String
    }
`);
