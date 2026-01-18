import client from "../../api/client";

export const PRODUCT_SET_CATEGORIES = "PRODUCT_SET_CATEGORIES";
export const PRODUCT_SET_PRODUCT_LIST = "PRODUCT_SET_PRODUCT_LIST";
export const PRODUCT_SET_TOTAL = "PRODUCT_SET_TOTAL";
export const PRODUCT_SET_FETCH_STATE = "PRODUCT_SET_FETCH_STATE";
export const PRODUCT_SET_LIMIT = "PRODUCT_SET_LIMIT";
export const PRODUCT_SET_OFFSET = "PRODUCT_SET_OFFSET";
export const PRODUCT_SET_FILTER = "PRODUCT_SET_FILTER";
export const PRODUCT_SET_SORT = "PRODUCT_SET_SORT";

export const setCategories = (payload) => ({ type: PRODUCT_SET_CATEGORIES, payload });
export const setProductList = (payload) => ({ type: PRODUCT_SET_PRODUCT_LIST, payload });
export const setTotal = (payload) => ({ type: PRODUCT_SET_TOTAL, payload });
export const setFetchState = (payload) => ({ type: PRODUCT_SET_FETCH_STATE, payload });
export const setLimit = (payload) => ({ type: PRODUCT_SET_LIMIT, payload });
export const setOffset = (payload) => ({ type: PRODUCT_SET_OFFSET, payload });
export const setFilter = (payload) => ({ type: PRODUCT_SET_FILTER, payload });
export const setSort = (payload) => ({ type: PRODUCT_SET_SORT, payload });

function normalizeProductsPayload(data) {
  if (Array.isArray(data)) return { list: data, total: data.length };
  const list = data?.products || data?.data || data?.result || [];
  const total = data?.total ?? data?.count ?? (Array.isArray(list) ? list.length : 0);
  return { list: Array.isArray(list) ? list : [], total: Number(total) || 0 };
}

function normalizeCategoriesPayload(data) {
  if (Array.isArray(data)) return data;
  const list = data?.categories || data?.data || data?.result || [];
  return Array.isArray(list) ? list : [];
}

export function slugifyTr(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replaceAll("ı", "i")
    .replaceAll("İ", "i")
    .replaceAll("ş", "s")
    .replaceAll("Ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("Ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("Ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("Ö", "o")
    .replaceAll("ç", "c")
    .replaceAll("Ç", "c")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

function cleanParams(params) {
  const out = {};
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    const s = String(v);
    if (s.trim() === "") return;
    out[k] = v;
  });
  return out;
}

export const fetchProducts =
  ({ category, filter, sort, limit, offset } = {}) =>
  async (dispatch) => {
    dispatch(setFetchState("FETCHING"));
    try {
      const params = cleanParams({
        category,
        filter,
        sort,
        limit,
        offset,
      });

      const res = await client.get("/products", { params });
      const { list, total } = normalizeProductsPayload(res.data);

      dispatch(setProductList(list));
      dispatch(setTotal(total));
      dispatch(setFetchState("FETCHED"));
    } catch {
      dispatch(setFetchState("FAILED"));
    }
  };

export const fetchCategories = () => async (dispatch) => {
  try {
    const res = await client.get("/categories");
    const list = normalizeCategoriesPayload(res.data);
    dispatch(setCategories(list));
  } catch {
    dispatch(setCategories([]));
  }
};

export const ensureCategories = () => (dispatch, getState) => {
  const list = getState?.()?.product?.categories;
  if (Array.isArray(list) && list.length > 0) return;
  dispatch(fetchCategories());
};
