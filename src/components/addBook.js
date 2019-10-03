import React, { useState } from "react";
import { getAuthors, addBookMutation, getBooksQuery } from "../queries/queries";
import { graphql } from "react-apollo";
import { compose } from "recompose";

const AddBook = props => {
  const displayAuthors = () => {
    let data = props.getAuthors;
    if (data.loading) return <option>loading...</option>;
    return data.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };
  const [state, setState] = useState({
    bookName: "",
    genre: "",
    authorId: ""
  });
  const { bookName, genre, authorId } = state;
  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.addBookMutation({
      variables: {
        name: state.bookName,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    setState({
      bookName: "",
      genre: "",
      authorId: ""
    });
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center">Add Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookName">Book name</label>
          <input
            type="text"
            className="form-control"
            id="bookName"
            name="bookName"
            value={bookName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            className="form-control"
            id="genre"
            name="genre"
            value={genre}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <select
            className="form-control"
            id="author"
            name="authorId"
            value={authorId}
            onChange={handleChange}
          >
            <option className="text-disabled disabled" aria-disabled="true">
              --Choose Author--
            </option>
            {displayAuthors()}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          +
        </button>
      </form>
    </div>
  );
};

export default compose(
  graphql(getAuthors, { name: "getAuthors" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
