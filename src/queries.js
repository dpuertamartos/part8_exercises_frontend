import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    id
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    author
    id
    genres
  }
}
`

export const CREATE_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      author
      published
      id
      genres
    }
  }
`

export const EDIT_BORN = gql`
mutation editAuthor($name: String!, $n: Int!){
    editAuthor(name: $name, setBornTo: $n) {
        name
        born
        id
    }
}
`