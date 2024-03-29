
/* I took the code for adding the ApolloProvider component from activity 24 of module 21.
This file sets up the authorization link for usage of the token, and the HTTP link for usage of GraphQL.
It also sets up the apollo client and renders the overall page.*/
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

const httpLink = createHttpLink({

    uri: '/graphql'
});

const authorizationLink = setContext((_, {headers}) => {

    const authorizationtoken = localStorage.getItem('id_token');

    return {

        headers: {
            
            ...headers,
            authorization: authorizationtoken ? `Bearer ${authorizationtoken}` : ''
        }
    }
    
})


const client = new ApolloClient({

    link: authorizationLink.concat(httpLink),
    cache: new InMemoryCache(),
})

function App() {
    
    return (
        
        <>
            <ApolloProvider client={client}>
                <Navbar/>
                <Outlet />
            </ApolloProvider>
        </>
        
    );
}

export default App;
