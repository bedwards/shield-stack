const faqs = [
  {
    question: "Is AfterLoss really free?",
    answer:
      "Yes, completely free. There are no subscriptions, no paywalls, and no hidden fees. We earn revenue through clearly-labeled affiliate partnerships with estate attorneys and grief counseling services \u2014 never from our users.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. You can use every feature without signing up. Your progress saves automatically in your browser. An optional account lets you access your checklist from multiple devices and receive email deadline reminders.",
  },
  {
    question: "What does AfterLoss help with?",
    answer:
      "AfterLoss provides a personalized, state-specific checklist of everything you need to do after someone dies: obtaining death certificates, notifying Social Security, closing bank accounts, cancelling subscriptions, filing insurance claims, navigating probate, handling taxes, and more. We also generate personalized letters and forms for each step.",
  },
  {
    question: "How is AfterLoss different from hiring an estate attorney?",
    answer:
      "AfterLoss guides you through the administrative tasks that don\u2019t require legal expertise \u2014 like cancelling subscriptions, notifying banks, and filing government forms. For complex legal situations (contested wills, large estates, business assets), we recommend consulting an attorney and can connect you with one.",
  },
  {
    question: "Is my information private?",
    answer:
      "Yes. Without an account, all your data stays in your browser\u2019s local storage. With an account, your data is encrypted and stored securely. We never sell personal information and we never show ads.",
  },
  {
    question: "Can I use AfterLoss on my phone?",
    answer:
      "Yes. AfterLoss is designed mobile-first. Many people start this process at a hospital or funeral home, and our interface works well on any screen size.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq-section" data-testid="faq-section" className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2
          data-testid="faq-heading"
          className="text-3xl font-bold text-center text-foreground"
        >
          Frequently asked questions
        </h2>
        <dl data-testid="faq-list" className="mt-12 space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} data-testid={`faq-item-${index}`}>
              <dt className="text-base font-semibold text-foreground">
                {faq.question}
              </dt>
              <dd className="mt-2 text-sm text-muted leading-relaxed">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export { faqs };
