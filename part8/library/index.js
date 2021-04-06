import dotenv from "dotenv";
dotenv.config();
import { ApolloServer, gql, UserInputError } from "apollo-server";
import mongoose from "mongoose";
import Author from "./models/author.model.js";
import Book from "./models/book.model.js";

const MONGODB_URL = process.env.MONGODB_URL;

console.log("connecting to the DB");
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MONGODB");
  })
  .catch((e) => console.log("error connection to MongoDB:", e.message));

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate("author");
      if (!args.author && !args.genre) return books;

      if (args.author)
        return books.filter((book) => book.author === args.author);

      if (args.genre) {
        books = books.filter((book) => book.genres.includes(args.genre));
        return books;
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({}).populate("author");
      return authors.map((author) => {
        const bookCount = books.reduce(
          (accu, curr) => (curr.author.name === author.name ? accu + 1 : accu),
          0
        );

        return {
          name: author.name,
          id: author._id,
          born: author.born,
          bookCount,
        };
      });
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.author });
      if (!foundAuthor) {
        const author = new Author({
          name: args.author,
          born: null,
        });

        try {
          await author.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
      }
      const author = await Author.findOne({ name: args.author });

      const book = new Book({ ...args, author });
      try {
        await book.save();
        return book;
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args });
      }
    },

    editAuthor: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.name });
      if (foundAuthor) {
        try {
          foundAuthor.born = args.setBornTo;

          return foundAuthor.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
      }

      return;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
