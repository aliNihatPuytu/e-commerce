import {
  PRODUCT_SET_CATEGORIES,
  PRODUCT_SET_PRODUCT_LIST,
  PRODUCT_SET_TOTAL,
  PRODUCT_SET_FETCH_STATE,
  PRODUCT_SET_LIMIT,
  PRODUCT_SET_OFFSET,
  PRODUCT_SET_FILTER,
} from "../actions/productActions";

const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: "",
  fetchState: "NOT_FETCHED",
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_SET_CATEGORIES:
      return { ...state, categories: Array.isArray(action.payload) ? action.payload : [] };
    case PRODUCT_SET_PRODUCT_LIST:
      return { ...state, productList: Array.isArray(action.payload) ? action.payload : [] };
    case PRODUCT_SET_TOTAL:
      return { ...state, total: Number(action.payload) || 0 };
    case PRODUCT_SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    case PRODUCT_SET_LIMIT:
      return { ...state, limit: Number(action.payload) || 25 };
    case PRODUCT_SET_OFFSET:
      return { ...state, offset: Number(action.payload) || 0 };
    case PRODUCT_SET_FILTER:
      return { ...state, filter: String(action.payload || "") };
    default:
      return state;
  }
}
