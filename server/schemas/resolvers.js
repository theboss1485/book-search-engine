const {Book, User} = require('../models');
import Auth, { signToken, Auth} from '../utils/auth';

const resolvers = {

    Query: {

        me: async (parent, {id}) => {

            return await User.findOne({_id: id}).populate('books')
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

        addUser: async (parent, args) => {

            let user = await User.create({args})
            return user;
        },

        saveBook: async (parent, args) => {

            let user = User.findOne({email: args.email})
            let book = Book.create({input: args.input})
            user.savedBooks.add(book);
            return user;
        },

        removeBook: async (parent, {bookId, email}) => {

            let user = User.findOne({email: args.email});
            let book = Book.findOne({bookId: bookId})
            user.savedBooks.remove(book);
            return user;

        }
    }
}