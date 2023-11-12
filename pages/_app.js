import '../styles/globals.css'
import Layout from '../components/Layout'
import { ApolloProvider, ApolloClient, InMemoryCache  } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:4000', // Replace with your GraphQL server's URL
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
     
      <Layout>
      <Component {...pageProps} />
      </Layout>
     
    </ApolloProvider>
  );
}

export default MyApp;
