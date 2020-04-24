import React, { useMemo, useContext, useCallback } from "react";
import { useCookies } from "react-cookie";
import {
  useQuery,
  useMutation,
  queryCache,
  MutateFunction,
  MutationResult,
} from "react-query";

import { Loading } from "components";
import * as authService from "./auth-service";
import IUser from "constants/interfaces/IUser";
import { domain } from "constants/site";
import ISignInCredentials from "constants/interfaces/ISignInCredentials";
import ISignUpCredentials from "constants/interfaces/ISignUpCredentials";
import { AxiosResponse } from "axios";

interface IAuthContext {
  user: IUser;
  login: [
    MutateFunction<AxiosResponse<IUser>, ISignInCredentials>,
    MutationResult<AxiosResponse<IUser>>
  ];
  register: [
    MutateFunction<AxiosResponse<IUser>, ISignUpCredentials>,
    MutationResult<AxiosResponse<IUser>>
  ];
  logout: () => Promise<any>;
}

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);
AuthContext.displayName = "AuthContext";

export function AuthProvider(props: any) {
  const [{ IS_LOGGED_IN: isLoggedIn }, setCookie, removeCookie] = useCookies([
    "IS_LOGGED_IN",
  ]);

  const { data, status } = useQuery(
    isLoggedIn ? "user" : null,
    authService.getUser,
    {
      cacheTime: 1000 * 60 * 60,
    }
  );

  const login = useMutation(authService.login, {
    onSuccess: (data, { remember }) => {
      queryCache.setQueryData(["user"], data);

      const maxAge = 30 * 24 * 60 * 60 * 1000; //Expires in 30 days

      setCookie("IS_LOGGED_IN", true, {
        ...(remember && { maxAge }),
        httpOnly: false,
        domain,
      });
    },
  });

  const register = useMutation(authService.register, {
    onSuccess: (data) => {
      queryCache.setQueryData(["user"], data);

      setCookie("IS_LOGGED_IN", true, {
        httpOnly: false,
        domain,
      });
    },
  });

  const logout = useCallback(
    () =>
      authService
        .logout()
        .then(() => {
          queryCache.clear();
        })
        .then(() => {
          removeCookie("IS_LOGGED_IN", { path: "/", domain });
        }),
    [removeCookie]
  );

  const user = data;
  const value = useMemo(() => ({ user, login, logout, register }), [
    user,
    login,
    logout,
    register,
  ]);

  if (status === "loading") {
    return <Loading />;
  }

  return <AuthContext.Provider value={value} {...props} />;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "To use `useAuth`, component must be within a Auth provider"
    );
  }
  return context;
}
