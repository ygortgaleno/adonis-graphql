const path = require('path')
const { fileLoader, mergeTypes } = require("merge-graphql-schemas");
const { makeExecutableSchema } = require("graphql-tools");
const { userResolvers } = require("./resolvers");

const typesArray = fileLoader(path.join(__dirname, "./schemas/user.schema.graphql"))

const typeDefs = mergeTypes(typesArray, { all: true });

const userGraphql =  makeExecutableSchema({ typeDefs, resolvers: userResolvers });
module.exports = { userGraphql }
