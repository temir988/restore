const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 220
};

const updateCartItems = (cartItems, item, index) => {
  if (index === -1) {
    return [...cartItems, item];
  }
  return [...cartItems.slice(0, index), item, ...cartItems.slice(index + 1)];
};

const updateCartItem = (book, item = {}) => {
  const { id = book.id, count = 0, title = book.title, total = 0 } = item;

  return {
    id,
    title,
    count: count + 1,
    total: total + book.price
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_REQUEST":
      return {
        ...state,
        books: [],
        loading: true,
        error: null
      };
    case "FETCH_BOOKS_SUCCESS":
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };
    case "FETCH_BOOKS_FAILURE":
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      };
    case "BOOK_ADDED_TO_CART":
      const bookId = action.payload;
      const book = state.books.find(book => book.id === bookId);
      const bookInCartIndex = state.cartItems.findIndex(
        ({ id }) => id === bookId
      );
      const bookInCart = state.cartItems[bookInCartIndex];

      const newItem = updateCartItem(book, bookInCart);
      return {
        ...state,
        cartItems: updateCartItems(state.cartItems, newItem, bookInCartIndex)
      };

    default:
      return state;
  }
};

export default reducer;
