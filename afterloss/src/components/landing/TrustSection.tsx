const trustPoints = [
  {
    id: "trust-free",
    title: "100% free, forever",
    description:
      "No subscriptions, no hidden fees, no paywalls. Every feature is free for every family. We believe no one should pay for help during their hardest days.",
  },
  {
    id: "trust-no-account",
    title: "No account required",
    description:
      "Start using AfterLoss immediately \u2014 no signup, no email, no password. Your progress saves in your browser. Create an account only if you want email reminders.",
  },
  {
    id: "trust-private",
    title: "Private and secure",
    description:
      "Your information stays on your device unless you choose to create an account. We never sell data. We never show ads. We respect your family\u2019s privacy.",
  },
  {
    id: "trust-pace",
    title: "Go at your own pace",
    description:
      "Grief doesn\u2019t follow a schedule. Pause anytime, come back whenever you\u2019re ready. There are no deadlines on our end \u2014 only gentle reminders for the ones that matter.",
  },
];

export default function TrustSection() {
  return (
    <section data-testid="trust-section" className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          data-testid="trust-heading"
          className="text-3xl font-bold text-center text-foreground"
        >
          Built with care for families like yours
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {trustPoints.map((point) => (
            <div
              key={point.id}
              data-testid={point.id}
              className="rounded-xl bg-card p-8 shadow-sm border border-border"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {point.title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
