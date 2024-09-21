import {
    createHttpLink,
    ApolloClient,
    InMemoryCache,
  } from '@apollo/client/core'
  import { setContext } from '@apollo/client/link/context'
  import useFirebase from './useFirebase'
  
  const { firebaseUser } = useFirebase()
  
  const httpLink = createHttpLink({
    uri: 'mvpvoteapi-achxh6a4b5etdked.westeurope-01.azurewebsites.net/graphql/',
    credentials: 'same-origin',
  })
  
  const authLink = setContext(async (_, { headers }) => ({
    headers: {
      ...headers,
      authorization: firebaseUser.value
        ? `Bearer ${await firebaseUser.value.getIdToken()}`
        : ``,
    },
  }))
  
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    // link: httpLink,
    cache: new InMemoryCache(),
  })
  
  export default () => {
    return {
      apolloClient,
    }
  }
  