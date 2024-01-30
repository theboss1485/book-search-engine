const {Book, User} = require('../models');
const { signToken, AuthenticationError} = require( '../utils/auth');

// This file contains the logic to be executed whenever a graphql query or mutation is run.
const resolvers = {

    Query: {

        // This is the logic for the 'me' query, which obtains the logged in user's information.
        me: async (parent, args, context) => {

            try {

                if(context.user){

                    let user = await User.findOne({_id: context.user._id})
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

            try{

                let user = await User.findOne({email});

                if(user){

                    let correctPassword = await user.isCorrectPassword(password)

                    if(correctPassword){

                        let token = signToken(user);
                        return {token, user}
                        
                    } else {
                        
                        throw AuthenticationError
                    }
                    
                } else {
                    
                    throw AuthenticationError
                }
            
            } catch (error){

                console.log(error)
            }
            
        },

        // The addUser mutation adds a user to the database.
        addUser: async (parent, {username, email, password}) => {

            try {

                const user = await User.create({username, email, password});
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

                    let user = await User.findOne({_id: context.user._id})
                    
    
                    user.savedBooks.push(bookToSave);
                    await user.save();
                    return user;
                
                } else {
    
                    throw new Error("User not logged in.")
                }

            } catch (err){

                console.log("Book Creation Failed.")
            }

        },

        // The removeBook mutation removes a book from the database.
        removeBook: async (parent, {bookId}, context) => {

            try{

                let user = await User.findOne({_id: context.user._id});
                user.savedBooks = user.savedBooks.filter((book) => book.bookId !== bookId);
                await user.save();
                return user;
            
            } catch (err){

                console.log("Book Deletion Failed.")
            }

            

        }
    }
}

module.exports = resolvers;