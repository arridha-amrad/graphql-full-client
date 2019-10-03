import React from "react";
import { getBook } from "../queries/queries";
import { graphql } from "react-apollo";

const BookDetails = props => {
  const displayBook = () => {
    const book = props.data.book;
    if (book) {
      return (
        <div>
          <h5>
            <span className="font-weight-bolder">Title </span>: {book.name}
          </h5>
          <p>
            <span className="font-weight-bolder">Genre </span>: {book.genre}
          </p>
          <p>
            <span className="font-weight-bolder">Author </span>:
            {book.author.name}
          </p>
          <p>
            {book.author.books.map(book => (
              <li key={book.id}>{book.name}</li>
            ))}
          </p>
        </div>
      );
    }
  };
  return (
    <div className="mt-4">
      <h1>Book Details</h1>
      {displayBook()}
    </div>
  );
};

export default graphql(getBook, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
