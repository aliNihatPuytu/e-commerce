import {
  CART_SET_CART,
  CART_SET_PAYMENT,
  CART_SET_ADDRESS,
} from "../actions/shoppingCartActions";

const initialState = {
  cart: [],
  payment: {},
  address: {},
};

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_SET_CART:
      return { ...state, cart: Array.isArray(action.payload) ? action.payload : [] };
    case CART_SET_PAYMENT:
      return { ...state, payment: action.payload && typeof action.payload === "object" ? action.payload : {} };
    case CART_SET_ADDRESS:
      return { ...state, address: action.payload && typeof action.payload === "object" ? action.payload : {} };
    default:
      return state;
  }
}
