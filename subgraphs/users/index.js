const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]
  }
`;

const users = [
  { id: "1", name: "Alan", email: "alan@gmail.com" },
  { id: "2", name: "Juan", email: "juan@gmail.com" }
];

const resolvers = {
  Query: {
    users: () => users,
  },
};

async function startServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });

  console.log(`Users running at ${url}`);
}

startServer();