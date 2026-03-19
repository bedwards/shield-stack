/**
 * Blog content for GhostBoard SEO articles.
 * Static content — no database needed.
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
  content: string;
}

const posts: BlogPost[] = [
  {
    slug: "what-is-employer-ghosting",
    title: "What Is Employer Ghosting? The Growing Problem in Hiring",
    description:
      "Employer ghosting is when companies stop responding to job applicants mid-process. Learn why it happens, how common it is, and what you can do about it.",
    publishedAt: "2026-03-01",
    updatedAt: "2026-03-15",
    author: "GhostBoard Team",
    tags: ["employer ghosting", "hiring", "job search"],
    content: `## What Is Employer Ghosting?

Employer ghosting occurs when a company abruptly stops communicating with a job applicant — no rejection email, no update, just silence. It can happen at any stage: after submitting an application, after a phone screen, or even after multiple rounds of interviews.

## How Common Is It?

Studies show that **75% of job seekers** have been ghosted by an employer at least once. The problem has worsened since 2020, with high-volume hiring and remote recruiting making it easier for companies to lose track of candidates.

## Why Do Companies Ghost Applicants?

- **Volume overload**: Large companies receive thousands of applications and lack the bandwidth to respond to each one.
- **No ATS follow-through**: Applicant tracking systems often don't send automated rejections unless configured.
- **Role changes**: The position gets put on hold, filled internally, or eliminated — and nobody updates the candidates.
- **Poor hiring culture**: Some companies simply don't prioritize candidate experience.

## What Can You Do About It?

1. **Research before you apply**: Check a company's ghosting rate on GhostBoard before investing time in an application.
2. **Set follow-up reminders**: If you haven't heard back in 1-2 weeks, send a polite follow-up email.
3. **Report your experience**: Help other job seekers by reporting your application outcomes on GhostBoard.
4. **Keep applying**: Never stop your job search while waiting to hear back from one company.

## The Impact on Job Seekers

Being ghosted isn't just frustrating — it can affect mental health, financial planning, and career decisions. When you've invested hours in applications and interviews, silence from the employer feels disrespectful.

## How GhostBoard Helps

GhostBoard crowdsources employer responsiveness data so job seekers can make informed decisions. Before you spend time on an application, check whether the company actually responds to candidates.`,
  },
  {
    slug: "how-to-deal-with-being-ghosted-after-interview",
    title: "Ghosted After an Interview? Here's What to Do Next",
    description:
      "You had a great interview but haven't heard back. Learn the steps to take when an employer ghosts you after an interview.",
    publishedAt: "2026-03-05",
    updatedAt: "2026-03-15",
    author: "GhostBoard Team",
    tags: ["interview", "ghosting", "job search tips"],
    content: `## When Silence Follows an Interview

You walked out of the interview feeling confident. The hiring manager seemed enthusiastic. They said they'd get back to you "within a week." Three weeks later — nothing. You've been ghosted.

## Step 1: Send a Follow-Up Email

Wait at least one week past the stated timeline, then send a brief, professional follow-up:

> "Hi [Name], I wanted to follow up on our conversation about the [Role] position on [Date]. I remain very interested in the opportunity and would love to hear about next steps. Thank you for your time."

## Step 2: Try a Different Contact

If your primary contact isn't responding, try reaching out to the recruiter, another interviewer, or even the company's HR department.

## Step 3: Set a Personal Deadline

Give yourself a cutoff — say, two follow-ups over three weeks. After that, mentally move on. You can always respond if they eventually reach out.

## Step 4: Document and Report

Report your experience on GhostBoard. Your data point helps other candidates know what to expect from this employer.

## Step 5: Keep Your Pipeline Full

The best defense against ghosting is never having all your eggs in one basket. Continue applying and interviewing at other companies.

## Why Companies Ghost After Interviews

- They chose another candidate but haven't sent rejections yet
- Internal hiring freeze or budget changes
- The hiring manager left or the team restructured
- They're simply disorganized

## Remember: It's Not About You

Being ghosted after an interview almost never reflects on your qualifications. It's a systemic problem with how many companies handle their hiring process.`,
  },
  {
    slug: "company-response-time-what-to-expect",
    title: "Company Response Times: What to Expect During Your Job Search",
    description:
      "How long should you wait to hear back from a company? Data-driven insights on typical employer response times by industry and company size.",
    publishedAt: "2026-03-10",
    updatedAt: "2026-03-15",
    author: "GhostBoard Team",
    tags: ["response time", "hiring process", "data"],
    content: `## How Long Do Companies Take to Respond?

The average time to hear back from an employer after applying varies widely:

- **Tech companies**: 1-3 weeks for initial response
- **Financial services**: 2-4 weeks
- **Healthcare**: 1-2 weeks
- **Government**: 4-8 weeks
- **Startups**: 3-7 days

## Factors That Affect Response Time

### Company Size
Larger companies typically take longer due to more bureaucratic hiring processes. A Fortune 500 company might take 4-6 weeks, while a startup could respond within days.

### Role Level
Senior and executive roles often have longer timelines (4-8 weeks) due to more interview rounds and stakeholder involvement. Entry-level positions may move faster.

### Application Volume
During peak hiring seasons (January-March, September-October), companies receive more applications and response times increase.

## Red Flags vs. Normal Delays

**Normal**: 1-3 weeks with no communication after applying. Many companies batch-review applications weekly.

**Concerning**: More than 4 weeks with no response after an interview. This usually means you've been deprioritized.

**Ghosting**: 6+ weeks of silence after any interaction. Time to move on.

## Use Data to Set Expectations

GhostBoard tracks average response times for thousands of companies. Before applying, check the company's typical timeline so you know what to expect — and when silence becomes ghosting.`,
  },
  {
    slug: "top-industries-employer-ghosting",
    title: "Which Industries Ghost Job Applicants the Most?",
    description:
      "Data reveals which industries have the highest employer ghosting rates. Find out where applicants are most likely to never hear back.",
    publishedAt: "2026-03-12",
    updatedAt: "2026-03-15",
    author: "GhostBoard Team",
    tags: ["industry data", "ghosting rates", "research"],
    content: `## Ghosting Rates by Industry

Not all industries treat applicants equally. Based on crowdsourced data from job seekers, here are the industries with the highest and lowest ghosting rates.

## Highest Ghosting Rates

1. **Retail & Hospitality** — High volume hiring means many applications fall through the cracks
2. **Media & Entertainment** — Competitive fields with more applicants than positions
3. **Real Estate** — Seasonal hiring patterns lead to abandoned searches
4. **Marketing & Advertising** — Agency culture often prioritizes speed over candidate communication

## Lowest Ghosting Rates

1. **Government & Public Sector** — Regulated hiring processes require formal communication
2. **Healthcare** — Urgent staffing needs mean faster decisions
3. **Education** — Structured academic hiring timelines
4. **Defense & Aerospace** — Security clearance processes require active communication

## Why Does Industry Matter?

Understanding industry norms helps you calibrate expectations. A 3-week silence from a government agency is normal. The same from a startup? That's a red flag.

## What Can Employers Do?

1. Set up automated rejection emails in their ATS
2. Commit to responding within a stated timeframe
3. Designate someone to manage candidate communications
4. Use GhostBoard's recruiter tools to monitor and improve their response rates

## Track Your Industry

GhostBoard breaks down ghosting data by industry so you can see how companies in your target field compare. Search for a company and see where it ranks among its peers.`,
  },
];

/**
 * Get all blog posts sorted by publish date (newest first).
 */
export function getAllBlogPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/**
 * Get a single blog post by slug.
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  return posts.find((p) => p.slug === slug) ?? null;
}

/**
 * Get all blog post slugs for SSG generateStaticParams.
 */
export function getAllBlogSlugs(): string[] {
  return posts.map((p) => p.slug);
}
