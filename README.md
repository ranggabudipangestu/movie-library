
# API Documentation

Here is API documentation for movie library

## Graphql API Reference

#### Authentication

| Type | Schema     | Description                |
| :-------- | :------- | :------------------------- |
| `Mutation` | `signUp` | Register Account used for create, update, and delete |
| `Mutation` | `signIn` | Login and generate Token used for create, update, and delete |

#### Authors

| Type         | Schema   | Need Authentication                       |
| :--------    | :------- | :-------------------------------- |
| `Query`      | `getAuthors` | **No** |
| `Query`      | `getAuthorById` | **No** |
| `Mutation`      | `createAuthor` | **Yes** |

#### Actors

| Type         | Schema   | Need Authentication                       |
| :--------    | :------- | :-------------------------------- |
| `Query`      | `getActors` | **No** |
| `Query`      | `getActorById` | **No** |
| `Mutation`      | `createActor` | **Yes** |


#### Movies

| Type         | Schema   | Need Authentication                       |
| :--------    | :------- | :-------------------------------- |
| `Query`      | `getMovies` | **No** |
| `Query`      | `getMovieById` | **No** |
| `Mutation`      | `createMovie` | **Yes** |
| `Mutation`      | `updateMovie` | **Yes** |
| `Mutation`      | `deleteMovie` | **Yes** |



Header Example
`{
  "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJlbWFpbCI6InJhbmdnYWJ1ZGlwYW5nZXN0dUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InJhbmdnYWJwMTIifSwiaWF0IjoxNjc1NzYwODE5LCJleHAiOjE2NzU3NjQ0MTl9.XNkQApELb05KfmuQYuJzwVDPXwtHrjJz8GBWpMJqxgg"
}`


