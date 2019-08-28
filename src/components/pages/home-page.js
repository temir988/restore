import React from "react";
import BookList from "../book-list";

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <BookList books={[]} />
    </div>
  );
};

export default HomePage;
