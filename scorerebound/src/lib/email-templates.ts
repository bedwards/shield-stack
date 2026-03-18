/**
 * HTML email templates for the ScoreRebound drip campaign.
 *
 * Each template is recovery-path-aware and includes relevant affiliate CTAs.
 * All emails include an unsubscribe link per CAN-SPAM requirements.
 */

export interface EmailTemplateParams {
  recoveryPath: string | null;
  siteUrl: string;
  unsubscribeUrl: string;
  planUrl?: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
}

// ---------------------------------------------------------------------------
// Shared layout
// ---------------------------------------------------------------------------

function emailLayout(body: string, unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ScoreRebound</title>
</head>
<body style="margin:0;padding:0;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background-color:#f9fafb;color:#1f2937;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="padding:24px 32px;background-color:#059669;">
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">ScoreRebound</h1>
              <p style="margin:4px 0 0;font-size:13px;color:#d1fae5;">Student Loan Credit Score Recovery</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${body}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;border-top:1px solid #e5e7eb;background-color:#f9fafb;">
              <p style="margin:0 0 8px;font-size:12px;color:#9ca3af;text-align:center;">
                You received this because you signed up for ScoreRebound recovery tips.
              </p>
              <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
                <a href="${unsubscribeUrl}" style="color:#6b7280;text-decoration:underline;">Unsubscribe</a>
                &nbsp;&middot;&nbsp;
                <a href="https://scorerebound.com/privacy" style="color:#6b7280;text-decoration:underline;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function ctaButton(text: string, url: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
  <tr>
    <td style="background-color:#059669;border-radius:6px;">
      <a href="${url}" style="display:inline-block;padding:12px 24px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">${text}</a>
    </td>
  </tr>
</table>`;
}

function affiliateSection(
  title: string,
  items: { name: string; description: string; slug: string }[],
  siteUrl: string,
  referrer: string,
): string {
  const rows = items
    .map(
      (item) => {
        const trackingUrl = `${siteUrl}/api/affiliate/click?slug=${encodeURIComponent(item.slug)}&referrer=${encodeURIComponent(referrer)}`;
        return `<tr>
        <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;">
          <a href="${trackingUrl}" style="font-size:15px;font-weight:600;color:#059669;text-decoration:none;">${item.name}</a>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">${item.description}</p>
        </td>
      </tr>`;
      },
    )
    .join("");

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
  <tr>
    <td style="padding:16px;background-color:#f0fdf4;">
      <h3 style="margin:0;font-size:15px;font-weight:700;color:#065f46;">${title}</h3>
    </td>
  </tr>
  <tr>
    <td style="padding:4px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${rows}
      </table>
    </td>
  </tr>
</table>`;
}

// ---------------------------------------------------------------------------
// Path-specific content helpers
// ---------------------------------------------------------------------------

function getPathLabel(path: string | null): string {
  const labels: Record<string, string> = {
    ibr_enrollment: "Income-Based Repayment (IBR)",
    rehabilitation: "Loan Rehabilitation",
    consolidation: "Direct Consolidation",
    credit_building: "Credit Building",
    mixed: "Combined Recovery",
  };
  return labels[path ?? ""] ?? "Credit Score Recovery";
}

// ---------------------------------------------------------------------------
// Step 0: Welcome Email (sent immediately on subscribe)
// ---------------------------------------------------------------------------

export function welcomeEmail(params: EmailTemplateParams): EmailTemplate {
  const pathLabel = getPathLabel(params.recoveryPath);
  const planLink = params.planUrl
    ? ctaButton("View Your Full Recovery Plan", params.planUrl)
    : "";

  const body = `
    <h2 style="margin:0 0 16px;font-size:20px;color:#111827;">Welcome to ScoreRebound!</h2>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;">
      You've taken the first step toward rebuilding your credit score. Based on your quiz results,
      your recommended recovery path is <strong>${pathLabel}</strong>.
    </p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;">
      Over the next few weeks, we'll send you personalized guidance to help you recover:
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 16px;">
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#374151;">
          <strong style="color:#059669;">Week 1:</strong> Your step-by-step enrollment guide + credit builder recommendations
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#374151;">
          <strong style="color:#059669;">Week 4:</strong> Progress check-in + credit monitoring tools
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#374151;">
          <strong style="color:#059669;">Week 12:</strong> Refinancing eligibility check
        </td>
      </tr>
    </table>
    ${planLink}
    ${affiliateSection("Start Building Credit Today", [
      {
        name: "Credit Karma",
        description: "Free credit score monitoring — see where you stand right now.",
        slug: "credit_karma",
      },
      {
        name: "Self Credit Builder",
        description: "Build credit with small monthly payments (no credit check to apply).",
        slug: "self",
      },
    ], params.siteUrl, "email-welcome")}
    <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;">
      Reply to this email if you have any questions. We're here to help.
    </p>`;

  return {
    subject: "Your ScoreRebound Recovery Plan — Here's What Comes Next",
    html: emailLayout(body, params.unsubscribeUrl),
  };
}

// ---------------------------------------------------------------------------
// Step 1: Week 1 — Enrollment guide + credit builder CTA
// ---------------------------------------------------------------------------

export function weekOneEmail(params: EmailTemplateParams): EmailTemplate {
  const path = params.recoveryPath ?? "credit_building";
  let guideContent: string;

  if (path === "ibr_enrollment" || path === "mixed") {
    guideContent = `
      <h3 style="margin:0 0 12px;font-size:17px;color:#111827;">How to Enroll in Income-Based Repayment</h3>
      <ol style="margin:0 0 16px;padding-left:20px;font-size:14px;line-height:1.8;color:#374151;">
        <li>Go to <a href="https://studentaid.gov/app/ibrInstructions.action" style="color:#059669;">studentaid.gov</a> and log in</li>
        <li>Select "Apply for an Income-Driven Repayment Plan"</li>
        <li>Choose IBR (or SAVE/PAYE if eligible for a lower payment)</li>
        <li>Have your most recent tax return or pay stubs ready</li>
        <li>Submit — your servicer will respond within 1-2 weeks</li>
      </ol>
      <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#374151;">
        <strong>Pro tip:</strong> If your income is low, your monthly payment could be as little as $0/month under IBR.
        Once approved, set up autopay immediately to never miss a payment.
      </p>`;
  } else if (path === "rehabilitation") {
    guideContent = `
      <h3 style="margin:0 0 12px;font-size:17px;color:#111827;">Your Loan Rehabilitation Payment Guide</h3>
      <ol style="margin:0 0 16px;padding-left:20px;font-size:14px;line-height:1.8;color:#374151;">
        <li>Call your loan servicer (or the Default Resolution Group if in collections)</li>
        <li>Request to start the rehabilitation program</li>
        <li>They'll calculate a "reasonable and affordable" payment based on your income</li>
        <li>Make 9 voluntary, on-time payments within 10 consecutive months</li>
        <li>After completion, the default is removed from your credit report</li>
      </ol>
      <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#374151;">
        <strong>Pro tip:</strong> Payments can be as low as $5/month. Set calendar reminders — payments must be
        within 20 days of the due date to count. This is a one-time opportunity, so don't miss any.
      </p>`;
  } else if (path === "consolidation") {
    guideContent = `
      <h3 style="margin:0 0 12px;font-size:17px;color:#111827;">Your Direct Consolidation Timeline</h3>
      <ol style="margin:0 0 16px;padding-left:20px;font-size:14px;line-height:1.8;color:#374151;">
        <li>Go to <a href="https://studentaid.gov/app/launchConsolidation.action" style="color:#059669;">studentaid.gov</a> and start the application</li>
        <li>Select an income-driven repayment plan during the application</li>
        <li>The process takes 30-60 days</li>
        <li>Once complete, your loans show as current immediately</li>
        <li>Set up autopay with your new servicer right away</li>
      </ol>
      <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#374151;">
        <strong>Pro tip:</strong> If you have Parent PLUS loans, consolidation is your path to income-driven
        plans. Choose Income-Contingent Repayment (ICR) during the application.
      </p>`;
  } else {
    guideContent = `
      <h3 style="margin:0 0 12px;font-size:17px;color:#111827;">Your Credit Building Quick-Start Guide</h3>
      <ol style="margin:0 0 16px;padding-left:20px;font-size:14px;line-height:1.8;color:#374151;">
        <li>Pull your free credit reports from <a href="https://www.annualcreditreport.com" style="color:#059669;">AnnualCreditReport.com</a></li>
        <li>Dispute any errors you find (wrong dates, balances, or unknown accounts)</li>
        <li>Open a secured credit card — use it for small purchases, pay in full monthly</li>
        <li>Consider a credit-builder loan to add another positive tradeline</li>
        <li>Keep all credit card utilization below 30% (below 10% is ideal)</li>
      </ol>
      <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#374151;">
        <strong>Pro tip:</strong> Ask a trusted family member to add you as an authorized user on their oldest
        credit card. Their positive history will appear on your report.
      </p>`;
  }

  const body = `
    <h2 style="margin:0 0 16px;font-size:20px;color:#111827;">Week 1: Let's Get Started</h2>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#374151;">
      It's been a week since you created your recovery plan. Here's your detailed guide
      to taking the first major step.
    </p>
    ${guideContent}
    ${affiliateSection("Recommended: Start Building Credit Now", [
      {
        name: "Self Credit Builder Loan",
        description: "Build credit history with payments starting at $25/month. No credit check required.",
        slug: "self",
      },
      {
        name: "MoneyLion Credit Builder Plus",
        description: "0% APR credit-builder loan with credit monitoring included.",
        slug: "moneylion",
      },
      {
        name: "Chime Credit Builder Card",
        description: "Secured card with no annual fee, no interest, no credit check.",
        slug: "chime",
      },
    ], params.siteUrl, "email-week-1")}`;

  return {
    subject: "Week 1: Your Step-by-Step Guide to Start Recovering",
    html: emailLayout(body, params.unsubscribeUrl),
  };
}

// ---------------------------------------------------------------------------
// Step 2: Week 4 — Progress check-in + monitoring CTA
// ---------------------------------------------------------------------------

export function weekFourEmail(params: EmailTemplateParams): EmailTemplate {
  const planLink = params.planUrl
    ? `<p style="margin:16px 0;font-size:14px;"><a href="${params.planUrl}" style="color:#059669;font-weight:600;">Review your full recovery plan &rarr;</a></p>`
    : "";

  const body = `
    <h2 style="margin:0 0 16px;font-size:20px;color:#111827;">Week 4: How's Your Recovery Going?</h2>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;">
      It's been a month since you started your credit recovery journey. Let's check in on your progress.
    </p>
    <h3 style="margin:0 0 12px;font-size:17px;color:#111827;">Quick Progress Checklist</h3>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#374151;border-bottom:1px solid #f3f4f6;">
          &#9744; Pulled my free credit reports and disputed errors
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#374151;border-bottom:1px solid #f3f4f6;">
          &#9744; Applied for my recovery program (IBR/rehabilitation/consolidation)
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#374151;border-bottom:1px solid #f3f4f6;">
          &#9744; Set up autopay on my student loans
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#374151;border-bottom:1px solid #f3f4f6;">
          &#9744; Opened a credit-builder product (secured card or credit-builder loan)
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#374151;">
          &#9744; Made all payments on time this month
        </td>
      </tr>
    </table>
    ${planLink}
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;">
      <strong>Don't worry if you haven't checked everything off.</strong> Recovery is a marathon, not a sprint.
      The most important thing is making every payment on time from this point forward. Each on-time payment
      builds positive history that lasts for years.
    </p>
    <h3 style="margin:0 0 12px;font-size:17px;color:#111827;">Track Your Score for Free</h3>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#374151;">
      Monitoring your credit score helps you see progress and catch issues early. These services are completely free:
    </p>
    ${affiliateSection("Free Credit Monitoring Tools", [
      {
        name: "Credit Karma",
        description: "Free TransUnion and Equifax scores, updated weekly. Personalized recommendations.",
        slug: "credit_karma",
      },
      {
        name: "Experian Free Credit Monitoring",
        description: "Free Experian score and FICO score. Dark web monitoring included.",
        slug: "experian",
      },
      {
        name: "Capital One CreditWise",
        description: "Free TransUnion score and credit simulator. No Capital One account needed.",
        slug: "capital_one_creditwise",
      },
    ], params.siteUrl, "email-week-4")}`;

  return {
    subject: "Week 4: Your Credit Recovery Progress Check-In",
    html: emailLayout(body, params.unsubscribeUrl),
  };
}

// ---------------------------------------------------------------------------
// Step 3: Week 12 — Refinancing eligibility + refi CTA
// ---------------------------------------------------------------------------

export function weekTwelveEmail(params: EmailTemplateParams): EmailTemplate {
  const body = `
    <h2 style="margin:0 0 16px;font-size:20px;color:#111827;">Week 12: Are You Ready to Refinance?</h2>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;">
      It's been three months since you started your recovery. If you've been making on-time payments
      consistently, your credit score has likely improved significantly. Let's see if refinancing
      could save you money.
    </p>
    <h3 style="margin:0 0 12px;font-size:17px;color:#111827;">Signs You May Be Ready to Refinance</h3>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#374151;border-bottom:1px solid #f3f4f6;">
          &#10003; Your credit score has improved by 50+ points
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#374151;border-bottom:1px solid #f3f4f6;">
          &#10003; You have 3+ months of on-time payments
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#374151;border-bottom:1px solid #f3f4f6;">
          &#10003; Your credit score is 650 or above
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#374151;border-bottom:1px solid #f3f4f6;">
          &#10003; You have a stable income
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#374151;">
          &#10003; Your loans are not in default or collections
        </td>
      </tr>
    </table>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;">
      <strong>Important:</strong> Refinancing federal loans into private loans means losing access to federal
      protections (IBR, PSLF, forbearance). Only refinance if you're confident in your ability to repay
      and the interest savings are significant.
    </p>
    ${affiliateSection("Compare Refinancing Options (No Impact to Credit Score)", [
      {
        name: "SoFi Student Loan Refinancing",
        description: "Check your rate in 2 minutes. No fees, no prepayment penalties. Rates from 4.49% APR.",
        slug: "sofi_refi",
      },
      {
        name: "Earnest Student Loan Refinancing",
        description: "Customize your monthly payment. Skip a payment once a year. Rates from 4.49% APR.",
        slug: "earnest",
      },
      {
        name: "Splash Financial",
        description: "Compare rates from multiple lenders in one application. Quick prequalification.",
        slug: "splash",
      },
    ], params.siteUrl, "email-week-12")}
    <h3 style="margin:24px 0 12px;font-size:17px;color:#111827;">What's Next?</h3>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;">
      This is our last scheduled email, but your recovery journey continues. Keep doing what's working:
    </p>
    <ul style="margin:0 0 16px;padding-left:20px;font-size:14px;line-height:1.8;color:#374151;">
      <li>Make every payment on time — it's the #1 factor in your score</li>
      <li>Keep credit utilization below 30%</li>
      <li>Don't open too many new accounts at once</li>
      <li>Check your credit reports annually for errors</li>
    </ul>
    <p style="margin:0;font-size:15px;line-height:1.6;color:#374151;">
      Congratulations on sticking with your recovery plan. You've got this.
    </p>`;

  return {
    subject: "Week 12: Ready to Refinance? Check Your Eligibility",
    html: emailLayout(body, params.unsubscribeUrl),
  };
}

// ---------------------------------------------------------------------------
// Template selector by drip step
// ---------------------------------------------------------------------------

/**
 * Returns the appropriate email template for the given drip step.
 * Step 0 = welcome, 1 = week 1, 2 = week 4, 3 = week 12.
 */
export function getTemplateForStep(
  step: number,
  params: EmailTemplateParams,
): EmailTemplate | null {
  switch (step) {
    case 0:
      return welcomeEmail(params);
    case 1:
      return weekOneEmail(params);
    case 2:
      return weekFourEmail(params);
    case 3:
      return weekTwelveEmail(params);
    default:
      return null;
  }
}

/** Total number of drip steps (0=welcome, 1-3=drip emails). */
export const TOTAL_DRIP_STEPS = 4;

/** Delay in milliseconds before the next drip email after each step. */
export const DRIP_DELAYS_MS: Record<number, number> = {
  0: 7 * 24 * 60 * 60 * 1000, // After welcome: 7 days until week 1
  1: 21 * 24 * 60 * 60 * 1000, // After week 1: 21 days until week 4
  2: 56 * 24 * 60 * 60 * 1000, // After week 4: 56 days until week 12
};
