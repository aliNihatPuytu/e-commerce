export const CART_ADD = "CART_ADD";
export const CART_REMOVE = "CART_REMOVE";
export const CART_SET_COUNT = "CART_SET_COUNT";
export const CART_TOGGLE_CHECKED = "CART_TOGGLE_CHECKED";
export const CART_SET_ALL_CHECKED = "CART_SET_ALL_CHECKED";
export const CART_CLEAR = "CART_CLEAR";

export const addToCart = (product) => ({ type: CART_ADD, payload: product });
export const removeFromCart = (productId) => ({ type: CART_REMOVE, payload: productId });
export const setCartItemCount = (productId, count) => ({ type: CART_SET_COUNT, payload: { productId, count } });
export const toggleCartItemChecked = (productId) => ({ type: CART_TOGGLE_CHECKED, payload: productId });
export const setAllCartChecked = (checked) => ({ type: CART_SET_ALL_CHECKED, payload: !!checked });
export const clearCart = () => ({ type: CART_CLEAR });
