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
const { userGraphql } = require('../app/graphql')

Route.route(
  "/user",
  ({ request, auth, response }) => {
    return GraphqlAdonis.graphql(
      {
        schema: userGraphql,
        context: { auth }
      },
      request,
      response
    );
  },
  ["GET", "POST"]
);

Route.get("/user/graphiql", ({ request, response }) => {
  return GraphqlAdonis.graphiql({ endpointURL: "/user" }, request, response);
});
