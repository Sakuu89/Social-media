const bcrypt = require('bcrypt');
const User = require('../models/user');
const Post = require('../models/post');
const userFollows = require('../utils/userFollows');


const resolvers = {
    getUser: async ({ id }) => await User.findById(id),
    getAllUsers: async () => await User.find(),
    getPost: async ({ id }) => await Post.findById(id),
    getAllPosts: async () => await Post.find(),
    registerUser: async ({ username, email, password }) => {
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();
            return 'User registered successfully';
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    },
    loginUser: async ({ email, password }) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

            if (await bcrypt.compare(password, user.password)) {
                return 'Login successful';
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    createPost: async ({ userId, content }) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const newPost = new Post({ content, author: userId });
            await newPost.save();
            return 'Post created successfully';
        } catch (error) {
            throw new Error(error.message);
        }
    },
    followUser: async ({ userId, followUserId }) => {
        try {
            const user = await User.findById(userId);
            const followUser = await User.findById(followUserId);
            if (!user || !followUser) {
                throw new Error('Invalid user ID');
            }

            if (!userFollows[userId]) {
                userFollows[userId] = [];
            }

            if (!userFollows[userId].includes(followUserId)) {
                userFollows[userId].push(followUserId);
            }

            return 'User followed successfully';
        } catch (error) {
            throw new Error(error.message);
        }
    },
    unfollowUser: async ({ userId, unfollowUserId }) => {
        try {
            const user = await User.findById(userId);
            const unfollowUser = await User.findById(unfollowUserId);
            if (!user || !unfollowUser) {
                throw new Error('Invalid user ID');
            }

            if (userFollows[userId]) {
                userFollows[userId] = userFollows[userId].filter(id => id !== unfollowUserId);
            }

            return 'User unfollowed successfully';
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = resolvers