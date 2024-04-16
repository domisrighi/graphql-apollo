import "reflect-metadata";

import path from "node:path";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "graphql";
import { AppointmentsResolver } from "./resolvers/appointments-resolver";

async function bootstrap() {
  const schema = buildSchema({
    resolvers: [AppointmentsResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = new ApolloServer({});

  const { url } = await server.listen();

  console.log(`HTTP Server running on ${url}`);
}

bootstrap();
