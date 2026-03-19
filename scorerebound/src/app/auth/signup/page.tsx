import SignUpForm from "@/components/auth/SignUpForm";

interface SignUpPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { redirect } = await searchParams;

  return (
    <div data-testid="signup-page" className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 data-testid="signup-title" className="text-2xl font-bold text-gray-900">
            Create your ScoreRebound account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Save your recovery plan, track progress, and get personalized updates
          </p>
        </div>
        <SignUpForm redirectTo={redirect} />
      </div>
    </div>
  );
}
