export const CLIENT_SET_USER = "CLIENT/SET_USER";
export const CLIENT_SET_ADDRESS_LIST = "CLIENT/SET_ADDRESS_LIST";
export const CLIENT_SET_CREDIT_CARDS = "CLIENT/SET_CREDIT_CARDS";
export const CLIENT_SET_ROLES = "CLIENT/SET_ROLES";
export const CLIENT_SET_THEME = "CLIENT/SET_THEME";
export const CLIENT_SET_LANGUAGE = "CLIENT/SET_LANGUAGE";

export const setUser = (user) => ({ type: CLIENT_SET_USER, payload: user });
export const setAddressList = (list) => ({ type: CLIENT_SET_ADDRESS_LIST, payload: list });
export const setCreditCards = (list) => ({ type: CLIENT_SET_CREDIT_CARDS, payload: list });
export const setRoles = (roles) => ({ type: CLIENT_SET_ROLES, payload: roles });
export const setTheme = (theme) => ({ type: CLIENT_SET_THEME, payload: theme });
export const setLanguage = (language) => ({ type: CLIENT_SET_LANGUAGE, payload: language });
