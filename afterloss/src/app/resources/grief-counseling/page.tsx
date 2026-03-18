import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { generateFaqPageSchema, generateBreadcrumbSchema } from "@/lib/structured-data";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";

const TALKSPACE_URL =
  process.env.NEXT_PUBLIC_TALKSPACE_AFFILIATE_URL || "#talkspace-affiliate";
const BETTERHELP_URL =
  process.env.NEXT_PUBLIC_BETTERHELP_AFFILIATE_URL || "#betterhelp-affiliate";

const GRIEF_COUNSELING_FAQS = [
  {
    question: "What is grief counseling and how does it help?",
    answer:
      "Grief counseling is a form of therapy that helps people cope with the emotional, physical, and psychological effects of losing a loved one. A trained therapist provides a safe space to process your feelings, develop coping strategies, and work through the stages of grief at your own pace. Research shows that grief counseling can reduce symptoms of depression, anxiety, and complicated grief.",
  },
  {
    question: "When should I seek grief counseling after a loss?",
    answer:
      "There is no wrong time to seek grief counseling. Some people benefit from starting within the first few weeks after a loss, while others seek help months or even years later. Consider reaching out if you feel overwhelmed, have difficulty functioning in daily life, experience prolonged intense sadness, have trouble sleeping or eating, or feel isolated from friends and family.",
  },
  {
    question: "What is the difference between online and in-person grief counseling?",
    answer:
      "Online grief counseling connects you with a licensed therapist through video calls, phone sessions, or text messaging from the comfort of your home. In-person counseling takes place at a therapist's office. Both are equally effective according to research. Online therapy offers greater convenience, broader therapist selection, and is often more affordable. In-person therapy may feel more personal and is better suited for those who prefer face-to-face interaction.",
  },
  {
    question: "Does insurance cover grief counseling?",
    answer:
      "Many health insurance plans cover grief counseling as part of mental health benefits. Under the Mental Health Parity and Addiction Equity Act, most employer-sponsored plans must cover mental health services at the same level as medical services. Check with your insurance provider about coverage, copays, and whether you need a referral. Some online therapy platforms like Talkspace accept insurance directly.",
  },
  {
    question: "How much does grief counseling cost without insurance?",
    answer:
      "Without insurance, traditional in-person grief counseling typically costs $100\u2013$250 per session. Online therapy platforms offer more affordable options: Talkspace starts around $69\u2013$109 per week for unlimited messaging plus weekly live sessions, and BetterHelp costs $65\u2013$100 per week. Many therapists offer sliding-scale fees based on income, and community mental health centers may provide free or low-cost grief support groups.",
  },
  {
    question: "What should I expect in my first grief counseling session?",
    answer:
      "In your first session, your therapist will ask about your loss, your relationship with the person who died, how you have been coping, and your emotional and physical well-being. This is an assessment to understand your needs \u2014 you won\u2019t be pressured to share more than you are comfortable with. Your therapist will explain their approach, discuss treatment goals, and answer your questions. Many people feel a sense of relief after their first session.",
  },
  {
    question: "Is grief counseling effective for children who have lost a parent?",
    answer:
      "Yes, grief counseling is highly effective for children. Children process grief differently than adults and may express it through behavior changes, regression, or physical complaints rather than words. A therapist trained in childhood grief uses age-appropriate techniques like play therapy, art therapy, and storytelling to help children understand and express their feelings. Early intervention can prevent long-term emotional difficulties.",
  },
];

export const metadata: Metadata = {
  title: "Online Grief Counseling Guide (2026) \u2014 Finding Support After Loss",
  description:
    "Compare top online grief counseling options including Talkspace and BetterHelp. Learn when to seek help, what to expect, insurance coverage, and costs. Free guide for people grieving a loved one.",
  keywords: [
    "grief counseling online",
    "grief therapy after death",
    "online therapy for grief",
    "grief counseling cost",
    "grief counseling near me",
    "bereavement counseling",
    "grief support after death",
    "online grief therapy 2026",
  ],
  openGraph: {
    title: "Online Grief Counseling Guide (2026) \u2014 Finding Support After Loss",
    description:
      "Compare top online grief counseling options. Learn when to seek help, what to expect, insurance coverage, and costs. Free guide.",
    url: `${BASE_URL}/resources/grief-counseling`,
    type: "article",
  },
  alternates: {
    canonical: `${BASE_URL}/resources/grief-counseling`,
  },
};

export default function GriefCounselingPage() {
  return (
    <div data-testid="grief-counseling-page">
      <JsonLd data={generateFaqPageSchema(GRIEF_COUNSELING_FAQS)} />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Resources", url: `${BASE_URL}/resources` },
          {
            name: "Grief Counseling",
            url: `${BASE_URL}/resources/grief-counseling`,
          },
        ])}
      />

      {/* Hero Section */}
      <section
        data-testid="grief-counseling-hero"
        className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted">
            <li>
              <Link
                href="/"
                data-testid="breadcrumb-home"
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span className="text-foreground">Grief Counseling</span>
            </li>
          </ol>
        </nav>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Online Grief Counseling Guide{" "}
          <span className="text-primary">(2026)</span>
        </h1>
        <p className="mt-6 text-lg text-muted max-w-3xl">
          Losing someone you love is one of the hardest experiences in life.
          Grief counseling can help you process your feelings, develop coping
          strategies, and find a path forward. This guide covers everything
          you need to know about finding the right support.
        </p>
      </section>

      {/* What Is Grief Counseling */}
      <section
        data-testid="what-is-grief-counseling"
        className="bg-secondary py-16"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            What Is Grief Counseling?
          </h2>
          <div className="mt-6 space-y-4 text-muted">
            <p>
              Grief counseling is a specialized form of therapy that helps
              people work through the complex emotions that follow the death
              of a loved one. A licensed therapist provides a safe,
              non-judgmental space where you can express your feelings and
              begin to heal.
            </p>
            <p>
              Unlike the common misconception that grief follows neat
              &ldquo;stages,&rdquo; modern grief therapy recognizes that
              everyone&apos;s experience is unique. Your therapist will work
              with you to develop personalized coping strategies that honor
              your individual process.
            </p>
            <p>
              Grief counseling can help with emotional pain, sleep
              difficulties, anxiety, depression, complicated grief, and the
              practical overwhelm of managing an estate while mourning. It is
              not a sign of weakness &mdash; it is a practical step toward
              healing.
            </p>
          </div>
        </div>
      </section>

      {/* When to Seek Help */}
      <section data-testid="when-to-seek-help" className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            When to Seek Grief Counseling
          </h2>
          <p className="mt-4 text-muted">
            There is no &ldquo;right&rdquo; time to seek help. If you are
            questioning whether you need support, that itself is often a sign
            that talking to someone could help. Consider reaching out if you
            experience any of the following:
          </p>
          <ul
            data-testid="signs-checklist"
            className="mt-6 space-y-3"
          >
            {[
              "Overwhelming sadness that does not ease over time",
              "Difficulty performing everyday tasks like cooking or working",
              "Withdrawing from friends, family, or activities you used to enjoy",
              "Persistent trouble sleeping, or sleeping much more than usual",
              "Changes in appetite — eating much more or much less",
              "Feelings of numbness, anger, or guilt that feel stuck",
              "Using alcohol or substances to cope with your pain",
              "Thoughts of self-harm or not wanting to go on",
            ].map((sign) => (
              <li key={sign} className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 h-5 w-5 rounded border-2 border-primary" />
                <span className="text-muted">{sign}</span>
              </li>
            ))}
          </ul>
          <div
            data-testid="crisis-resources"
            className="mt-8 rounded-lg border-2 border-accent bg-amber-50 p-6 dark:bg-amber-950/20"
          >
            <h3 className="font-bold text-foreground">
              If You Are in Crisis
            </h3>
            <p className="mt-2 text-sm text-muted">
              If you or someone you know is having thoughts of suicide or
              self-harm, please reach out immediately:
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="font-medium text-foreground">
                988 Suicide &amp; Crisis Lifeline:{" "}
                <span className="text-primary">Call or text 988</span>
              </li>
              <li className="font-medium text-foreground">
                Crisis Text Line:{" "}
                <span className="text-primary">Text HOME to 741741</span>
              </li>
              <li className="font-medium text-foreground">
                Emergency:{" "}
                <span className="text-primary">Call 911</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Online vs In-Person */}
      <section
        data-testid="online-vs-inperson"
        className="bg-secondary py-16"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Online vs. In-Person Grief Counseling
          </h2>
          <p className="mt-4 text-muted">
            Both online and in-person grief counseling are effective forms of
            therapy. The best choice depends on your personal preferences,
            schedule, and circumstances.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="text-lg font-semibold text-primary">
                Online Therapy
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Access from home — no commute during a difficult time</li>
                <li>Flexible scheduling including evenings and weekends</li>
                <li>Wider selection of therapists specializing in grief</li>
                <li>Multiple formats: video, phone, and text messaging</li>
                <li>Often more affordable than in-person sessions</li>
                <li>Private — no waiting room encounters</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="text-lg font-semibold text-primary">
                In-Person Therapy
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Face-to-face connection with your therapist</li>
                <li>Dedicated physical space away from grief reminders</li>
                <li>Easier to read body language and emotional cues</li>
                <li>May feel more &ldquo;real&rdquo; or personal for some people</li>
                <li>Group grief support options available locally</li>
                <li>Better for those less comfortable with technology</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section data-testid="what-to-expect" className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            What to Expect in Your First Session
          </h2>
          <p className="mt-4 text-muted">
            Starting therapy can feel intimidating, especially when you are
            already in pain. Knowing what to expect can help ease the anxiety.
          </p>
          <div className="mt-8 space-y-6">
            {[
              {
                step: "1",
                title: "Getting to Know You",
                description:
                  "Your therapist will ask about your loss, your relationship with the person who died, and how you have been coping. This is a conversation, not an interrogation — share only what feels comfortable.",
              },
              {
                step: "2",
                title: "Understanding Your Needs",
                description:
                  "Together, you will discuss what you hope to get from counseling. There are no wrong answers. Some people want help with overwhelming sadness; others need support managing estate tasks while grieving.",
              },
              {
                step: "3",
                title: "Developing a Plan",
                description:
                  "Your therapist will explain their approach and suggest how often to meet. Many people start with weekly sessions and adjust as needed. You are always in control of the pace.",
              },
              {
                step: "4",
                title: "Taking the First Step",
                description:
                  "Many people feel a sense of relief after their first session — simply having someone listen without judgment can be powerful. It is normal if it feels hard at first. Healing is not linear.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Coverage */}
      <section
        data-testid="insurance-coverage"
        className="bg-secondary py-16"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Insurance Coverage for Grief Counseling
          </h2>
          <div className="mt-6 space-y-4 text-muted">
            <p>
              Most health insurance plans cover grief counseling as part of
              mental health benefits. The Mental Health Parity and Addiction
              Equity Act requires most employer-sponsored plans to cover
              mental health services at the same level as medical services.
            </p>
            <p>Here is how to check your coverage:</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>
                Call the number on the back of your insurance card and ask
                about &ldquo;outpatient mental health benefits&rdquo;
              </li>
              <li>
                Ask whether you need a referral from your primary care
                doctor
              </li>
              <li>
                Confirm your copay or coinsurance amount for therapy sessions
              </li>
              <li>
                Ask if online therapy platforms are covered (many insurers
                now cover Talkspace and BetterHelp)
              </li>
            </ol>
            <p>
              If you do not have insurance, many therapists offer
              sliding-scale fees. Community mental health centers, grief
              support groups through hospices, and religious organizations
              often provide free counseling.
            </p>
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section data-testid="cost-comparison" className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Cost Comparison
          </h2>
          <p className="mt-4 text-muted">
            Understanding the costs can help you find an option that works
            for your budget. Here is a general comparison:
          </p>
          <div className="mt-8 overflow-x-auto">
            <table
              data-testid="therapy-comparison-table"
              className="w-full border-collapse text-sm"
            >
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="py-3 pr-4 text-left font-semibold text-foreground">
                    Option
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-foreground">
                    Cost (without insurance)
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-foreground">
                    Session Types
                  </th>
                  <th className="py-3 pl-4 text-left font-semibold text-foreground">
                    Insurance Accepted
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-4 pr-4 font-medium text-foreground">
                    In-Person Therapy
                  </td>
                  <td className="py-4 px-4 text-muted">
                    $100&ndash;$250/session
                  </td>
                  <td className="py-4 px-4 text-muted">
                    In-person (individual &amp; group)
                  </td>
                  <td className="py-4 pl-4 text-muted">
                    Varies by provider
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 pr-4 font-medium text-foreground">
                    Talkspace
                  </td>
                  <td className="py-4 px-4 text-muted">
                    $69&ndash;$109/week
                  </td>
                  <td className="py-4 px-4 text-muted">
                    Video, phone, messaging
                  </td>
                  <td className="py-4 pl-4 text-muted">
                    Yes &mdash; many major plans
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 pr-4 font-medium text-foreground">
                    BetterHelp
                  </td>
                  <td className="py-4 px-4 text-muted">
                    $65&ndash;$100/week
                  </td>
                  <td className="py-4 px-4 text-muted">
                    Video, phone, messaging
                  </td>
                  <td className="py-4 pl-4 text-muted">
                    Limited (some EAPs)
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 pr-4 font-medium text-foreground">
                    Community/Nonprofit
                  </td>
                  <td className="py-4 px-4 text-muted">
                    Free &ndash; $50/session
                  </td>
                  <td className="py-4 px-4 text-muted">
                    In-person groups, individual
                  </td>
                  <td className="py-4 pl-4 text-muted">
                    Often free regardless
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Platform Comparison / Affiliate CTAs */}
      <section
        data-testid="platform-comparison"
        className="bg-secondary py-16"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Online Therapy Platforms for Grief Support
          </h2>
          <p className="mt-4 text-muted">
            If you are considering online therapy, these platforms specialize
            in matching you with licensed therapists experienced in grief and
            bereavement counseling.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Talkspace */}
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="text-xl font-bold text-foreground">Talkspace</h3>
              <p className="mt-1 text-xs text-muted">Affiliate Partner</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Licensed therapists specializing in grief &amp; loss</li>
                <li>Unlimited messaging with weekly live sessions</li>
                <li>Accepts many major insurance plans</li>
                <li>Video, audio, and text-based therapy</li>
                <li>Psychiatry services available</li>
              </ul>
              <p className="mt-4 text-sm text-muted">
                <span className="font-medium text-foreground">Starting at:</span>{" "}
                $69&ndash;$109/week (may be covered by insurance)
              </p>
              <a
                href={TALKSPACE_URL}
                data-testid="talkspace-cta"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-6 inline-block w-full rounded-lg bg-primary px-6 py-3 text-center font-medium text-white hover:bg-primary-hover transition-colors"
              >
                Try Talkspace for Grief Counseling
              </a>
              <p className="mt-2 text-xs text-center text-muted">
                Affiliate link &mdash; AfterLoss may earn a commission at
                no extra cost to you
              </p>
            </div>

            {/* BetterHelp */}
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="text-xl font-bold text-foreground">
                BetterHelp
              </h3>
              <p className="mt-1 text-xs text-muted">Affiliate Partner</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Large network of licensed grief counselors</li>
                <li>Weekly live sessions plus unlimited messaging</li>
                <li>Financial aid available for qualifying members</li>
                <li>Video, phone, chat, and messaging options</li>
                <li>Switch therapists anytime at no extra charge</li>
              </ul>
              <p className="mt-4 text-sm text-muted">
                <span className="font-medium text-foreground">Starting at:</span>{" "}
                $65&ndash;$100/week
              </p>
              <a
                href={BETTERHELP_URL}
                data-testid="betterhelp-cta"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-6 inline-block w-full rounded-lg bg-primary px-6 py-3 text-center font-medium text-white hover:bg-primary-hover transition-colors"
              >
                Try BetterHelp for Grief Counseling
              </a>
              <p className="mt-2 text-xs text-center text-muted">
                Affiliate link &mdash; AfterLoss may earn a commission at
                no extra cost to you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grief Counseling for Children */}
      <section data-testid="grief-counseling-children" className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Grief Counseling for Children
          </h2>
          <div className="mt-6 space-y-4 text-muted">
            <p>
              Children grieve differently than adults. They may not have the
              words to express what they are feeling, and their grief may
              show up as behavior changes, difficulty in school, physical
              complaints, or regression to earlier behaviors.
            </p>
            <p>
              A therapist trained in childhood grief uses age-appropriate
              techniques like play therapy, art therapy, and storytelling to
              help children process their feelings. Early intervention can
              prevent long-term emotional difficulties and help children
              develop healthy coping skills.
            </p>
            <h3 className="text-lg font-semibold text-foreground pt-2">
              Signs a Child May Need Grief Counseling
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Persistent sadness, crying, or irritability</li>
              <li>Withdrawal from friends or activities</li>
              <li>Declining school performance</li>
              <li>Sleep problems or nightmares</li>
              <li>Regression (bed-wetting, clinginess, baby talk)</li>
              <li>Physical complaints with no medical cause</li>
              <li>Expressing fear of their own death or another loved one dying</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section data-testid="faq-section" className="bg-secondary py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-6">
            {GRIEF_COUNSELING_FAQS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-lg border border-border bg-background p-6"
              >
                <h3 className="font-semibold text-foreground">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links / CTA */}
      <section data-testid="cta-section" className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            You Don&apos;t Have to Navigate This Alone
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Whether you are just beginning to process your loss or managing
            the practical details of settling an estate, support is
            available. Take it one step at a time.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              data-testid="cta-checklist-link"
              className="rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-primary-hover transition-colors"
            >
              Start the Estate Checklist
            </Link>
            <Link
              href="/states"
              data-testid="cta-states-link"
              className="rounded-lg border border-border px-8 py-3 font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Find Your State Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
