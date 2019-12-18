const path = require('path')
const { fileLoader, mergeTypes } = require('merge-graphql-schemas')
const { makeExecutableSchema } = require('graphql-tools')
const { userResolvers, credentialUserResolvers } = require('./resolvers')

const schemasUser = fileLoader(path.join(__dirname, './schemas/user.schema.graphql'))
const typeDefsUser = mergeTypes(schemasUser, { all: true })
const userGraphql = makeExecutableSchema({ typeDefs: typeDefsUser, resolvers: userResolvers })

const schemasCredentialUser = fileLoader(path.join(__dirname, './schemas/credential.schema.graphql'))
const typeDefsCredentialUser = mergeTypes(schemasCredentialUser, { all: true })
const credentialUserGraphql = makeExecutableSchema({
  typeDefs: typeDefsCredentialUser,
  resolvers: credentialUserResolvers
})

module.exports = { userGraphql, credentialUserGraphql }
