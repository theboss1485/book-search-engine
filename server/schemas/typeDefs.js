

/* This file contains the type definitions, or names and types of fields required and returned, when 
querying the graphql database.*/
const typeDefs = `

    type Book {
        
        bookId: String!
        authors: [String!]
        description: String
        title: String
        image: String
        link: String
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        
        token: String
        user: User
    }

    input saveBookInput {
        authors: [String]!
        description: String!
        title: String!
        bookId: String!
        image: String!
        link: String!
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: saveBookInput): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;