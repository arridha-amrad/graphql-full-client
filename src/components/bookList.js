import React, { useState } from "react";
import { getBooksQuery } from "../queries/queries";
import { graphql } from "react-apollo";
import BookDetails from "./bookDetails";

const BookList = props => {
  const [state, setState] = useState({
    selected: null
  });
  const displayBooks = () => {
    let data = props.data;
    if (data.loading) return <p>loading...</p>;
    return data.books.map(book => (
      <li
        key={book.id}
        className="list-group-item"
        onClick={e => {
          setState({ ...state, selected: book.id });
        }}
      >
        {book.name}
      </li>
    ));
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center">Ninja's Reading List</h1>
      <ul className="list-group">{displayBooks()}</ul>
      <BookDetails bookId={state.selected} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
