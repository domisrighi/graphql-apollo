import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// Um schema é uma coleção de definições de tipo (daí "typeDefs") que juntos definem o "shape" das consultas que são executadas seus dados.

const typeDefs = `#graphql
    # Comentários em strings GraphQL (como esta) começam com o símbolo hash (#). Este type de "Livro" define os campos consultáveis ​​para cada livro em nossa fonte de dados.
 
  type Book {
    title: String
    author: String
  }

    # O type "Query" é especial: lista todas as consultas disponíveis que clientes podem executar, junto com o tipo de retorno de cada um. Nisso, a query "livros" retorna uma matriz de zero ou mais Livros (definidos acima).

  type Query {
    books: [Book]
  }
`;

// Definindo dados:

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// Definindo um resolver:

// Os Resolvers definem como buscar os tipos definidos em seu schema. Este resolver recupera livros do array "books" acima.

const resolvers = {
  Query: {
    books: () => books,
  },
};

// O construtor ApolloServer requer dois parâmetros: sua definição de schema e seu conjunto de resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passando uma instância ApolloServer para a função `startStandaloneServer`:
// 1. cria um aplicativo Express
// 2. instala sua instância ApolloServer como middleware
// 3. prepara seu aplicativo para lidar com solicitações recebidas

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`Server ready at: ${url}`);
