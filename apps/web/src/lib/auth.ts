"use client";

import { useSyncExternalStore } from "react";

const ACCESS_TOKEN_KEY = "umuranga_access_token";
const REFRESH_TOKEN_KEY = "umuranga_refresh_token";
const AUTH_USER_KEY = "umuranga_auth_user";
const AUTH_SESSION_EVENT = "umuranga-auth-session-changed";

type GoogleAutoSelectWindow = Window & {
  google?: {
    accounts?: {
      id?: {
        disableAutoSelect?: () => void;
      };
    };
  };
};

export type UserType =
  | "customer"
  | "landlord"
  | "agency"
  | "agent"
  | "partner"
  | "platform";

export type PlatformRole =
  | "platform_owner"
  | "platform_admin"
  | "platform_support";

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  userType: UserType;
  platformRole: PlatformRole | null;
  landlordProfileId: string | null;
  agencyProfileId: string | null;
  agentProfileId: string | null;
  partnerProfileId: string | null;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResult = {
  ok: true;
  data: {
    user: AuthUser;
    tokens: AuthTokens;
  };
};

let cachedRawUser: string | null | undefined = undefined;
let cachedParsedUser: AuthUser | null = null;

function emitAuthSessionChange() {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new Event(AUTH_SESSION_EVENT));
}

function disableGoogleAutoSelect() {
  if (typeof window === "undefined") return;

  const googleWindow = window as GoogleAutoSelectWindow;

  googleWindow.google?.accounts?.id?.disableAutoSelect?.();
}

function subscribeToAuthSession(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  function handleStorage(event: StorageEvent) {
    if (
      event.key === AUTH_USER_KEY ||
      event.key === ACCESS_TOKEN_KEY ||
      event.key === REFRESH_TOKEN_KEY
    ) {
      callback();
    }
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(AUTH_SESSION_EVENT, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(AUTH_SESSION_EVENT, callback);
  };
}

function getStoredUserSnapshot(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const rawUser = window.localStorage.getItem(AUTH_USER_KEY);

  if (rawUser === cachedRawUser) {
    return cachedParsedUser;
  }

  cachedRawUser = rawUser;

  if (!rawUser) {
    cachedParsedUser = null;
    return cachedParsedUser;
  }

  try {
    cachedParsedUser = JSON.parse(rawUser) as AuthUser;
    return cachedParsedUser;
  } catch {
    cachedParsedUser = null;
    return cachedParsedUser;
  }
}

function getServerUserSnapshot(): AuthUser | null {
  return null;
}

export function useAuthUser() {
  return useSyncExternalStore(
    subscribeToAuthSession,
    getStoredUserSnapshot,
    getServerUserSnapshot
  );
}

export function saveAuthSession(user: AuthUser, tokens: AuthTokens) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

  cachedRawUser = undefined;
  cachedParsedUser = null;

  emitAuthSessionChange();
}

export function getAccessToken() {
  if (typeof window === "undefined") return null;

  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null;

  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  return getStoredUserSnapshot();
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;

  disableGoogleAutoSelect();

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_USER_KEY);

  cachedRawUser = undefined;
  cachedParsedUser = null;

  emitAuthSessionChange();
}

export function getPostLoginPath(user: AuthUser) {
  if (user.userType === "platform") return "/platform";
  if (user.userType === "landlord") return "/landlord";
  if (user.userType === "agency") return "/agency";
  if (user.userType === "agent") return "/agent";
  if (user.userType === "partner") return "/partner";

  return "/customer";
}

export function getDashboardLabel(user: AuthUser | null) {
  if (!user) return "Dashboard";

  if (user.userType === "platform") return "Platform";
  if (user.userType === "landlord") return "Landlord";
  if (user.userType === "agency") return "Agency";
  if (user.userType === "agent") return "Agent";
  if (user.userType === "partner") return "Partner";

  return "Customer";
}