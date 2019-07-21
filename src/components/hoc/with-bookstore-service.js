import React from "react";

import { BookstoreConsumer } from "../bookstore-service-context";

const withBookstoreService = () => Wrapped => {
  return props => {
    return (
      <BookstoreConsumer>
        {BookstoreService => {
          return <Wrapped {...props} BookstoreService={BookstoreService} />;
        }}
      </BookstoreConsumer>
    );
  };
};

export default withBookstoreService;
