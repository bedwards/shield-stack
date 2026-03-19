export const guideFaqs = [
  {
    question: "How many death certificates should I order?",
    answer:
      "Order at least 10–15 certified copies. You'll need one for each bank, insurance company, government agency, and financial institution. Certified copies typically cost $5–$25 each depending on your state. Your funeral home can order them for you, or you can order online through your county vital records office.",
  },
  {
    question: "Do I need a lawyer for probate?",
    answer:
      "Not always. Many states offer simplified probate procedures for small estates — typically those under $50,000–$200,000 (thresholds vary by state). A small estate affidavit can often bypass formal probate entirely. An attorney is recommended for large or complex estates, contested wills, or estates with business assets or real property in multiple states.",
  },
  {
    question: "How long does probate take?",
    answer:
      "Simple estates with no disputes typically take 6–12 months. Complex estates with real property, business interests, or family disagreements can take 1–3 years. Some assets (life insurance, retirement accounts with named beneficiaries, jointly-held property) pass outside probate entirely and can be accessed much sooner.",
  },
  {
    question: "What happens if there's no will?",
    answer:
      "When someone dies without a will (\"intestate\"), state law determines who inherits. Typically the surviving spouse and children inherit first. The probate court appoints an administrator to manage the estate. The process is similar to probate with a will, but the court follows a statutory distribution order rather than the deceased's wishes.",
  },
  {
    question: "Can I access the deceased's bank account right away?",
    answer:
      "If you're a joint account holder, you retain full access. For individual accounts, banks freeze them upon notification of death. To access the funds, you'll need Letters Testamentary (if there's a will) or Letters of Administration (if there's no will) from the probate court, plus a certified death certificate. This process usually takes 2–6 weeks.",
  },
  {
    question: "Am I personally responsible for the deceased's debts?",
    answer:
      "Generally, no. Debts are paid from the estate's assets, not your personal funds. Exceptions: if you co-signed a loan, if you're a joint account holder, or if you live in a community property state (the surviving spouse may be responsible for marital debts). Creditors cannot legally demand payment from you personally for the deceased's individual debts.",
  },
  {
    question: "When should I notify Social Security?",
    answer:
      "As soon as possible, ideally within the first week. Call 800-772-1213 (this cannot be done online). The funeral home may have already filed an electronic death report, but always confirm directly. Stopping benefits promptly prevents overpayment, which SSA will require the estate to repay. Ask about the $255 lump-sum death benefit and survivor benefits while you're on the call.",
  },
  {
    question: "What tax forms need to be filed after someone dies?",
    answer:
      "At minimum: a final Form 1040 (personal income tax return) for the year of death, due April 15 of the following year. If the estate earns more than $600 in income, you must also file Form 1041 (estate income tax return). If the estate exceeds $15 million, file Form 706 (estate tax return) within 9 months. Even under the threshold, consider filing Form 706 to preserve the portability election for a surviving spouse.",
  },
  {
    question: "Do most families owe federal estate tax?",
    answer:
      "No. The federal estate tax exemption is $15 million per individual ($30 million for married couples) as of 2026. This means over 99% of families will NOT owe any federal estate tax. Some states have their own estate or inheritance taxes with lower thresholds — check your state's rules.",
  },
  {
    question: "What is a small estate affidavit?",
    answer:
      "A small estate affidavit is a simplified legal document that lets you transfer a deceased person's assets without going through formal probate. Each state sets its own threshold — for example, California allows it for estates up to $208,850, while Georgia's threshold is $10,000. It's faster, cheaper, and simpler than full probate. Check your state's specific threshold and requirements.",
  },
  {
    question: "How do I cancel all the deceased's subscriptions?",
    answer:
      "Start by checking bank and credit card statements for recurring charges. Common subscriptions to cancel: streaming services (Netflix, Spotify, etc.), gym memberships, magazine and newspaper subscriptions, software licenses, app subscriptions, meal delivery services, and membership clubs. Most can be cancelled by phone or through the service's website. AfterLoss provides templates for every cancellation — for free.",
  },
  {
    question:
      "What is the difference between an executor and an administrator?",
    answer:
      "An executor is named in the will to manage the estate. An administrator is appointed by the probate court when there's no will, or when the named executor can't or won't serve. Both have the same responsibilities: inventorying assets, paying debts, filing taxes, and distributing assets to beneficiaries. The court issues Letters Testamentary (executor) or Letters of Administration (administrator) as proof of authority.",
  },
];

export default function FaqSection() {
  return (
    <section
      id="faq"
      data-testid="guide-faq-section"
      className="mt-16"
    >
      <h2
        data-testid="guide-faq-heading"
        className="text-2xl font-bold text-foreground mb-8"
      >
        Frequently Asked Questions
      </h2>
      <dl data-testid="guide-faq-list" className="space-y-8">
        {guideFaqs.map((faq, index) => (
          <div key={index} data-testid={`guide-faq-item-${index}`}>
            <dt className="text-base font-semibold text-foreground">
              {faq.question}
            </dt>
            <dd className="mt-2 text-sm text-muted leading-relaxed">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
