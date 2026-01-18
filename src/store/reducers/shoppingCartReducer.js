import {
  CART_ADD,
  CART_REMOVE,
  CART_SET_COUNT,
  CART_TOGGLE_CHECKED,
  CART_SET_ALL_CHECKED,
  CART_CLEAR,
} from "../actions/shoppingCartActions";

const initialState = {
  cart: [],
};

function pickId(p) {
  return p?.id ?? p?.product_id ?? p?.productId;
}

function sameId(a, b) {
  return String(a) === String(b);
}

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD: {
      const product = action.payload;
      const id = pickId(product);
      if (id == null) return state;

      const idx = state.cart.findIndex((x) => sameId(pickId(x.product), id));
      if (idx >= 0) {
        const next = state.cart.slice();
        const row = next[idx];
        next[idx] = { ...row, count: (Number(row.count) || 0) + 1 };
        return { ...state, cart: next };
      }

      return {
        ...state,
        cart: [{ count: 1, checked: true, product }, ...state.cart],
      };
    }

    case CART_REMOVE: {
      const id = action.payload;
      return { ...state, cart: state.cart.filter((x) => !sameId(pickId(x.product), id)) };
    }

    case CART_SET_COUNT: {
      const { productId, count } = action.payload || {};
      const id = productId;
      const nextCount = Math.max(1, Number(count) || 1);

      return {
        ...state,
        cart: state.cart.map((x) =>
          sameId(pickId(x.product), id) ? { ...x, count: nextCount } : x
        ),
      };
    }

    case CART_TOGGLE_CHECKED: {
      const id = action.payload;
      return {
        ...state,
        cart: state.cart.map((x) =>
          sameId(pickId(x.product), id) ? { ...x, checked: !x.checked } : x
        ),
      };
    }

    case CART_SET_ALL_CHECKED: {
      const checked = !!action.payload;
      return { ...state, cart: state.cart.map((x) => ({ ...x, checked })) };
    }

    case CART_CLEAR:
      return initialState;

    default:
      return state;
  }
}
