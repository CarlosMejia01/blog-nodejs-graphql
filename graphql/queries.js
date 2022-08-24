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
    resolve: (_, args) => User.findById(args.id)
};

const posts = {
    type: new GraphQLList(PostType),
    description: "Get all posts",
    resolve: () => Post.find()
};


module.exports = {
    users,
    user,
    posts
};
