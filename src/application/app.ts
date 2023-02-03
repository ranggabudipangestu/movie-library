import * as dotenv from "dotenv";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import { typeDefs, resolvers } from '../infrastructure/graphql/schema';
import path from  'path'
interface MyContext {
  token?: String;
}
export async function AppServer(){
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  
  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.authorization }),
    }),
  );
  
  app.use(express.static(path.resolve(__dirname, '../../client/build')))
  app.get('/graphiql', (req, res) =>{
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
  })

  return httpServer
}