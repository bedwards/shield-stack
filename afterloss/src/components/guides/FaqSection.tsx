export interface GuideFaqItem {
  question: string;
  answer: string;
}

export const guideFaqs: GuideFaqItem[] = [
  {
    question: "What is the very first thing I should do when someone dies?",
    answer:
      "If the death occurs at home, call 911 (or the local non-emergency number if expected/hospice). If at a hospital or care facility, staff will guide you. The immediate priorities are: get a legal pronouncement of death, contact a funeral home, and notify close family members. Everything else can wait.",
  },
  {
    question: "How many certified death certificates do I need?",
    answer:
      "Order at least 10-15 certified copies. You'll need one for each bank, insurance company, investment account, government agency, and the court (for probate). Some institutions accept copies, but many require originals. It's much easier to order extras upfront than to request more later — additional copies typically cost $5-25 each from vital records.",
  },
  {
    question: "How do I report the death to Social Security?",
    answer:
      "Call Social Security at 800-772-1213 (TTY: 1-800-325-0778) or visit your local Social Security office. You cannot report a death online. The funeral home may have already submitted an Electronic Death Registration (EDR), but always call to confirm. Social Security will stop benefit payments and issue any final payments due.",
  },
  {
    question: "Do I need a lawyer for probate?",
    answer:
      "Not always. Many small estates qualify for simplified procedures that avoid formal probate entirely. For example, California allows estates under $208,850 to use a small estate affidavit. If the estate is straightforward (no disputes, clear will, simple assets), many people handle probate themselves. For complex estates, disputes, or if you're unsure, consulting a probate attorney is worthwhile.",
  },
  {
    question: "How long does probate take?",
    answer:
      "Simple probate cases typically take 6-12 months. Complex estates with disputes, business interests, or real estate in multiple states can take 2-3 years. Many states offer simplified procedures for smaller estates that can be completed in weeks. Your state's rules and the complexity of the estate are the biggest factors.",
  },
  {
    question: "What bills should I keep paying after someone dies?",
    answer:
      "Continue paying for: the mortgage/rent (to protect the property), property insurance, utilities at the deceased's home, any jointly-held debts, and secured debts where the collateral is needed. Stop paying: personal credit cards (notify the issuer instead), subscriptions, memberships, and unsecured debts until the estate is settled. Creditors must file claims against the estate.",
  },
  {
    question: "Does my family owe federal estate tax?",
    answer:
      "Almost certainly not. The 2026 federal estate tax exemption is $15 million per individual ($30 million for married couples). Over 99% of families owe zero federal estate tax. Some states have their own estate or inheritance taxes with lower thresholds — check your state's rules. If the estate is under $15 million, you do not owe federal estate tax, but you still need to file the decedent's final income tax return.",
  },
  {
    question: "What is the small estate threshold in my state?",
    answer:
      "Small estate thresholds vary widely — from $10,000 in Georgia and Vermont to $208,850 in California. If the estate value is below your state's threshold, you may be able to skip formal probate entirely and use a simplified affidavit process. AfterLoss has state-specific guides for all 50 states plus DC with current thresholds.",
  },
  {
    question:
      "What government benefits should I apply for after someone dies?",
    answer:
      "Social Security survivor benefits (for spouses, children, and dependent parents), the Social Security lump-sum death payment ($255), VA survivor benefits (if the deceased was a veteran), state-specific survivor benefits, and employer-provided life insurance or pension survivor benefits. Apply for Social Security benefits as soon as possible — some benefits are not retroactive.",
  },
  {
    question: "Can I use AfterLoss without creating an account?",
    answer:
      "Yes. AfterLoss is 100% free and works without any account. Your progress is saved in your browser. You only need an account if you want to save progress across devices or receive email deadline reminders. There is no paywall, no subscription, and no hidden fees — ever.",
  },
  {
    question: "What if I don't know where to start or feel overwhelmed?",
    answer:
      "That's completely normal. Start with AfterLoss's personalized checklist — answer a few gentle questions about your situation, and we'll create a step-by-step plan customized to your state and circumstances. We also provide word-for-word phone scripts so you know exactly what to say when calling Social Security, banks, and insurance companies.",
  },
  {
    question:
      "What forms do I need to file with the IRS after someone dies?",
    answer:
      "The decedent's final Form 1040 (personal income tax return) is due April 15 of the following year. If the estate earns income above $600, you'll need Form 1041 (estate income tax return). If the estate exceeds $15 million, Form 706 (estate tax return) is due 9 months after death. Important: even if the estate is under $15 million, filing Form 706 preserves the unused exemption for a surviving spouse (portability election).",
  },
];

export function FaqSection() {
  return (
    <section data-testid="guide-faq-section" className="mt-16" id="faq">
      <h2
        data-testid="guide-faq-heading"
        className="text-2xl font-bold text-foreground mb-6"
      >
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {guideFaqs.map((faq, index) => (
          <div
            key={index}
            data-testid={`guide-faq-item-${index}`}
            className="rounded-lg border border-border p-5"
          >
            <h3 className="font-semibold text-foreground">{faq.question}</h3>
            <p className="mt-2 text-foreground leading-relaxed text-sm">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
