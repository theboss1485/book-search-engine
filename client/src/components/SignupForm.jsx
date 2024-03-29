import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

// This form deals with signing up the user after he or she has entered his or her information.
const SignupForm = () => {

    // set initial form state
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    const [addUser, { loading, error }] = useMutation(ADD_USER);

    // set state for form validation
    const [validated] = useState(false);

    // set state for alert
    const [showAlert, setShowAlert] = useState(false);

      // This function allows for the setting of form data when the user types a new character into the form.
        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setUserFormData({ ...userFormData, [name]: value });
        };

        // This function is executed when the user clicks the Submit button on the signup form.
    const handleFormSubmit = async (event) => {


        event.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;

        if (form.checkValidity() === false) {

            event.preventDefault();
            event.stopPropagation();
        }

        try {
            
            const {data} = await addUser({

                variables:{...userFormData}
            });

            const { token, user } = data.addUser;
            Auth.login(token);

        } catch (err) {

            console.log("something went wrong with your signup process.  Please try a different username and password.");
            setShowAlert(true);
        }

        setUserFormData({

            username: '',
            email: '',
            password: '',
        });
    };

    // This code renders the signup form.
    return (
        <>
            {/* This is needed for the validation functionality above */}
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                
                {/* show alert if server response is bad */}
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong!  Try using a different email and password.
                </Alert>

                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='username'>Username</Form.Label>
                    <Form.Control
                        id='username'
                        type='text'
                        placeholder='Your username'
                        name='username'
                        onChange={handleInputChange}
                        value={userFormData.username}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='signup-email'>Email</Form.Label>
                    <Form.Control
                        id='signup-email'
                        type='email'
                        placeholder='Your email address'
                        name='email'
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='signup-password'>Password</Form.Label>
                    <Form.Control
                        id='signup-password'
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
                    disabled={!(userFormData.username && userFormData.email && userFormData.password)}
                    type='submit'
                    variant='success'>
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default SignupForm;
