import { AppServer } from "./application/app"

const start= async() =>{
  const httpServer = await AppServer()
  await new Promise<void>((resolve) => httpServer.listen({ port: process.env.PORT || 4000}, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

start()