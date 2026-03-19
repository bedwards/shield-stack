import Link from "next/link";

export function HeroSection() {
  return (
    <section
      data-testid="hero-section"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center"
    >
      <h1
        data-testid="hero-title"
        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
      >
        Does that company{" "}
        <span className="text-primary">ghost applicants?</span>
      </h1>
      <p
        data-testid="hero-subtitle"
        className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto"
      >
        Search any employer and see their ghosting rate before you apply. Real
        data from real job seekers.
      </p>

      <div data-testid="hero-search" className="mt-10 max-w-xl mx-auto">
        <form
          data-testid="search-form"
          className="flex gap-2"
          action="/search"
          method="GET"
        >
          <input
            type="text"
            name="q"
            data-testid="search-input"
            placeholder="Search company name..."
            className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            data-testid="search-button"
            className="rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary-hover transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted">
        <span>Try:</span>
        {["Google", "Amazon", "Meta", "Microsoft"].map((company) => (
          <Link
            key={company}
            href={`/company/${company.toLowerCase()}`}
            data-testid={`hero-example-${company.toLowerCase()}`}
            className="text-primary hover:underline"
          >
            {company}
          </Link>
        ))}
      </div>
    </section>
  );
}
