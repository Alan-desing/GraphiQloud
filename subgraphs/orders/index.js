const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Order {
    id: ID!
    userId: ID!
    productId: ID!
    status: String!
  }

  type Query {
    orders: [Order]
  }
`;

const orders = [
  {
    id: "1",
    userId: "1",
    productId: "2",
    status: "En preparación"
  },
  {
    id: "2",
    userId: "2",
    productId: "1",
    status: "Enviado"
  }
];

const resolvers = {
  Query: {
    orders: () => orders
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
    listen: { port: 4003 }
  });

  console.log(`Orders running at ${url}`);
}

startServer();