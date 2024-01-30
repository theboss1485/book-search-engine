import { useState, useEffect} from 'react';
import { useQuery, useReadQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import {GET_ME} from '../utils/queries.js'
import {REMOVE_BOOK} from '../utils/mutations.js'
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {

    const {loading, data} = useQuery(GET_ME);
    const [removeBook, {error}] = useMutation(REMOVE_BOOK);

    //const userDataLength = Object.keys(data).length;

    const [userData, setUserData] = useState();

    useEffect(() => {

        console.log("data", data);

        if(data){
            setUserData(data.me)
        }
    }, [data])

    // use this to determine if `useEffect()` hook needs to run again
    //const userDataLength = Object.keys(userData).length;

        //This function gets user data for the purpose of getting a user's saved books. 
    //     const getUserData = async () => {

    //         try {

    //             const token = Auth.loggedIn() ? Auth.getToken() : null;

    //             if (!token) {

    //                 return false;
    //             }

    //             const user = data?.user || {};
                
    //             setUserData(user);

    //         } catch (err) {
                
    //             console.error(err);
    //         }
    //     };

    // getUserData();

  

    // This is a function that accepts the book's mongo _id value as param and deletes the book from the database
    const handleDeleteBook = async (bookId) => {

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {

            return false;
        }

        try {

            //const response = await removeBook(bookId, token);

            const {data} = await removeBook({

                variables:{
                    
                    bookId: bookId,
                    token: token
                }
            });

            const user = data.removeBook
            setUserData(user);

            // upon success, remove book's id from localStorage
            removeBookId(bookId);

        } catch (err) {
            console.error(err);
        }
    };

    // if data isn't here yet, say so
    // if ((loading)) {

    //     console.log("loading test");
        
    
    // } else {

    //     setUserData(data.me);
    //     console.log(userData);
    // }

    console.log("user data", userData);

    return (userData ? 
        <>
            <div fluid="true" className="text-light bg-dark p-5">
                <Container>
                    <h1>Viewing saved books!</h1>
                </Container>
            </div>
            <Container>
                <h2 className='pt-5'>
                    {userData.savedBooks.length
                        ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
                        : 'You have no saved books!'
                    }
                </h2>
                <Row>
                    {userData.savedBooks.map((book) => {
                        return (
                        <Col key={book.bookId} md="4">
                            <Card border='dark'>
                                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <p className='small'>Authors: {book.authors}</p>
                                    <Card.Text>{book.description}</Card.Text>
                                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                                        Delete this Book!
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    : null);

    // This code renders the list of saved books.
    
};

export default SavedBooks;
