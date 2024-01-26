const {Book, User} = require('../models');
import Auth, { signToken, Auth} from '../utils/auth';

const resolvers = {

    Query: {

        me: async (parent, context) => {

            try {

                if(context.user){

                    let user = await User.findOne({email: context.user.email})

                    return user
                }

            } catch (error) {
                
                console.log(error)
            }
        }
    },


    Mutation: {

        login: async (parent, {email, password}) => {

            let user = await User.findOne({email});

            if(user){

                let correctPassword = await user.isCorrectPassword(password)

                if(correctPassword){

                    let token = signToken(user);
                    return {token, user}
                
                } else {

                    throw new Auth.AuthenticationError
                }
                
            } else {

                throw new Auth.AuthenticationError
            }
        },

        addUser: async (parent, {username, email, password}) => {

            try {

                let user = await User.create({username, email, password})
                const token = signToken(user)
                return {token, user};
            }

            catch(error) {

                console.log("User Creation Failed")
            }

            
        },

        saveBook: async (parent, args, context) => {

            let user = User.findOne({_id: context.user.id})
            let book = Book.create({input: args.input})
            user.savedBooks.add(book);
            return user;
        },

        removeBook: async (parent, {bookId}, context) => {

            let user = User.findOne({_id: context.user.id});
            let book = Book.findOne({bookId: bookId})
            user.savedBooks.remove(book);
            return user;

        }
    }
}