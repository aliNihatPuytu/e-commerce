const initialState = {
  loading: false,
  error: null,
  items: [],
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case "PRODUCTS_FETCH_START":
      return { ...state, loading: true, error: null };
    case "PRODUCTS_FETCH_SUCCESS":
      return { ...state, loading: false, items: action.payload };
    case "PRODUCTS_FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
