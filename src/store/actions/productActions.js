import client from "../../api/client";

export const PRODUCT_SET_CATEGORIES = "PRODUCT_SET_CATEGORIES";
export const PRODUCT_SET_PRODUCT_LIST = "PRODUCT_SET_PRODUCT_LIST";
export const PRODUCT_SET_TOTAL = "PRODUCT_SET_TOTAL";
export const PRODUCT_SET_FETCH_STATE = "PRODUCT_SET_FETCH_STATE";
export const PRODUCT_SET_LIMIT = "PRODUCT_SET_LIMIT";
export const PRODUCT_SET_OFFSET = "PRODUCT_SET_OFFSET";
export const PRODUCT_SET_FILTER = "PRODUCT_SET_FILTER";

export const setCategories = (payload) => ({ type: PRODUCT_SET_CATEGORIES, payload });
export const setProductList = (payload) => ({ type: PRODUCT_SET_PRODUCT_LIST, payload });
export const setTotal = (payload) => ({ type: PRODUCT_SET_TOTAL, payload });
export const setFetchState = (payload) => ({ type: PRODUCT_SET_FETCH_STATE, payload });
export const setLimit = (payload) => ({ type: PRODUCT_SET_LIMIT, payload });
export const setOffset = (payload) => ({ type: PRODUCT_SET_OFFSET, payload });
export const setFilter = (payload) => ({ type: PRODUCT_SET_FILTER, payload });

function normalizeProductsPayload(data) {
  if (Array.isArray(data)) return { list: data, total: data.length };
  const list = data?.products || data?.data || data?.result || [];
  const total = data?.total ?? data?.count ?? (Array.isArray(list) ? list.length : 0);
  return { list: Array.isArray(list) ? list : [], total: Number(total) || 0 };
}

export const fetchProducts = () => async (dispatch) => {
  dispatch(setFetchState("FETCHING"));
  try {
    const res = await client.get("/products");
    const { list, total } = normalizeProductsPayload(res.data);
    dispatch(setProductList(list));
    dispatch(setTotal(total));
    dispatch(setFetchState("FETCHED"));
  } catch {
    dispatch(setFetchState("FAILED"));
  }
};
