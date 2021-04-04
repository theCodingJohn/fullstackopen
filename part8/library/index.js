import dotenv from "dotenv";
dotenv.config();
import { ApolloServer, gql } from "apollo-server";
import mongoose from "mongoose";

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
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.author || !args.genre) return books;

      if (args.author)
        return books.filter((book) => book.author === args.author);

      if (args.genre)
        return books.filter((book) => book.genres.includes(args.genre));
    },
    allAuthors: () => {
      return authors.map((author) => {
        const bookCount = books.reduce(
          (accu, curr) => (curr.author === author.name ? accu + 1 : accu),
          0
        );

        return { ...author, bookCount };
      });
    },
  },

  Mutation: {
    addBook: (root, args) => {
      const foundAuthor = authors.find((author) => author.name === args.name);
      if (!foundAuthor) {
        const author = {
          name: args.author,
          id: uuid(),
          born: null,
        };

        authors = authors.concat(author);
      }

      const book = { ...args, id: uuid() };
      books = books.concat(book);
      return book;
    },

    editAuthor: (root, args) => {
      const foundAuthor = authors.find((author) => author.name === args.name);
      if (foundAuthor) {
        const updatedInfo = {
          ...foundAuthor,
          born: args.setBornTo,
        };

        authors = authors.map((author) =>
          author.name === args.name ? updatedInfo : author
        );

        return updatedInfo;
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
