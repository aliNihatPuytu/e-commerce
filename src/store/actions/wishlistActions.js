export const WISHLIST_TOGGLE = "WISHLIST_TOGGLE";
export const WISHLIST_CLEAR = "WISHLIST_CLEAR";

export const toggleWishlist = (productId) => ({ type: WISHLIST_TOGGLE, payload: productId });
export const clearWishlist = () => ({ type: WISHLIST_CLEAR });
