import { WISHLIST_TOGGLE, WISHLIST_CLEAR } from "../actions/wishlistActions";

const initialState = {
  items: [],
};

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case WISHLIST_TOGGLE: {
      const id = action.payload;
      if (id == null) return state;

      const exists = state.items.some((x) => String(x) === String(id));
      if (exists) return { ...state, items: state.items.filter((x) => String(x) !== String(id)) };
      return { ...state, items: [id, ...state.items] };
    }

    case WISHLIST_CLEAR:
      return initialState;

    default:
      return state;
  }
}
