export const ORDER_BOOK_ACTIONS = {
  UPDATE_ORDER_BOOK: 'UPDATE_ORDER_BOOK'
};

export const updateOrderBook = data => ({
  type: ORDER_BOOK_ACTIONS.UPDATE_ORDER_BOOK,
  payload: data
});
