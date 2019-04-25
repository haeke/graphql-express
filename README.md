# GraphQL Express Server Reference

This is an express server that has a graphQL route where you can query and create mutations against hardcoded books and authors object.

## Getting Started

To get a local copy of the project just clone this repository and install the dependencies with npm

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

```
query {
    authors {
        name
        id
    }
}
```
