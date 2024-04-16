//TODO - Finalizar API

import { ApolloServer, gql } from "apollo-server";
import { randomUUID } from "node:crypto";

const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }

  type Query {
    users: [User!]!
    # O "!" indica que o retorno sempre será String (não colocando indicaria que o retorno será uma String porém pode não haver retorno, e com "!" o retorno é obrigatório).
  }

  type Mutation {
    createUser(name: String!): User!
  }
`;

interface User {
  id: string;
  name: string;
}

const users: User[] = [];

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => {
        return users;
      },
    },

    Mutation: {
      createUser: (_, args) => {
        const user = {
          id: randomUUID(),
          name: args.name,
        };

        users.push(user);

        return user;
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`HTTP Server running on ${url}`);
});
