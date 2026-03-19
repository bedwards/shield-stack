export function StatsSection() {
  return (
    <section data-testid="stats-section" className="bg-secondary py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div data-testid="stat-companies">
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="mt-2 text-sm text-muted">Companies Tracked</p>
          </div>
          <div data-testid="stat-reports">
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="mt-2 text-sm text-muted">Reports Submitted</p>
          </div>
          <div data-testid="stat-ghosting-rate">
            <p className="text-3xl font-bold text-accent">--</p>
            <p className="mt-2 text-sm text-muted">Avg Ghosting Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
