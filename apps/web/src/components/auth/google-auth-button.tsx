"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import {
  type AuthResult,
  getPostLoginPath,
  saveAuthSession,
} from "@/lib/auth";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential?: string }) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              theme?: "outline" | "filled_black";
              size?: "large" | "medium" | "small";
              shape?: "pill" | "rectangular" | "circle" | "square";
              width?: number;
              text?: "continue_with" | "signin_with" | "signup_with";
            }
          ) => void;
        };
      };
    };
  }
}

type GoogleAuthButtonProps = {
  mode: "login" | "signup";
  onError: (message: string) => void;
};

const GOOGLE_SCRIPT_ID = "google-identity-services";

let googleScriptPromise: Promise<void> | null = null;
let initializedClientId: string | null = null;
let activeCredentialHandler: ((credential: string) => void) | null = null;

function readGoogleClientId(): string | null {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (typeof raw !== "string") return null;

  const value = raw.trim();

  return value.length > 0 ? value : null;
}

function loadGoogleScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google can only load in the browser"));
  }

  if (window.google) {
    return Promise.resolve();
  }

  if (googleScriptPromise) {
    return googleScriptPromise;
  }

  googleScriptPromise = new Promise<void>((resolve, reject) => {
    let script = document.getElementById(
      GOOGLE_SCRIPT_ID
    ) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = GOOGLE_SCRIPT_ID;
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error("Failed to load Google sign-in")),
      { once: true }
    );
  });

  return googleScriptPromise;
}

export function GoogleAuthButton({ mode, onError }: GoogleAuthButtonProps) {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const clientId = useMemo(() => readGoogleClientId(), []);

  useEffect(() => {
    if (clientId === null) return;

    const googleClientId: string = clientId;
    let cancelled = false;

    async function handleGoogleCredential(credential: string) {
      try {
        const result = await apiRequest<AuthResult>("/auth/google", {
          method: "POST",
          body: {
            idToken: credential,
          },
        });

        saveAuthSession(result.data.user, result.data.tokens);

        if (mode === "signup" && result.data.user.userType === "customer") {
          router.push("/onboarding?source=google");
          return;
        }

        router.push(getPostLoginPath(result.data.user));
      } catch (error) {
        onError(
          error instanceof Error
            ? error.message
            : "Failed to continue with Google"
        );
      }
    }

    async function mountGoogleButton() {
      try {
        await loadGoogleScript();

        if (cancelled || !window.google || !buttonRef.current) return;

        activeCredentialHandler = (credential: string) => {
          void handleGoogleCredential(credential);
        };

        if (initializedClientId !== googleClientId) {
          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: (response) => {
              if (!response.credential) {
                onError("Google did not return a valid sign-in token");
                return;
              }

              activeCredentialHandler?.(response.credential);
            },
          });

          initializedClientId = googleClientId;
        }

        const measuredWidth = Math.floor(
          buttonRef.current.getBoundingClientRect().width
        );

        const buttonWidth = Math.max(280, measuredWidth);

        buttonRef.current.innerHTML = "";

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          shape: "pill",
          width: buttonWidth,
          text: mode === "signup" ? "signup_with" : "continue_with",
        });
      } catch (error) {
        onError(
          error instanceof Error
            ? error.message
            : "Failed to load Google sign-in"
        );
      }
    }

    void mountGoogleButton();

    return () => {
      cancelled = true;
    };
  }, [clientId, mode, onError, router]);

  if (clientId === null) {
    return (
      <button
        type="button"
        disabled
        className="flex h-14 w-full items-center justify-center rounded-full border border-[var(--line)] bg-[var(--soft)] px-6 text-sm font-black text-[var(--muted)]"
      >
        Google Auth Not Configured
      </button>
    );
  }

  return (
    <div className="w-full">
      <div
        ref={buttonRef}
        className="flex h-14 w-full items-center justify-center overflow-hidden rounded-full"
      />
    </div>
  );
}