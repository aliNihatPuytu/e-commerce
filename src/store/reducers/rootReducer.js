import { combineReducers } from "redux";
import clientReducer from "./clientReducer";
import productReducer from "./productsReducer";
import shoppingCartReducer from "./shoppingCartReducer";

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
});

export default rootReducer;
