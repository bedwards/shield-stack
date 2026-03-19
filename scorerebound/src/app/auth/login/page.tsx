import LoginForm from "@/components/auth/LoginForm";

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirect } = await searchParams;

  return (
    <div data-testid="login-page" className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 data-testid="login-title" className="text-2xl font-bold text-gray-900">
            Sign in to ScoreRebound
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Save your recovery plan and track your progress
          </p>
        </div>
        <LoginForm redirectTo={redirect} />
      </div>
    </div>
  );
}
