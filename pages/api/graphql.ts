import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '../../graphql/schema';
import resolvers from '../../graphql/resolvers';
import Cors from 'micro-cors';

const cors = Cors();
const apolloServer = new ApolloServer({ 
  typeDefs, 
  resolvers 
});
const loadServer = apolloServer.start();

const handler = async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await loadServer;

  await apolloServer.createHandler({ 
    path: "/api/graphql", 
  })(req, res);
}

export default cors(handler)

export const config = {
  api: {
    bodyParser: false,
  },
};