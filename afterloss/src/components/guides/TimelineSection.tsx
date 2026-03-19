import Link from "next/link";

function TaskCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}

function ContactBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded-lg bg-secondary p-4">{children}</div>
  );
}

function MistakeWarning({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-sm text-destructive">
      <strong>Common mistake:</strong> {children}
    </p>
  );
}

export default function TimelineSection() {
  return (
    <div data-testid="timeline-section">
      {/* Period 1: First 24 Hours */}
      <section
        id="first-24-hours"
        data-testid="timeline-first-24-hours"
        className="mt-12 scroll-mt-24"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
            1
          </span>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              First 24 Hours
            </h2>
            <p className="text-sm text-muted">
              The most urgent tasks — focus on these first
            </p>
          </div>
        </div>

        <p className="text-foreground leading-relaxed">
          In the first day, focus on the immediate necessities. Most
          administrative tasks can wait. Right now, the priorities are the legal
          pronouncement, notifying close family, and making arrangements.
        </p>

        <TaskCard title="Get a legal pronouncement of death">
          <p className="mt-2 text-foreground leading-relaxed">
            If the death occurred at home, call 911 or the deceased&apos;s
            doctor. If hospice was involved, call the hospice nurse first — they
            will guide you through the process. In a hospital or nursing home,
            the staff handles this automatically.
          </p>
          <MistakeWarning>
            Calling 911 when hospice is already involved. The hospice team knows
            the protocol and will make the process smoother.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="Notify immediate family and close friends">
          <p className="mt-2 text-foreground leading-relaxed">
            Call immediate family members first. Consider designating one
            trusted person to help spread the word to extended family and
            friends, so you don&apos;t have to make every call yourself.
          </p>
          <MistakeWarning>
            Posting on social media before all close family members have been
            personally notified. No one should learn about a death from a
            Facebook post.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="Arrange care for dependents and pets">
          <p className="mt-2 text-foreground leading-relaxed">
            If the deceased had minor children, arrange temporary care
            immediately. Don&apos;t forget pets — they need food, water, and
            attention even when everything else feels overwhelming.
          </p>
        </TaskCard>

        <TaskCard title="Secure the home and property">
          <p className="mt-2 text-foreground leading-relaxed">
            Lock the deceased&apos;s home. Collect mail. Adjust the thermostat.
            Secure valuables and important documents (will, insurance policies,
            financial records). If the home will be unoccupied, ask a trusted
            neighbor to keep an eye on it.
          </p>
          <MistakeWarning>
            Leaving the home unattended after an obituary is published.
            Unfortunately, burglars target homes of the recently deceased.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="Contact a funeral home or cremation service">
          <p className="mt-2 text-foreground leading-relaxed">
            You have the right to compare prices. The{" "}
            <strong>FTC Funeral Rule</strong> requires funeral homes to provide
            itemized price lists. The average funeral costs $7,000–$12,000, but
            prices vary significantly. Ask about ordering death certificates —
            the funeral home typically handles this.
          </p>
          <ContactBox>
            <p className="text-sm text-foreground">
              <strong>Documents you&apos;ll need:</strong> Photo ID of the
              deceased (if available), Social Security number, information for
              the death certificate (full legal name, date of birth, parents&apos;
              names, occupation).
            </p>
          </ContactBox>
          <MistakeWarning>
            Not comparing prices. Costs vary dramatically between funeral homes
            in the same area. You are never required to use the funeral home
            that transports the body.
          </MistakeWarning>
        </TaskCard>
      </section>

      {/* Period 2: First Week */}
      <section
        id="first-week"
        data-testid="timeline-first-week"
        className="mt-16 scroll-mt-24"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
            2
          </span>
          <div>
            <h2 className="text-2xl font-bold text-foreground">First Week</h2>
            <p className="text-sm text-muted">
              Critical notifications and financial protections
            </p>
          </div>
        </div>

        <TaskCard title="Order death certificates (10–15 certified copies)">
          <p className="mt-2 text-foreground leading-relaxed">
            You will need certified copies for every bank, insurance company,
            government agency, and financial institution. Your funeral home can
            order them from county vital records. Certified copies typically
            cost $5–$25 each depending on your state.
          </p>
          <MistakeWarning>
            Ordering too few copies. Each institution needs its own certified
            copy — they will not accept photocopies. Order at least 10–15 to
            start.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="Report the death to Social Security">
          <p className="mt-2 text-foreground leading-relaxed">
            The Social Security Administration must be notified to stop benefits
            and flag the Social Security Number against fraud. This is one of
            the most important early steps.
          </p>
          <ContactBox>
            <h4 className="font-semibold text-foreground mb-2">
              How to report:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-foreground text-sm">
              <li>
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:800-772-1213"
                  data-testid="ssa-phone-link"
                  className="text-primary hover:underline"
                >
                  800-772-1213
                </a>{" "}
                (Mon–Fri 8am–7pm, TTY: 800-325-0778)
              </li>
              <li>
                <strong>In person:</strong> Visit your local Social Security
                office
              </li>
              <li>
                <strong>Cannot be done online</strong>
              </li>
            </ul>
            <p className="mt-2 text-sm text-muted">
              Ask about the <strong>$255 lump-sum death benefit</strong> and{" "}
              <strong>survivor benefits</strong> while you&apos;re on the call.
            </p>
          </ContactBox>
          <MistakeWarning>
            Assuming the funeral home reported it. The funeral home may have
            submitted an electronic death report, but always confirm directly
            with SSA.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="Notify the employer">
          <p className="mt-2 text-foreground leading-relaxed">
            Contact the HR department to ask about: final paycheck, unused PTO
            payout, employer-provided life insurance, 401(k) or pension
            benefits, and COBRA health coverage for dependents.
          </p>
          <MistakeWarning>
            Forgetting about employer-provided life insurance. Many people have
            a policy through work and don&apos;t realize it — the benefit is
            typically 1–2x annual salary.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="File life insurance claims">
          <p className="mt-2 text-foreground leading-relaxed">
            Contact each insurance company with the policy number and a
            certified death certificate. Life insurance proceeds are generally
            paid within 30–60 days and are typically tax-free to beneficiaries.
          </p>
          <ContactBox>
            <p className="text-sm text-foreground">
              <strong>Documents needed:</strong> Certified death certificate,
              policy number, beneficiary identification, completed claim form
              (provided by insurer).
            </p>
          </ContactBox>
          <MistakeWarning>
            Not searching for unknown policies. Check old mail, email, and bank
            statements for premium payments. Search the{" "}
            <a
              href="https://eapps.naic.org/life-policy-locator/"
              data-testid="naic-link"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              NAIC Life Insurance Policy Locator
            </a>{" "}
            — a free tool that searches all participating insurers.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="Secure financial accounts">
          <p className="mt-2 text-foreground leading-relaxed">
            Notify each bank, credit union, and brokerage of the death. Request
            account freezes to prevent unauthorized transactions. Do{" "}
            <strong>not</strong> close joint accounts the surviving spouse
            needs.
          </p>
          <ContactBox>
            <p className="text-sm text-foreground">
              <strong>Documents needed:</strong> Certified death certificate,
              your photo ID, proof of authority (Letters Testamentary or
              Letters of Administration from probate court, if available).
            </p>
          </ContactBox>
          <MistakeWarning>
            Closing bank accounts before pending transactions (direct deposits,
            auto-payments, checks) have cleared. This can cause bounced
            payments and additional fees.
          </MistakeWarning>
        </TaskCard>

        {/* Phone scripts differentiator */}
        <div
          data-testid="phone-scripts-callout"
          className="mt-8 rounded-lg border-2 border-primary/20 bg-primary-light p-6"
        >
          <h3 className="font-semibold text-foreground text-lg">
            We provide word-for-word scripts for every call
          </h3>
          <p className="mt-2 text-foreground text-sm">
            Making these phone calls while grieving is exhausting. AfterLoss
            provides word-for-word scripts for calling Social Security, banks,
            insurance companies, and subscription services — so you know
            exactly what to say and what to ask for.
          </p>
          <Link
            href="/onboard"
            data-testid="phone-scripts-cta"
            className="mt-4 inline-block text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            Get your personalized phone scripts &rarr;
          </Link>
        </div>
      </section>

      {/* Period 3: First Month */}
      <section
        id="first-month"
        data-testid="timeline-first-month"
        className="mt-16 scroll-mt-24"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
            3
          </span>
          <div>
            <h2 className="text-2xl font-bold text-foreground">First Month</h2>
            <p className="text-sm text-muted">
              Legal, government, and administrative tasks
            </p>
          </div>
        </div>

        <TaskCard title="Consult an estate attorney (if needed)">
          <p className="mt-2 text-foreground leading-relaxed">
            Not every estate needs an attorney. If the estate is small (under
            your state&apos;s threshold), you may be able to use simplified
            procedures. An attorney is recommended for large estates, contested
            wills, business assets, or real property in multiple states.
          </p>
          <MistakeWarning>
            Paying for an attorney when a small estate affidavit would work.
            Check your state&apos;s small estate threshold first.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="File the will with probate court">
          <p className="mt-2 text-foreground leading-relaxed">
            Most states legally require you to file the will with the probate
            court, even if you plan to use simplified procedures. The filing
            deadline is typically 30 days after death, though this varies by
            state.
          </p>
          <ContactBox>
            <p className="text-sm text-foreground">
              <strong>Documents needed:</strong> Original will, certified death
              certificate, petition for probate (forms available from your
              county probate court).
            </p>
          </ContactBox>
          <MistakeWarning>
            Not filing the will at all. Failing to file can result in legal
            penalties in many states, and it prevents the estate from being
            settled properly.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="Apply for survivor benefits">
          <p className="mt-2 text-foreground leading-relaxed">
            Social Security survivor benefits can provide significant ongoing
            income for a surviving spouse or dependent children. Don&apos;t
            forget the $255 lump-sum death benefit — you must apply within 2
            years. If the deceased was a veteran, contact the VA for burial
            benefits and survivor compensation.
          </p>
          <ContactBox>
            <h4 className="font-semibold text-foreground mb-2">
              Who to call:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-foreground text-sm">
              <li>
                <strong>Social Security:</strong>{" "}
                <a
                  href="tel:800-772-1213"
                  data-testid="ssa-benefits-link"
                  className="text-primary hover:underline"
                >
                  800-772-1213
                </a>
              </li>
              <li>
                <strong>VA Benefits (veterans):</strong>{" "}
                <a
                  href="tel:800-827-1000"
                  data-testid="va-phone-link"
                  className="text-primary hover:underline"
                >
                  800-827-1000
                </a>
              </li>
            </ul>
          </ContactBox>
          <MistakeWarning>
            Not applying for the $255 lump-sum death benefit. It&apos;s a small
            amount, but it&apos;s available to most surviving spouses and
            requires only a phone call to claim.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="Cancel or transfer utilities and subscriptions">
          <p className="mt-2 text-foreground leading-relaxed">
            Transfer utilities (electric, gas, water, internet) to the
            surviving household member&apos;s name. Cancel services no one is
            using: streaming (Netflix, Spotify, etc.), gym memberships,
            magazines, software subscriptions, meal delivery services.
          </p>
          <MistakeWarning>
            Continuing to pay subscriptions for months without realizing it.
            Review bank and credit card statements for recurring charges.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="Notify government agencies">
          <p className="mt-2 text-foreground leading-relaxed">
            Contact the DMV to cancel or transfer the driver&apos;s license and
            vehicle registration. Redirect mail through USPS. Cancel voter
            registration. Return the deceased&apos;s passport to the State
            Department.
          </p>
          <MistakeWarning>
            Forgetting to redirect mail. Important documents — tax forms,
            account statements, legal notices — will continue arriving at the
            deceased&apos;s address.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="Protect the deceased's identity">
          <p className="mt-2 text-foreground leading-relaxed">
            Contact all three credit bureaus to place a &quot;deceased
            alert&quot; on the credit file. Request a copy of the credit report
            to check for unauthorized activity. Identity theft of deceased
            individuals affects 2.5 million Americans annually.
          </p>
          <ContactBox>
            <h4 className="font-semibold text-foreground mb-2">
              Credit bureau contacts:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-foreground text-sm">
              <li>
                <strong>Equifax:</strong>{" "}
                <a
                  href="tel:800-685-1111"
                  data-testid="equifax-link"
                  className="text-primary hover:underline"
                >
                  800-685-1111
                </a>
              </li>
              <li>
                <strong>Experian:</strong>{" "}
                <a
                  href="tel:888-397-3742"
                  data-testid="experian-link"
                  className="text-primary hover:underline"
                >
                  888-397-3742
                </a>
              </li>
              <li>
                <strong>TransUnion:</strong>{" "}
                <a
                  href="tel:800-916-8800"
                  data-testid="transunion-link"
                  className="text-primary hover:underline"
                >
                  800-916-8800
                </a>
              </li>
            </ul>
          </ContactBox>
          <p className="mt-3 text-sm text-muted">
            For a detailed walkthrough, see our{" "}
            <Link
              href="/guides/protect-identity-after-death-2026"
              data-testid="identity-guide-link"
              className="text-primary hover:underline"
            >
              identity protection guide
            </Link>
            .
          </p>
        </TaskCard>

        {/* State guide CTA */}
        <div
          data-testid="states-callout"
          className="mt-8 rounded-lg border-2 border-primary/20 bg-primary-light p-6"
        >
          <h3 className="font-semibold text-foreground text-lg">
            Probate rules vary by state
          </h3>
          <p className="mt-2 text-foreground text-sm">
            Every state has different probate thresholds, filing deadlines, and
            simplified procedures. AfterLoss provides state-specific guidance
            for all 50 states plus DC.
          </p>
          <Link
            href="/states"
            data-testid="states-cta"
            className="mt-4 inline-block text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            See probate rules for your state &rarr;
          </Link>
        </div>
      </section>

      {/* Period 4: First 3 Months */}
      <section
        id="first-3-months"
        data-testid="timeline-first-3-months"
        className="mt-16 scroll-mt-24"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
            4
          </span>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              First 3 Months
            </h2>
            <p className="text-sm text-muted">
              Estate administration and asset management
            </p>
          </div>
        </div>

        <TaskCard title="Open an estate bank account (if in probate)">
          <p className="mt-2 text-foreground leading-relaxed">
            Estate funds must be kept separate from your personal finances. Open
            a dedicated estate account to receive income and pay debts on behalf
            of the estate. You&apos;ll need an Employer Identification Number
            (EIN) from the IRS — you can apply for free at IRS.gov.
          </p>
          <ContactBox>
            <p className="text-sm text-foreground">
              <strong>Documents needed:</strong> Letters Testamentary or Letters
              of Administration, EIN from IRS, certified death certificate.
            </p>
          </ContactBox>
          <MistakeWarning>
            Using personal accounts for estate transactions. This creates tax
            complications and can expose you to personal liability.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="Create a complete inventory of assets and debts">
          <p className="mt-2 text-foreground leading-relaxed">
            Document everything the deceased owned and owed: bank accounts,
            investment accounts, real property, vehicles, personal property of
            value, digital assets, and all debts. This inventory is required by
            the probate court and is essential for fair distribution.
          </p>
          <MistakeWarning>
            Missing digital assets. Don&apos;t forget cryptocurrency wallets,
            domain names, digital purchases (ebooks, music, apps), airline
            miles, reward points, and online accounts with monetary value.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="File outstanding insurance claims">
          <p className="mt-2 text-foreground leading-relaxed">
            Beyond life insurance, check for: accidental death coverage,
            mortgage protection insurance, credit card death benefits, travel
            insurance, and auto insurance (if the death was accident-related).
          </p>
          <MistakeWarning>
            Not checking credit cards for death benefits. Many credit cards
            include small death benefit or balance forgiveness provisions that
            cardholders never know about.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="Transfer or sell vehicles">
          <p className="mt-2 text-foreground leading-relaxed">
            Contact your state DMV to transfer the vehicle title. If the
            vehicle was jointly owned, the surviving owner can usually transfer
            the title with a death certificate. If it was solely owned, you may
            need Letters Testamentary.
          </p>
          <ContactBox>
            <p className="text-sm text-foreground">
              <strong>Documents needed:</strong> Certified death certificate,
              vehicle title, Letters Testamentary or Letters of Administration,
              your photo ID.
            </p>
          </ContactBox>
          <MistakeWarning>
            Continuing to pay insurance on vehicles no one is driving. Cancel
            or reduce coverage as soon as the vehicle is no longer in use.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="Address real property">
          <p className="mt-2 text-foreground leading-relaxed">
            For the deceased&apos;s home and any other real estate: continue
            mortgage payments (the estate is responsible), maintain homeowner&apos;s
            insurance, and decide whether to transfer the deed, keep the
            property, or list it for sale. The process varies significantly by
            state.
          </p>
          <MistakeWarning>
            Stopping mortgage payments. Even during probate, the estate remains
            liable for mortgage obligations. Missed payments can result in
            foreclosure proceedings.
          </MistakeWarning>
        </TaskCard>

        {/* AI documents differentiator */}
        <div
          data-testid="ai-docs-callout"
          className="mt-8 rounded-lg border-2 border-primary/20 bg-primary-light p-6"
        >
          <h3 className="font-semibold text-foreground text-lg">
            We generate every letter and form you need — for free
          </h3>
          <p className="mt-2 text-foreground text-sm">
            AfterLoss uses AI to generate personalized letters for every
            situation: bank notifications, creditor letters, subscription
            cancellations, insurance claims, and government forms. Just answer
            a few questions and download your letter — ready to send.
          </p>
          <Link
            href="/onboard"
            data-testid="ai-docs-cta"
            className="mt-4 inline-block text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            Generate your documents — free &rarr;
          </Link>
        </div>
      </section>

      {/* Period 5: First Year */}
      <section
        id="first-year"
        data-testid="timeline-first-year"
        className="mt-16 scroll-mt-24"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
            5
          </span>
          <div>
            <h2 className="text-2xl font-bold text-foreground">First Year</h2>
            <p className="text-sm text-muted">
              Tax filings, distribution, and closing the estate
            </p>
          </div>
        </div>

        <TaskCard title="File final tax returns">
          <p className="mt-2 text-foreground leading-relaxed">
            File the deceased&apos;s final personal income tax return (Form
            1040) for the year of death, due April 15 of the following year. If
            the estate earned more than $600 in income after death, you must
            also file Form 1041 (estate income tax return).
          </p>
          <ContactBox>
            <h4 className="font-semibold text-foreground mb-2">
              Key IRS forms:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-foreground text-sm">
              <li>
                <strong>Form 1040:</strong> Final personal income tax return
                (due April 15)
              </li>
              <li>
                <strong>Form 1041:</strong> Estate income tax (required if
                estate income exceeds $600)
              </li>
              <li>
                <strong>Form 706:</strong> Estate tax return (required if estate
                exceeds $15M — but see portability below)
              </li>
              <li>
                <strong>Form 4768:</strong> 6-month extension for Form 706
              </li>
            </ul>
          </ContactBox>
          <MistakeWarning>
            Not consulting a tax professional. Estate tax rules are complex, and
            errors can be costly. Many CPAs offer a free initial consultation.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="Consider the portability election (Form 706)">
          <p className="mt-2 text-foreground leading-relaxed">
            If the deceased was married, the surviving spouse can inherit the
            deceased&apos;s unused federal estate tax exemption ($15 million per
            person in 2026). This requires filing Form 706 within 9 months of
            death, even if the estate is well under the threshold.{" "}
            <strong>
              Over 99% of families will NOT owe federal estate tax
            </strong>{" "}
            — but preserving this exemption could be valuable years from now.
          </p>
          <MistakeWarning>
            Skipping the portability election because the estate seems
            &quot;too small.&quot; The combined $30 million exemption for a
            married couple may be valuable if the surviving spouse&apos;s assets
            grow significantly over time.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="Distribute assets to beneficiaries">
          <p className="mt-2 text-foreground leading-relaxed">
            Follow the will&apos;s instructions for distributing assets. If
            there&apos;s no will, state intestacy law determines who inherits.
            If the estate is in probate, get court approval before distributing.
            Have beneficiaries sign receipts acknowledging what they received.
          </p>
          <MistakeWarning>
            Distributing assets before all debts are paid. As executor or
            administrator, you can be held personally liable if you distribute
            assets and there aren&apos;t enough funds left to pay creditors.
          </MistakeWarning>
        </TaskCard>

        <TaskCard title="Close the estate">
          <p className="mt-2 text-foreground leading-relaxed">
            File a final accounting with the probate court showing all income,
            expenses, and distributions. Close the estate bank account. File
            the final estate tax return. The court will issue an order closing
            the estate and releasing you from your duties.
          </p>
        </TaskCard>

        <TaskCard title="Take care of yourself">
          <p className="mt-2 text-foreground leading-relaxed">
            The first year is the hardest — full of &quot;firsts&quot; without
            your loved one. First birthday, first holiday, first anniversary.
            Grief doesn&apos;t follow a schedule, and there is no &quot;right&quot;
            way to grieve. If you&apos;re struggling, please reach out for
            support. You deserve it.
          </p>
          <ContactBox>
            <h4 className="font-semibold text-foreground mb-2">
              Grief support resources:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-foreground text-sm">
              <li>
                <strong>988 Suicide &amp; Crisis Lifeline:</strong> Call or text{" "}
                <a
                  href="tel:988"
                  data-testid="crisis-line-link"
                  className="text-primary hover:underline"
                >
                  988
                </a>
              </li>
              <li>
                Local hospice organizations often offer{" "}
                <strong>free grief support groups</strong> — even if hospice
                was not involved
              </li>
              <li>
                Online therapy platforms (BetterHelp, Talkspace) offer grief
                counseling from home
              </li>
            </ul>
          </ContactBox>
          <p className="mt-3 text-sm text-muted">
            See our{" "}
            <Link
              href="/resources/grief-counseling"
              data-testid="grief-counseling-link"
              className="text-primary hover:underline"
            >
              grief counseling resources guide
            </Link>{" "}
            for more options.
          </p>
        </TaskCard>

        {/* Mid-page CTA */}
        <div className="mt-8 rounded-lg bg-secondary p-6 text-center">
          <p className="text-foreground font-medium">
            Every situation is different. Get a checklist personalized to your
            state, relationship, and estate complexity.
          </p>
          <Link
            href="/onboard"
            data-testid="mid-page-cta"
            className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
          >
            Get Your Personalized Checklist &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
