# GraphQL Express Server Reference

This is an express server that has a graphQL route where you can query and create mutations against hardcoded books and authors object.

## Getting Started

To get a local copy of the project just clone this repository and install the dependencies with npm

To run the development server enter the command:

```
npm run start
```

You will have access to the GraphiQL interface by going to http://localhost:5000/graphql or whatever port you set if you're using an environment variable ( The environment variable name that I used is named PORT ).

### Prerequisites

```
npm i
```

# Technologies Used

1.  Express - npm package
2.  GraphQL - npm package
3.  Express-GraphQL - npm package

### Example Query's

Get a list of all of the books with id, authorId and name
GraphQL Query

```
query {
    books {
        id
        authorId
        name
    }
}
```

Get a list of all of the authors by name and id
GraphQL Query

```
query {
    authors {
        name
        id
    }
}
```

Add a book to the books array
GraphQL mutation - this mutation example will add a book named Lethal White for the author whos id is 1. When executing this mutation in GraphiQL the id and name will be returned.

```
mutation {
    addBook(name: "Lethal White", authorId: 1 ) {
        id
        name
    }
}
```

Add a author to he authors array
GraphQL mutation - this mutation example will add an author name and automatically increment the id by 1. When executing this mutation GraphiQL will return the id and name of the author we just created.

```
mutation {
    addAuthor(name: "Steven King") {
        id
        name
    }
}
```
