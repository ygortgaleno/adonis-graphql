'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const GraphqlAdonis = use('ApolloServer')
const { userGraphql, credentialUserGraphql } = require('../app/graphql')

Route.route('/credentials', ({ request, auth, response }) => {
  return GraphqlAdonis.graphql(
    {
      schema: credentialUserGraphql,
      context: { auth }
    },
    request,
    response
  )
}, ['POST']
)

Route.route('/users', ({ request, auth, response }) => {
  return GraphqlAdonis.graphql(
    {
      schema: userGraphql,
      context: { auth }
    },
    request,
    response
  )
}, ['POST', 'GET', 'UPDATE', 'DELETE']
).middleware(['auth'])

if (process.env.NODE_ENV === 'development') {
  Route.get('/credentials/graphiql', ({ request, response }) => {
    return GraphqlAdonis.graphiql(
      { endpointURL: '/credentials' },
      request,
      response
    )
  })

  Route.get('/users/graphiql', ({ request, response }) => {
    return GraphqlAdonis.graphiql({ endpointURL: '/users' }, request, response)
  }).middleware(['auth'])
}
