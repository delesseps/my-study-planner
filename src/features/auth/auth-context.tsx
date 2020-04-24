import React, { useMemo, useContext, useCallback } from "react";
import { useCookies } from "react-cookie";
import { useQuery, useMutation, queryCache } from "react-query";

import { Loading } from "components";
import * as authService from "./auth-service";
import IUser from "constants/interfaces/IUser";
import ISignInCredentials from "constants/interfaces/ISignInCredentials";
import { domain } from "constants/site";
import ISignUpCredentials from "constants/interfaces/ISignUpCredentials";

interface IAuthContext {
  user: IUser;
  login: (form: ISignInCredentials) => Promise<any>;
  register: (form: ISignUpCredentials) => Promise<any>;
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
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
    }
  );

  const [loginMutation] = useMutation(authService.login, {
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

  const [registerMutation] = useMutation(authService.register, {
    onSuccess: (data) => {
      queryCache.setQueryData(["user"], data);

      setCookie("IS_LOGGED_IN", true, {
        httpOnly: false,
        domain,
      });
    },
  });

  const login = useCallback((form: ISignInCredentials) => loginMutation(form), [
    loginMutation,
  ]);

  const register = useCallback(
    (form: ISignUpCredentials) => registerMutation(form),
    [registerMutation]
  );

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
