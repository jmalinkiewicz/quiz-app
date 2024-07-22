import { useUserState } from "./state/user";

export const getUser = () => {
  return useUserState.getState().user;
};
