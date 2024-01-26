import { gql } from '@apollo/client';

export const LOGIN_USER = gql`

    mutation login($email: String!, $password: String!){

        login(email: $email, password: $password) {

            email
        }
    }
`

export const ADD_USER = gql`

    mutation addUser($username: String!, $email: String!, $password: String!){

        addUser(username: $username, email: $email, password: $password){
            _id
            username
            email
        }
    }
`

export const SAVE_BOOK = gql`

    mutation saveBook($input: saveBookInput!){
        
        saveBook(input: $input) {

            id
            title
        }
    }
`

export const REMOVE_BOOK = gql`

    mutation removeBook($bookId: String!){

        removeBook(bookId: $bookId) {
            
            id
            title
        }
    }
`