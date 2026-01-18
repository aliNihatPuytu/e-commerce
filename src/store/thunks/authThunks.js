import { setUser } from "../actions/clientActions";
import { verifyToken } from "../../api/api";
import { clearRememberedToken, hasRememberedToken, setRememberedToken } from "../../auth/auth";

function pickUserObject(data) {
  if (!data) return {};
  if (data.user && typeof data.user === "object") return data.user;
  if (data.email) return data;
  return data;
}

export const autoLoginByRememberedToken = () => async (dispatch) => {
  if (!hasRememberedToken()) return;

  const res = await verifyToken();

  if (!res.ok) {
    clearRememberedToken();
    dispatch(setUser({}));
    window.dispatchEvent(new Event("auth"));
    return;
  }

  if (res.token) setRememberedToken(res.token);

  dispatch(setUser(pickUserObject(res.data)));
  window.dispatchEvent(new Event("auth"));
};
