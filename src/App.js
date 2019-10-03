import React from "react";
import BookList from "./components/bookList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AddBook from "./components/addBook";
// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="row">
        <div className="col-md-6">
          <div className="col-md-6 offset-md-6">
            <BookList />
          </div>
        </div>
        <div className="col-md-6">
          <div className="col-md-6 mr-auto">
            <AddBook />
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
