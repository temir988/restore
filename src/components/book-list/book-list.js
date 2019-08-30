import React, { Component } from "react";
import BookListItem from "../book-list-item";
import { connect } from "react-redux";

import ErrorIndicator from "../error-indicator";
import { withBookstoreService } from "../hoc";
import { fetchBooks } from "../../actions";
import { compose } from "../../utils";
import Spinner from "../spinner";
import "./book-list.css";

const BookList = ({ books }) => {
  return (
    <ul className="book-list">
      {books.map(book => {
        return (
          <li key={book.id}>
            <BookListItem book={book} />
          </li>
        );
      })}
    </ul>
  );
};

class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error } = this.props;

    if (error !== null) {
      return <ErrorIndicator />;
    }

    if (loading) {
      return <Spinner />;
    }

    return <BookList books={books} />;
  }
}

const mapStateToProps = ({ books, loading, error }) => {
  return { books, loading, error };
};

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch)
  };
};

export default compose(
  withBookstoreService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BookListContainer);
