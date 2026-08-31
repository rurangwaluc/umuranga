"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { AuthRedirectState } from "@/components/auth/auth-redirect-state";
import { apiRequest } from "@/lib/api";
import {
  type AuthResult,
  getPostLoginPath,
  saveAuthSession,
  useAuthUser,
} from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const currentUser = useAuthUser();

  const [email, setEmail] = useState("customer@umuranga.test");
  const [password, setPassword] = useState("Password123!");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    router.replace(getPostLoginPath(currentUser));
  }, [currentUser, router]);

  const handleGoogleError = useCallback((message: string) => {
    setNotice(message);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    setLoading(true);

    try {
      const result = await apiRequest<AuthResult>("/auth/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });

      saveAuthSession(result.data.user, result.data.tokens);
      router.replace(getPostLoginPath(result.data.user));
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Failed to login");
    } finally {
      setLoading(false);
    }
  }

if (currentUser) {
  return (
    <AuthRedirectState
      title="You Are Already Signed In."
      message="Your UMURANGA session is active. We are taking you to the right workspace for your account."
    />
  );
}

  return (
    <AuthShell
      activePage="login"
      eyebrow="Welcome Back"
      title="Sign In To Your UMURANGA Account."
      description="Use your account to save listings, request viewings, manage professional profiles, or access the platform owner dashboard."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {notice ? (
          <div className="rounded-2xl border border-[#b8d879]/40 bg-[#b8d879]/15 px-4 py-3 text-sm font-bold text-[var(--foreground)]">
            {notice}
          </div>
        ) : null}

        <GoogleAuthButton mode="login" onError={handleGoogleError} />

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--line)]" />
          <span className="text-xs font-black text-[var(--muted)]">
            OR CONTINUE WITH EMAIL
          </span>
          <div className="h-px flex-1 bg-[var(--line)]" />
        </div>

        <AuthInput
          label="Email"
          name="email"
          type="email"
          value={email}
          placeholder="you@example.com"
          autoComplete="email"
          onChange={setEmail}
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
          value={password}
          placeholder="Enter your password"
          autoComplete="current-password"
          onChange={setPassword}
        />

        <AuthSubmitButton loading={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </AuthSubmitButton>

        <p className="text-center text-sm text-[var(--muted)]">
          New to UMURANGA?{" "}
          <Link
            href="/signup"
            className="font-black text-[var(--foreground)] underline"
          >
            Create Account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}