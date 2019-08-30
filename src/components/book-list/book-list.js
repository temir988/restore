import React, { Component } from "react";
import BookListItem from "../book-list-item";
import { connect } from "react-redux";

import ErrorIndicator from "../error-indicator";
import { withBookstoreService } from "../hoc";
import { booksRequested, booksLoaded, booksError } from "../../actions";
import { compose } from "../../utils";
import Spinner from "../spinner";
import "./book-list.css";

class BookList extends Component {
  componentDidMount() {
    const {
      bookstoreService,
      booksLoaded,
      booksRequested,
      booksError
    } = this.props;

    booksRequested();

    bookstoreService
      .getBooks()
      .then(data => booksLoaded(data))
      .catch(error => booksError(error));
  }

  render() {
    const { books, loading, error } = this.props;

    if (error !== null) {
      return <ErrorIndicator />;
    }

    if (loading) {
      return <Spinner />;
    }

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
  }
}

const mapStateToProps = ({ books, loading, error }) => {
  return { books, loading, error };
};

const mapDispatchToProps = {
  booksLoaded,
  booksRequested,
  booksError
};

export default compose(
  withBookstoreService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BookList);
