import {
  CLIENT_SET_USER,
  CLIENT_SET_ADDRESS_LIST,
  CLIENT_SET_CREDIT_CARDS,
  CLIENT_SET_ROLES,
  CLIENT_SET_THEME,
  CLIENT_SET_LANGUAGE,
} from "../actions/clientActions";
import { getUser } from "../../auth/auth";

const initialState = {
  user: getUser() || {},
  addressList: [],
  creditCards: [],
  roles: [],
  theme: "light",
  language: "en",
};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_SET_USER:
      return { ...state, user: action.payload || {} };
    case CLIENT_SET_ADDRESS_LIST:
      return { ...state, addressList: Array.isArray(action.payload) ? action.payload : [] };
    case CLIENT_SET_CREDIT_CARDS:
      return { ...state, creditCards: Array.isArray(action.payload) ? action.payload : [] };
    case CLIENT_SET_ROLES:
      return { ...state, roles: Array.isArray(action.payload) ? action.payload : [] };
    case CLIENT_SET_THEME:
      return { ...state, theme: String(action.payload || "") };
    case CLIENT_SET_LANGUAGE:
      return { ...state, language: String(action.payload || "") };
    default:
      return state;
  }
}
