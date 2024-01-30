const {Book, User} = require('../models');
const { signToken, AuthenticationError} = require( '../utils/auth');

// This file contains the logic to be executed whenever a graphql query or mutation is run.
const resolvers = {

    Query: {

        // This is the logic for the 'me' query, which obtains the logged in user's information.
        me: async (parent, args, context) => {

            try {

                console.log("me test!");

                if(context.user){

                    console.log("context test");

                    let user = await User.findOne({_id: context.user._id})

                    console.log("user", user)
                    return user
                }

            } catch (error) {
                
                console.log(error)
            }
        }
    },


    Mutation: {

        // The login mutation logs a user into the application.
        login: async (parent, {email, password}) => {

            let user = await User.findOne({email});

            if(user){

                let correctPassword = await user.isCorrectPassword(password)

                if(correctPassword){

                    let token = signToken(user);
                    return {token, user}
                    
                } else {
                    
                    throw new AuthenticationError
                }
                
            } else {
                
                throw new AuthenticationError
            }
        },

        // The addUser mutation adds a user to the database.
        addUser: async (parent, {username, email, password}) => {

            try {

                const user = await User.create({username, email, password});
                console.log("User", user);
                const token = signToken(user)
                return {token, user};
            }

            catch(error) {

                console.log(error)
            }
        },

        // The saveBook mutation saves a book to the database.
        saveBook: async (parent, {bookToSave}, context) => {

            try{

                if(context.user){
                    console.log("user", context.user);
                    let user = await User.findOne({_id: context.user._id})
                    
    
                    user.savedBooks.push(bookToSave);
                    await user.save();
                    console.log("user", user)
                    return user;
                
                } else {
    
                    throw new Error("User not logged in.")
                }
            } catch (err){

                console.log("Book Creation Failed.")
                console.log(err)
            }

        },

        // The removeBook mutation removes a book from the database.
        removeBook: async (parent, {bookId}, context) => {

            try{

                console.log("user id", context.user._id);

                let user = await User.findOne({_id: context.user._id});
                console.log("user", user);
                user.savedBooks = user.savedBooks.filter((book) => book.bookId !== bookId);
                console.log("saved books", user.savedBooks);
                await user.save();
                return user;
            
            } catch (err){

                console.log("Book Deletion Failed.")
                console.log(JSON.stringify(err));
            }

            

        }
    }
}

module.exports = resolvers;