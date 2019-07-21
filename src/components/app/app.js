import React from "react";
import "./app.css";
import { withBookstoreService } from "../hoc";

const App = ({ bookstoreService }) => {
  console.log(bookstoreService.getBooks());
  return <h1>Hello world from App!</h1>;
};

export default withBookstoreService()(App);
