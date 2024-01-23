
// I took the code for adding the ApolloProvider component from activity 13 of module 21.
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

const client = new ApolloClient({

    uri: '/graphql',
    cache: new InMemoryCache(),
})

function App() {
    
    return (
        
        <>
            <ApolloProvider client={client}>
                <Navbar />
                <Outlet />
            </ApolloProvider>
        </>
        
    );
}

export default App;
