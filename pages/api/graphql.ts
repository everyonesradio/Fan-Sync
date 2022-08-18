import { ApolloServer } from 'apollo-server-micro';
import schema from '../../graphql/schema';
import resolvers from '../../graphql/resolvers';
import { createContext } from '../../graphql/context';
import Cors from 'micro-cors';

const cors = Cors();
const apolloServer = new ApolloServer({ 
  schema, 
  resolvers ,
  context: createContext,
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