"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function NavAuth() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/account"
          data-testid="nav-account"
          className="text-sm font-medium text-gray-600 hover:text-emerald-700"
        >
          My Account
        </Link>
        <button
          data-testid="nav-signout"
          onClick={async () => {
            await signOut();
            router.push("/");
            router.refresh();
          }}
          className="text-sm font-medium text-gray-600 hover:text-emerald-700"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/auth/login"
      data-testid="nav-login"
      className="text-sm font-medium text-gray-600 hover:text-emerald-700"
    >
      Sign In
    </Link>
  );
}
