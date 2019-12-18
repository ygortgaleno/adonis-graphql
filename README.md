# Adonis GraphQL API application

Sample application with framework adonis and graphql

## Setup

Docker **_recomended_**

_docker-compose_

- First time running
```bash
docker-compose up --build
```
- Other times 
```bash
docker-compose up
```
The app will be runinng on ```3333``` port


## App routes

You can test graphql console in `/credentials/graphiql`  and `/users/graphiql` (this one you must be authenticated with jwt baerer, insomnia or postman should help) 

### [/credentials]

- Mutation
  - register(username: String!, password: String!, email: String!)
  - login (email: String!, password: String!)

### [/users] must be authenticated with jwt baerer

- Query
  - fetchUser
- Mutation
  - editUser(emal: String, password: String)
  - removeUser

