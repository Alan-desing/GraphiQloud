const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { ApolloGateway } = require('@apollo/gateway');

async function startGateway() {
  const gateway = new ApolloGateway({
    serviceList: [
      {
        name: 'users',
        url: 'http://localhost:4001'
      },
      {
        name: 'products',
        url: 'http://localhost:4002'
      },
      {
        name: 'orders',
        url: 'http://localhost:4003'
      },
      {
        name: 'notifications',
        url: 'http://localhost:4004'
      }
    ]
  });

  const server = new ApolloServer({
    gateway
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  });

  console.log(`Gateway running at ${url}`);
}

startGateway();