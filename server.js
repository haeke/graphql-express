const express = require("express");
const expressGraphQL = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require("graphql");
const app = express();

const authors = [
  { id: 1, name: "J.K. Rowling" },
  { id: 2, name: "J.R.R. Tolkien" },
  { id: 3, name: "Brent Weeks" }
];

const books = [
  { id: 1, name: "Harry Potter and The Chamber of Secrets", authorId: 1 },
  { id: 2, name: "Harry Potter and The Prisoner of Azkaban", authorId: 1 },
  { id: 3, name: "Harry Potter and the Goblet of Fire", authorId: 1 },
  { id: 4, name: "LOTR: The Fellowship of the Ring", authorId: 2 },
  { id: 5, name: "LOTR: The Two Towers", authorId: 2 },
  { id: 6, name: "LOTR: The Return of the King", authorId: 2 },
  { id: 7, name: "The Way of Shadows", authorId: 3 },
  { id: 8, name: "Beyond the Shadows", authorId: 3 }
];
// The BookType Schema definition
const BookType = new GraphQLObjectType({
  name: "Book",
  description:
    "This represents the endpoint that will return a book written by an author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: book => {
        return authors.find(author => author.id === book.authorId);
      }
    }
  })
});
// The AuthorType Schema definition
const AuthorType = new GraphQLObjectType({
  name: "Author",
  description:
    "This represents the endpoint that will return an author of a book.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: author => {
        return books.filter(book => book.authorId === author.id);
      }
    }
  })
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    book: {
      type: BookType,
      description: "A Single Book.",
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => books.find(book => book.id === args.id)
    },
    books: {
      type: new GraphQLList(BookType),
      description: "List of all books.",
      resolve: () => books
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List opf all authors.",
      resolve: () => authors
    },
    author: {
      type: AuthorType,
      description: "A Single Author.",
      args: {
        id: { type: GraphQLString }
      },
      resolve: (parent, args) => authors.find(author => author.id === args.id)
    }
  })
});

// The Root Mutation type
const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add a book",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId
        };
        books.push(book);
        return book;
      }
    },
    addAuthor: {
      type: AuthorType,
      description: "Add an author",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const author = { id: authors.length + 1, name: args.name };
        authors.push(author);
        return authors;
      }
    }
  })
});

// The Schema object that we pass to expressGraphQL
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

// The express endpoint that we will attach our schema
app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}/graphql`)
);
