
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
| `Mutation`      | `createActor` | **Yes** |


