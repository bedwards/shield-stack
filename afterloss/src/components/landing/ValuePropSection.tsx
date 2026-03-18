export default function ValuePropSection() {
  const stats = [
    {
      id: "stat-states",
      value: "51",
      label: "State & DC Guides",
      description: "Probate rules for every jurisdiction",
    },
    {
      id: "stat-documents",
      value: "100+",
      label: "Document Templates",
      description: "Letters, forms, and notifications",
    },
    {
      id: "stat-price",
      value: "$0",
      label: "Always Free",
      description: "No subscriptions, no paywalls",
    },
  ];

  return (
    <section data-testid="value-prop-section" className="bg-secondary py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          data-testid="value-prop-heading"
          className="text-2xl font-bold text-center text-foreground"
        >
          Free. Step-by-step. Personalized to your state.
        </h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.id} data-testid={stat.id} className="p-6">
              <p className="text-4xl font-bold text-primary">{stat.value}</p>
              <p className="mt-2 text-base font-semibold text-foreground">
                {stat.label}
              </p>
              <p className="mt-1 text-sm text-muted">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
