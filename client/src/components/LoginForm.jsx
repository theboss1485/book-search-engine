// see SignupForm.js for comments
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button, Alert } from 'react-bootstrap';

import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// This form deals with logging in the user after he or she has entered his or her email and password.
const LoginForm = () => {

    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [loginUser, {error}] = useMutation(LOGIN_USER);
    const [showAlert, setShowAlert] = useState(false);

    // This function allows for the setting of form data when the user types a new character into the form.
    const handleInputChange = (event) => {

        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    // This function is executed when the user clicks the Submit button on the login form.
    const handleFormSubmit = async (event) => {

        event.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;

        if (form.checkValidity() === false) {

            event.preventDefault();
            event.stopPropagation();
        }

        try {

            const {data} = await loginUser({
                
                variables: {...userFormData}
            });

        const { token, user } = data.login;

        if(user.savedBooks){

            const savedBookIds = user.savedBooks.map((book) => book.bookId);
            localStorage.setItem('saved_books', JSON.stringify(savedBookIds));
        }
        
        Auth.login(token);

        } catch (err) {

            console.log("Something went wrong with your login credentials.");
            setShowAlert(true);
        }

        setUserFormData({

            username: '',
            email: '',
            password: '',
        });
    };

    // This code renders the login form.
    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong with your login credentials!
                </Alert>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='login-email'>Email</Form.Label>
                    <Form.Control
                        id='login-email'
                        type='text'
                        placeholder='Your email'
                        name='email'
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='login-password'>Password</Form.Label>
                    <Form.Control
                        id='login-password'
                        type='password'
                        placeholder='Your password'
                        name='password'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                </Form.Group>
                <Button
                    disabled={!(userFormData.email && userFormData.password)}
                    type='submit'
                    variant='success'>
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default LoginForm;
