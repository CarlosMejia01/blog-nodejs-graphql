const { GraphQLString } = require("graphql");
const { User, Post } = require('../models');
const { createJWTToken } = require('../util/auth');
const { PostType } = require('./types');

const register = {
    type: GraphQLString,
    description: 'Register a new user and return a token',
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        displayName: { type: GraphQLString }
    },
    async resolve(_, args) {
        const { username, email, password, displayName } = args;
        const user = new User({ username, email, password, displayName });
        await user.save();

        const token = createJWTToken({ _id: user.id, username: user.username, email: user.email, displayName: user.displayName });

        return token;
    }
};

const login = {
    type: GraphQLString,
    description: 'Login for the user and returns token',
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(_, args) {
        const user = await User.findOne({ email: args.email }).select('+password');
        if (!user || args.password !== user.password)
            throw new Error("Invalid credentials");
        const token = createJWTToken({ _id: user.id, username: user.username, email: user.email, displayName: user.displayName });
        return token;
    }
};

const createPost = {
    type: PostType,
    description: "Create a new post",
    args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString }
    },
    async resolve(_, args, { verifiedUser }) {
        console.log(verifiedUser);
        const post = new Post({
            title: args.title,
            body: args.body,
            authorId: verifiedUser._id
        });
        return post;
    }
};

module.exports = {
    register,
    login,
    createPost
};