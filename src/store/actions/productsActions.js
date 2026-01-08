import client from "../../api/client";

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: "PRODUCTS_FETCH_START" });
  try {
    const res = await client.get("/products");
    dispatch({ type: "PRODUCTS_FETCH_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({
      type: "PRODUCTS_FETCH_ERROR",
      payload: err?.message || "Request failed",
    });
  }
};
