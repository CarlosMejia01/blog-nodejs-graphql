const { GraphQLList, GraphQLID } = require('graphql');
const { UserType, PostType } = require('./types');
const { User, Post } = require('../models');

const users = {
    type: new GraphQLList(UserType),
    description: "Get all users",
    resolve: () => User.find()
};

const user = {
    type: UserType,
    description: "Get user by id",
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve: (_, { id }) => User.findById(id)
};

const posts = {
    type: new GraphQLList(PostType),
    description: "Get all posts",
    resolve: () => Post.find()
};

const post = {
    type: PostType,
    description: "Get a post by id",
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve: (_, { id }) => Post.findById(id)
};



module.exports = {
    users,
    user,
    posts,
    post
};
