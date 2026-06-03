const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
  }

  type Query {
    products: [Product]
  }
`;

const products = [
  {
    id: "1",
    name: "Notebook Lenovo",
    price: 850000
  },
  {
    id: "2",
    name: "Mouse Logitech",
    price: 25000
  },
  {
    id: "3",
    name: "Teclado Redragon",
    price: 45000
  }
];

const resolvers = {
  Query: {
    products: () => products
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
    listen: { port: 4002 }
  });

  console.log(`Products running at ${url}`);
}

startServer();