const { GraphQLString } = require("graphql");
const { User } = require('../models');
const { createJWTToken } = require('../util/auth');

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
    description: 'Login for the user',
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

module.exports = {
    register,
    login
};