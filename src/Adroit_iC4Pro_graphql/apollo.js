import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { GRAPHQL_ENDPOINT } from "./API";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT
  }),
  connectToDevTools:true,

  clientState : {
    defaults: {
              isLoggedIn: !!localStorage.getItem('authToken')
    }

  }
});
