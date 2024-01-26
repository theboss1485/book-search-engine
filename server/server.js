const express = require('express');
const { ApolloServer } = require('@apollo/server');
const path = require('path');
const db = require('./config/connection');
const { expressMiddleware } = require('@apollo/server/express4');
const routes = require('./routes');
const {typeDefs, resolvers} = require('./schemas');
const auth = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// I took code for this method from activity 14 of Module 21.
const startApolloServer = async () => {
  
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // if we're in production, serve client/build as static assets
    if (process.env.NODE_ENV === 'production') {

        app.use(express.static(path.join(__dirname, '../client/build')));
    }
    

    app.use('/graphql', expressMiddleware(server),
        auth.authMiddleware
    );

    db.once('open', () => {
        console.log("Database Connected");
        app.listen(PORT, () => {

            console.log(`🌍 Now listening on localhost:${PORT}`)
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });
}

startApolloServer();






