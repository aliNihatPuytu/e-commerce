export const CART_SET_CART = "CART/SET_CART";
export const CART_SET_PAYMENT = "CART/SET_PAYMENT";
export const CART_SET_ADDRESS = "CART/SET_ADDRESS";

export const setCart = (cart) => ({ type: CART_SET_CART, payload: cart });
export const setPayment = (payment) => ({ type: CART_SET_PAYMENT, payload: payment });
export const setAddress = (address) => ({ type: CART_SET_ADDRESS, payload: address });
