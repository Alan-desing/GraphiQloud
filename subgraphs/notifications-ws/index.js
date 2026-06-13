const { createSchema, createYoga } = require('graphql-yoga');

let counter = 1;

const notifications = [
  {
    id: "1",
    message: "Servidor de notificaciones iniciado"
  }
];

const schema = createSchema({
  typeDefs: `
    type Notification {
      id: ID!
      message: String!
    }

    type Subscription {
      notificationAdded: Notification!
    }

    type Query {
      _empty: String
    }
  `,

  resolvers: {
    Subscription: {
      notificationAdded: {
        subscribe: async function* () {
          while (true) {
            await new Promise(resolve => setTimeout(resolve, 5000));

            const notification = {
              id: String(++counter),
              message: "Actualización del pedido #" + counter
            };

            console.log("Nueva notificación enviada:", notification.message);

            yield {
              notificationAdded: notification
            };
          }
        }
      }
    }
  }
});

const yoga = createYoga({
  schema
});

const port = 4005;

const server = require('http').createServer(yoga);

server.listen(port, () => {
  console.log(`Subscription server funcionando en http://localhost:${port}/graphql`);
});