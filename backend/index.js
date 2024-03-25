// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const { buildSchema } = require('graphql');
// const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// const app = express();
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://singhsakshi488:sakshimongodb1234@cluster0.fajvyrg.mongodb.net/graphql_demo', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// // Check MongoDB connection
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });


// // Define Mongoose schemas 
// const userSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String
// });

// const postSchema = new mongoose.Schema({
//     content: String,
//     author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// });

// // Define Mongoose models
// const User = mongoose.model('User', userSchema);
// const Post = mongoose.model('Post', postSchema);

// // GraphQL schema
// const schema = buildSchema(`
//     type User {
//         id: ID!
//         username: String!
//         email: String!
//         posts: [Post!]!
//     }

//     type Post {
//         id: ID!
//         content: String!
//         author: User!
//     }

//     type Query {
//         getUser(id: ID!): User
//         getAllUsers: [User!]!
//         getPost(id: ID!): Post
//         getAllPosts: [Post!]!
//     }

//     type Mutation {
//         registerUser(username: String!, email: String!, password: String!): String
//         loginUser(email: String!, password: String!): String
//         createPost(userId: ID!, content: String!): String
//         followUser(userId: ID!, followUserId: ID!): String
//         unfollowUser(userId: ID!, unfollowUserId: ID!): String
//     }
// `);

// // GraphQL resolvers
// const resolvers = {
//     getUser: async ({ id }) => await User.findById(id),
//     getAllUsers: async () => await User.find(),
//     getPost: async ({ id }) => await Post.findById(id),
//     getAllPosts: async () => await Post.find(),
//     registerUser: async ({ username, email, password }) => {
//         try {
//             const existingUser = await User.findOne({ email });
//             if (existingUser) {
                
//                 throw new Error('User already exists');
//             }

//             const hashedPassword = await bcrypt.hash(password, 10);
//             const newUser = new User({ username, email, password: hashedPassword });
//             await newUser.save();
//             return 'User registered successfully';
//         } catch (error) {
//             console.log(error);
//             throw new Error(error.message);
//         }
//     },
//     loginUser: async ({ email, password }) => {
//         try {
//             const user = await User.findOne({ email });
//             if (!user) {
//                 throw new Error('User not found');
//             }

//             if (await bcrypt.compare(password, user.password)) {
//                 return 'Login successful';
//             } else {
//                 throw new Error('Invalid credentials');
//             }
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     },
//     createPost: async ({ userId, content }) => {
//         try {
//             const user = await User.findById(userId);
//             if (!user) {
//                 throw new Error('User not found');
//             }

//             const newPost = new Post({ content, author: userId });
//             await newPost.save();
//             return 'Post created successfully';
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     },
//     followUser: async ({ userId, followUserId }) => {
//         try {
//             const user = await User.findById(userId);
//             const followUser = await User.findById(followUserId);
//             if (!user || !followUser) {
//                 throw new Error('Invalid user ID');
//             }

//             if (!userFollows[userId]) {
//                 userFollows[userId] = [];
//             }

//             if (!userFollows[userId].includes(followUserId)) {
//                 userFollows[userId].push(followUserId);
//             }

//             return 'User followed successfully';
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     },
//     unfollowUser: async ({ userId, unfollowUserId }) => {
//         try {
//             const user = await User.findById(userId);
//             const unfollowUser = await User.findById(unfollowUserId);
//             if (!user || !unfollowUser) {
//                 throw new Error('Invalid user ID');
//             }

//             if (userFollows[userId]) {
//                 userFollows[userId] = userFollows[userId].filter(id => id !== unfollowUserId);
//             }

//             return 'User unfollowed successfully';
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }
// };

// // Express route for GraphQL endpoint
// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     rootValue: resolvers,
//     graphiql: true // Enable GraphiQL for easy testing in the browser
// }));
// app.get('/', (req, res)=>{
//     res.send("hello  world");
// })
// // Start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const schema = require('./src/schemas');
const resolvers = require('./src/resolvers');
// const dbConfig = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

// const { username, password, clusterUrl, dbName } = dbConfig;

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
