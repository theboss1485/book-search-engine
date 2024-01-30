const { GraphQLError } = require('graphql');

const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {

    AuthenticationError: new GraphQLError("Error: Email or password is incorrect", {

        extensions: {

            code: 'UNAUTHENTICATED'
        }
    }),

    // function for our authenticated routes
   // authMiddleware: function (req)
   //This function authenticates the user's authorization token.
    authMiddleware: function ({ req }) {

        // allows token to be sent via req.query or headers
        let token = req.query.token || req.headers.authorization || req.body.token;

        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {

            token = token.split(' ').pop().trim();
        }

        if (!token) {
            console.log("no token");

            return req;
        }

        // verify token and get user data out of it
        try {

            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
            

        } catch {

            console.log('Invalid token');
        }

        // send to next endpoint
        //next();
        return req;
    },

    // This function adds new data to the user's authorization token.
    signToken: function ({ username, email, _id }) {
        console.log("signing token...")
        const payload = { username, email, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};
