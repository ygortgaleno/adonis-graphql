const path = require('path')
const { fileLoader, mergeTypes } = require("merge-graphql-schemas");
const { makeExecutableSchema } = require("graphql-tools");
const { userResolvers } = require("./resolvers");

const typesArray = fileLoader(path.join(__dirname, "./schemas"), {
  recursive: true
});

const typeDefs = mergeTypes(typesArray, { all: true });

module.exports = makeExecutableSchema({ typeDefs, resolvers: userResolvers });
