// import ApolloClient, { gql } from 'apollo-boost';
import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import ApolloClient from 'apollo-client';

const link = createHttpLink({ uri: '/graphql', fetch });
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export const BOOKS = `
  {
    books {
      id
      title
    }
  }
`;
