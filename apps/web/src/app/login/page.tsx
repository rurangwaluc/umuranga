"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { AuthRedirectState } from "@/components/auth/auth-redirect-state";
import { SocialAuthButton } from "@/components/auth/social-auth-button";
import { getPostLoginPath, useAuthUser } from "@/lib/auth";

type SocialProvider = "google" | "facebook" | "apple";

export default function LoginPage() {
  const router = useRouter();
  const currentUser = useAuthUser();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    router.replace(getPostLoginPath(currentUser));
  }, [currentUser, router]);

  const handleSocialAuth = useCallback((provider: SocialProvider) => {
    setNotice(`${provider[0].toUpperCase()}${provider.slice(1)} sign-in will continue after social auth is connected.`);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    setLoading(true);

    window.setTimeout(() => {
      setNotice("OTP sign-in design is ready. Backend connection comes next.");
      setLoading(false);
    }, 500);
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
      title="Sign in to UMURANGA."
      description="Use email OTP or continue with Google, Facebook, or Apple. No password required."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {notice ? (
          <div className="rounded-[9px] border border-[var(--line)] bg-[var(--soft)] px-4 py-3 text-sm font-bold leading-6 text-[var(--foreground)] dark:bg-white/[0.035]">
            {notice}
          </div>
        ) : null}

        <AuthInput
          label="Email address"
          name="email"
          type="email"
          value={email}
          placeholder="you@example.com"
          autoComplete="email"
          onChange={setEmail}
        />

        <AuthSubmitButton loading={loading}>
          {loading ? "Preparing code..." : "Send one-time code"}
        </AuthSubmitButton>

        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-[var(--line)]" />
          <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--muted)]">
            Or
          </span>
          <div className="h-px flex-1 bg-[var(--line)]" />
        </div>

        <div className="space-y-3">
          <SocialAuthButton provider="google" onClick={handleSocialAuth} />
          <SocialAuthButton provider="facebook" onClick={handleSocialAuth} />
          <SocialAuthButton provider="apple" onClick={handleSocialAuth} />
        </div>

        <p className="pt-1 text-center text-sm font-bold text-[var(--muted)]">
          New to UMURANGA?{" "}
          <Link href="/signup" className="font-black text-[var(--foreground)] underline">
            Create account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
