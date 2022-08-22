const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { hello } = require('./queries');

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        hello
    }
});

const schema = new GraphQLSchema({
    query: QueryType
});

module.exports = schema;
