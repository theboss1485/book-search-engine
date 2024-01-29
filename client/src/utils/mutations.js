import { gql } from '@apollo/client';

// This is the defined mutation to log in a user.
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

// This is the definition of the mutation to add a user to the database.
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`;

// This is the definition of the mutation to save a book to the database.
export const SAVE_BOOK = gql`

    mutation saveBook($input: saveBookInput!){
        
        saveBook(input: $input) {

            user{
                savedBooks
            }
        }
    }
`;

// This is the definition of the mutation to remove a book from the database.
export const REMOVE_BOOK = gql`

    mutation removeBook($bookId: String!){

        removeBook(bookId: $bookId) {
            
            user{
                savedBooks
            }
        }
    }
`;