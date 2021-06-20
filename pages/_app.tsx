import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider , ApolloClient, InMemoryCache} from '@apollo/client'


const client = new ApolloClient({
  uri:"http://localhost:5000/graphql",
  cache: new InMemoryCache(),
  credentials: 'include'
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>)
}
export default MyApp
