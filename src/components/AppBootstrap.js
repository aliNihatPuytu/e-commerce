import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { autoLoginByRememberedToken } from "../store/thunks/authThunks";

export default function AppBootstrap() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLoginByRememberedToken());
  }, [dispatch]);

  return null;
}
