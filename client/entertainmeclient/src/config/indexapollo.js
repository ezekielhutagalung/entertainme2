import { ApolloClient, InMemoryCache } from "@apollo/client";
import { favMovie } from "../cache";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          favItem: {
            read() {
              return favMovie();
            },
          },
        },
      },
    },
  }),
});

export default client;
