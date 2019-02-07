import { GraphQLServer } from "graphql-yoga";
import { PubSub } from "graphql-subscriptions";
import { connect } from "mongoose";
import resolvers from "./graphql/resolvers";

const server = new GraphQLServer({
  typeDefs: `${__dirname}/graphql/schema.graphql`,
  resolvers,
  context: {
    pubSub: new PubSub()
  }
});

connect(process.env.MONGO_URI)
  .then(() => {
    server.start({ port: 3000 }, ({ port }) => {
      console.log(`server started at port ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
