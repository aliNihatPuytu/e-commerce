import { combineReducers } from "redux";
import clientReducer from "./clientReducer";
import productReducer from "./productsReducer";
import shoppingCartReducer from "./shoppingCartReducer";
import wishlistReducer from "./wishlistReducer";

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
  wishlist: wishlistReducer,
});

export default rootReducer;
