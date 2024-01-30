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

                console.log("User Creation Failed")
            }
        },

        // The saveBook mutation saves a book to the database.
        saveBook: async (parent, {bookToSave}, context) => {

            if(context.user){
                console.log("book", bookToSave)
                let user = await User.findOne({_id: context.user._id})
                

                user.savedBooks.push(bookToSave);
                await user.save();
                console.log("user", user)
                return user;
            
            } else {

                throw new Error("User not logged in.")
            }

            

        },

        // The removeBook mutation removes a book from the database.
        removeBook: async (parent, {bookId}, context) => {

            let user = await User.findOne({_id: context.user.id});
            let book = await Book.findOne({bookId: bookId})
            user.savedBooks.remove(book);
            await user.save();
            return user;

        }
    }
}

module.exports = resolvers;