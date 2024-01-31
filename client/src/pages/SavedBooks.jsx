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

import {Link} from 'react-router-dom';

const SavedBooks = () => {

    const {loading, data} = useQuery(GET_ME);
    const [removeBook, {error}] = useMutation(REMOVE_BOOK);

    const [userData, setUserData] = useState();

    if (loading) {

        // Here, we render the loading state if the data from the GET_ME query hasn't arrived yet
        return <p>Loading...</p>;

    } else if(data && !userData){

        setUserData(data.me);
    }


    // This is a function that accepts the book's mongo _id value as param and deletes the book from the database
    const handleDeleteBook = async (bookId) => {

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {

            return false;
        }

        try {

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
            console.log("Book deletion failed");
        }
    };

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
                                    <div className="d-flex flex-column justify-content-center">
                                        <a className="btn-block btn-success mb-3 google-books-link" href={book.link} target="_blank">
                                                View on Google Books
                                        </a>
                                        <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                                            Delete this Book!
                                        </Button>
                                    </div>
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
