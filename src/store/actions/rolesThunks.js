import { setRoles } from "./clientActions";
import client from "../../api/client";

export const fetchRolesIfNeeded = () => async (dispatch, getState) => {
  const state = getState();
  const roles = state?.client?.roles;

  if (Array.isArray(roles) && roles.length > 0) return;

  try {
    const res = await client.get("/roles");
    dispatch(setRoles(Array.isArray(res.data) ? res.data : []));
  } catch {
    dispatch(setRoles([]));
  }
};
