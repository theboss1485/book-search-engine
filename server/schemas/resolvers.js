const {Book, User} = require('../models');
import Auth from '../utils/auth';

const resolvers = {

    Query: {

        me: async (args) => {

            return await User.find(args.id)
        }
    },


    Mutation: {

        login: async ({username, email, password}) => {

            return await Auth.find(arg)
        },

        addUser: async ({username, email, password}) => {


        },

        saveBook: async ({authors, description, title, bookId, image, link}) => {

            return await User.find()
        },

        removeBook: async ({bookId}) => {

            return await User.find()
        }
    }
}