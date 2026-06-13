const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Notification {
    id: ID!
    message: String!
  }

  type Query {
    notifications: [Notification]
  }
`;

const notifications = [
  {
    id: "1",
    message: "Pedido #1 creado"
  },
  {
    id: "2",
    message: "Pedido #2 enviado"
  },
  {
    id: "3",
    message: "Pedido #1 entregado"
  }
];

const resolvers = {
  Query: {
    notifications: () => notifications
  }
};

async function startServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema([
      {
        typeDefs,
        resolvers
      }
    ])
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4004 }
  });

  console.log(`Notifications running at ${url}`);
}

startServer();