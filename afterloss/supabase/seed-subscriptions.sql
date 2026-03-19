-- AfterLoss Subscription Cancellation Templates
-- 100+ services across 9 categories (streaming, social_media, financial,
-- insurance, utility, government, membership, email, cloud_storage)
-- All inserts are idempotent (uses conflict-based upsert on service_name)
-- Requires migration: 20260319140000_expand_subscription_templates.sql
-- Run with: supabase db seed

-- =============================================================================
-- STREAMING SERVICES (18 entries)
-- =============================================================================
INSERT INTO subscription_templates (service_name, category, cancellation_method, cancellation_contact, template_text, required_documents, estimated_processing_time, difficulty_rating, last_verified_date, direct_url)
VALUES
('Netflix', 'streaming', 'online', '1-866-579-7172',
$tpl$Dear Netflix Customer Support,

I am writing to request cancellation of the account belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Please cancel the account associated with email [Account Email] and stop all recurring charges. If a prorated refund is available for the current billing period, please issue it to the estate.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('Hulu', 'streaming', 'online', '1-888-265-6650',
$tpl$Dear Hulu Customer Support,

I am writing to request cancellation of the account belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Please cancel the account associated with email [Account Email] and stop all recurring charges. If a prorated refund is available for the current billing period, please issue it to the estate.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('Disney+', 'streaming', 'online', '1-888-905-7888',
$tpl$Dear Disney+ Customer Support,

I am writing to request cancellation of the account belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Please cancel the account associated with email [Account Email] and stop all recurring charges. If a prorated refund is available for the current billing period, please issue it to the estate.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('YouTube TV', 'streaming', 'online', 'support.google.com/youtubetv',
$tpl$Dear YouTube TV Support,

I am writing to request cancellation of the account belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Please cancel the account associated with email [Account Email] and stop all recurring charges. YouTube TV accounts are managed through Google, so you may also need to contact Google Account support.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('Apple TV+', 'streaming', 'online', '1-800-275-2273',
$tpl$Dear Apple Support,

I am writing to request cancellation of the Apple TV+ subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

The Apple ID associated with the subscription is [Apple ID/Email]. Please cancel the subscription and stop all recurring charges. Apple may have a Digital Legacy program or deceased account process — please advise on next steps.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'medium', '2026-03-19', NULL),

('Spotify', 'streaming', 'online', 'support.spotify.com',
$tpl$Dear Spotify Customer Support,

I am writing to request cancellation of the account belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Please cancel the account associated with email [Account Email] and stop all recurring charges. If the account is part of a Family or Duo plan, please remove the deceased member while keeping other members active.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('Amazon Prime Video', 'streaming', 'online', '1-888-280-4331',
$tpl$Dear Amazon Customer Service,

I am writing to request cancellation of the Amazon Prime membership (including Prime Video) belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account email: [Account Email]

Please cancel the Prime membership and all associated subscriptions, and stop recurring charges. If a prorated refund is available, please issue it to the estate. Please also advise on any digital content, Kindle library, or other Amazon services tied to this account.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'medium', '2026-03-19', NULL),

('Max (HBO)', 'streaming', 'online', 'help.max.com',
$tpl$Dear Max (HBO) Customer Support,

I am writing to request cancellation of the account belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Please cancel the account associated with email [Account Email] and stop all recurring charges. If a prorated refund is available for the current billing period, please issue it to the estate.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('Peacock', 'streaming', 'online', '1-888-810-4031',
$tpl$Dear Peacock Customer Support,

I am writing to request cancellation of the account belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Please cancel the account associated with email [Account Email] and stop all recurring charges. If a prorated refund is available for the current billing period, please issue it to the estate.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('Paramount+', 'streaming', 'online', 'help.paramountplus.com',
$tpl$Dear Paramount+ Customer Support,

I am writing to request cancellation of the account belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Please cancel the account associated with email [Account Email] and stop all recurring charges. If a prorated refund is available for the current billing period, please issue it to the estate.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('Apple Music', 'streaming', 'online', '1-800-275-2273',
$tpl$Dear Apple Support,

I am writing to request cancellation of the Apple Music subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

The Apple ID associated with the subscription is [Apple ID/Email]. Please cancel the subscription and stop all recurring charges. If the subscription is part of a Family plan, please remove the deceased member.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'medium', '2026-03-19', NULL),

('YouTube Music', 'streaming', 'online', 'support.google.com/youtubemusic',
$tpl$Dear YouTube Music / Google Support,

I am writing to request cancellation of the YouTube Music subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

The Google account email is [Account Email]. Please cancel the subscription and stop all recurring charges. Google may have an Inactive Account Manager or deceased user process — please advise on next steps for the full Google account.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'medium', '2026-03-19', NULL),

('Audible', 'streaming', 'online', '1-888-283-5051',
$tpl$Dear Audible Customer Support,

I am writing to request cancellation of the Audible membership belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account email: [Account Email]

Please cancel the membership and stop all recurring charges. Please also advise whether purchased audiobooks remain accessible or if they need to be transferred.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('SiriusXM', 'streaming', 'phone', '1-866-635-2349',
$tpl$Dear SiriusXM Customer Support,

I am calling/writing to request cancellation of the SiriusXM subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account or Radio ID: [Account/Radio ID]

Please cancel the subscription immediately and stop all recurring charges. If the subscription is tied to a vehicle, please deactivate the radio. If a prorated refund is due, please issue it to the estate.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'medium', '2026-03-19', NULL),

('Crunchyroll', 'streaming', 'online', 'help.crunchyroll.com',
$tpl$Dear Crunchyroll Customer Support,

I am writing to request cancellation of the account belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Please cancel the account associated with email [Account Email] and stop all recurring charges. If a prorated refund is available for the current billing period, please issue it to the estate.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('Pandora', 'streaming', 'online', 'help.pandora.com',
$tpl$Dear Pandora Customer Support,

I am writing to request cancellation of the account belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Please cancel the account associated with email [Account Email] and stop all recurring charges.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('Deezer', 'streaming', 'online', 'support.deezer.com',
$tpl$Dear Deezer Customer Support,

I am writing to request cancellation of the account belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Please cancel the account associated with email [Account Email] and stop all recurring charges.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('Tidal', 'streaming', 'online', 'support.tidal.com',
$tpl$Dear Tidal Customer Support,

I am writing to request cancellation of the account belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Please cancel the account associated with email [Account Email] and stop all recurring charges.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL)

ON CONFLICT (service_name) DO NOTHING;


-- =============================================================================
-- SOCIAL MEDIA (9 entries)
-- Facebook documents BOTH memorialization and deletion (separate entries)
-- =============================================================================
INSERT INTO subscription_templates (service_name, category, cancellation_method, cancellation_contact, template_text, required_documents, estimated_processing_time, difficulty_rating, last_verified_date, direct_url)
VALUES
('Facebook (Memorialization)', 'social_media', 'online', 'facebook.com/help/contact/305593649477238',
$tpl$Facebook Memorialization Request

Memorialization preserves the profile with "Remembering" before the person''s name. No one can log into the account, but depending on privacy settings, friends can share memories on the timeline.

Steps:
1. Go to Facebook''s Memorialization Request page
2. Provide the deceased''s name and profile URL
3. Upload proof of death (death certificate, obituary link, or memorial card)
4. Facebook will review and memorialize the profile

Note: A Legacy Contact (if designated by the deceased) can manage the memorialized profile — pinning posts, updating profile/cover photo, and responding to friend requests. If no Legacy Contact was set, the profile becomes static.

This is NOT the same as deleting the account. For permanent deletion, see "Facebook (Account Deletion)".$tpl$,
'{"Death certificate or obituary link","Proof of relationship (optional)"}', '30-90 days', 'medium', '2026-03-19', NULL),

('Facebook (Account Deletion)', 'social_media', 'online', 'facebook.com/help/contact/228813257197480',
$tpl$Facebook Account Deletion (Special Request for Deceased Person)

Permanent deletion removes the profile and ALL associated data. This cannot be undone.

Steps:
1. Go to Facebook''s Special Request for Deceased Person''s Account page
2. You must be a verified immediate family member or executor
3. Provide: deceased''s name, profile URL, your relationship, and your contact info
4. Upload required documentation (see below)
5. Facebook will verify and permanently delete the account

Required documentation:
- Death certificate (or equivalent legal document)
- Proof you are an immediate family member or executor (e.g., birth certificate, marriage certificate, Letters Testamentary, power of attorney)

This is NOT the same as memorialization. For preserving the profile, see "Facebook (Memorialization)".$tpl$,
'{"Death certificate","Proof of authority (birth/marriage certificate, Letters Testamentary, or power of attorney)"}', '30-90 days', 'hard', '2026-03-19', NULL),

('Instagram', 'social_media', 'online', 'help.instagram.com',
$tpl$Instagram Memorialization or Removal Request

Instagram (owned by Meta) offers two options:
1. MEMORIALIZE: The account shows "Remembering" before the name. Content remains visible per existing privacy settings. No one can log in.
2. REMOVE: Permanently delete the account and all content.

To request either option:
1. Go to Instagram''s Help Center and search for "Report a Deceased Person''s Account"
2. Fill out the form with the deceased''s username and your relationship
3. Provide proof of death (death certificate or obituary)
4. Specify whether you want memorialization or removal

Only immediate family members or executors can request removal.$tpl$,
'{"Death certificate or obituary","Proof of relationship (for removal)"}', '30-90 days', 'medium', '2026-03-19', NULL),

('X (Twitter)', 'social_media', 'online', 'help.twitter.com',
$tpl$To X (Twitter) Support,

I am requesting deactivation of the account belonging to [Full Name of Deceased], who passed away on [Date of Death].

Username: @[Username]

I am the [Relationship to Deceased] and am authorized to make this request. Please deactivate the account and remove all associated data.

X requires verification from an immediate family member or authorized estate representative. Submit a request through the Help Center under "Deceased User" or "Deactivation."

[Your Full Name]
[Your Phone Number]

Enclosed: Death certificate and proof of relationship.$tpl$,
'{"Death certificate","Proof of relationship or estate authorization"}', '30-60 days', 'medium', '2026-03-19', NULL),

('LinkedIn', 'social_media', 'online', 'linkedin.com/help/linkedin/ask/ts-rdmlp',
$tpl$LinkedIn Deceased Member Profile Removal

Steps:
1. Go to LinkedIn Help Center and search for "Deceased LinkedIn Member"
2. Fill out the verification form with the deceased''s name, profile URL, and your relationship
3. Provide proof of death (death certificate or obituary link)
4. LinkedIn will remove the profile

LinkedIn does not offer memorialization — the profile is either active or removed. You do not need the deceased''s login credentials to submit a removal request.

Note: If the deceased had a LinkedIn Premium subscription, contact LinkedIn Customer Service separately to cancel the paid subscription and stop charges.$tpl$,
'{"Death certificate or obituary link","Proof of relationship"}', '14-30 days', 'easy', '2026-03-19', NULL),

('TikTok', 'social_media', 'online', 'support.tiktok.com',
$tpl$To TikTok Support,

I am requesting removal of the account belonging to [Full Name of Deceased], who passed away on [Date of Death].

Username: @[Username]

I am the [Relationship to Deceased] handling their digital estate. Please deactivate and remove the account and all associated content.

Submit through TikTok''s in-app "Report a problem" feature or through the online support form. Select "Account issue" and then "Deceased user."

[Your Full Name]
[Your Phone Number]

Enclosed: Death certificate and proof of relationship.$tpl$,
'{"Death certificate","Proof of relationship"}', '30-60 days', 'medium', '2026-03-19', NULL),

('Snapchat', 'social_media', 'online', 'support.snapchat.com',
$tpl$To Snapchat Support,

I am requesting deletion of the account belonging to [Full Name of Deceased], who passed away on [Date of Death].

Username: [Username]

I am the [Relationship to Deceased] handling their digital estate. Please permanently delete the account and all associated data, including Memories and Snap data.

Submit through Snapchat''s online support form under "My Account & Security" > "I need to report a deceased Snapchat user."

[Your Full Name]
[Your Phone Number]

Enclosed: Death certificate and proof of relationship.$tpl$,
'{"Death certificate","Proof of relationship"}', '30-60 days', 'medium', '2026-03-19', NULL),

('Reddit', 'social_media', 'online', 'reddit.com/contact',
$tpl$To Reddit Support,

I am requesting deletion of the Reddit account belonging to [Full Name of Deceased], who passed away on [Date of Death].

Username: u/[Username]

I am the [Relationship to Deceased] handling their digital estate. Please delete the account and all associated posts and comments.

Submit through Reddit''s contact form or email to contact@reddit.com. Select "Other" as the category and explain the situation.

[Your Full Name]
[Your Phone Number]

Enclosed: Death certificate and proof of relationship.$tpl$,
'{"Death certificate","Proof of relationship"}', '14-30 days', 'medium', '2026-03-19', NULL),

('Pinterest', 'social_media', 'online', 'help.pinterest.com',
$tpl$To Pinterest Support,

I am requesting closure of the Pinterest account belonging to [Full Name of Deceased], who passed away on [Date of Death].

Account email or profile URL: [Email/URL]

I am the [Relationship to Deceased] handling their digital estate. Please deactivate and delete the account and all associated pins and boards.

Submit through Pinterest Help Center under "Manage your account" or contact support directly.

[Your Full Name]
[Your Phone Number]

Enclosed: Death certificate and proof of relationship.$tpl$,
'{"Death certificate","Proof of relationship"}', '14-30 days', 'easy', '2026-03-19', NULL)

ON CONFLICT (service_name) DO NOTHING;


-- =============================================================================
-- FINANCIAL INSTITUTIONS (17 entries)
-- =============================================================================
INSERT INTO subscription_templates (service_name, category, cancellation_method, cancellation_contact, template_text, required_documents, estimated_processing_time, difficulty_rating, last_verified_date, direct_url)
VALUES
('Chase', 'financial', 'phone', '1-800-935-9935',
$tpl$Dear Chase Bereavement/Estate Services,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/administrator] of their estate.

Account Number(s): [Account Number(s)]

Please freeze the account(s) to prevent unauthorized transactions, provide current balances and recent statements, and advise on the process for closing or transferring the account(s). If there are joint accounts, please advise on the survivor''s options.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor"}', '15-30 business days', 'hard', '2026-03-19', NULL),

('Bank of America', 'financial', 'phone', '1-800-432-1000',
$tpl$Dear Bank of America Bereavement Services,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/administrator] of their estate.

Account Number(s): [Account Number(s)]

Please freeze the account(s), provide current balances and recent statements, and advise on the account closure or transfer process.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor"}', '15-30 business days', 'hard', '2026-03-19', NULL),

('Wells Fargo', 'financial', 'phone', '1-800-869-3557',
$tpl$Dear Wells Fargo Estate Services,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/administrator] of their estate.

Account Number(s): [Account Number(s)]

Please freeze the account(s), provide current balances and recent statements, and advise on the account closure or transfer process.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor"}', '15-30 business days', 'hard', '2026-03-19', NULL),

('Citibank', 'financial', 'phone', '1-800-374-9700',
$tpl$Dear Citibank Bereavement Department,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/administrator] of their estate.

Account Number(s): [Account Number(s)]

Please freeze the account(s), provide current balances and recent statements, and advise on the account closure or transfer process.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor"}', '15-30 business days', 'hard', '2026-03-19', NULL),

('Fidelity Investments', 'financial', 'phone', '1-800-544-6666',
$tpl$Dear Fidelity Investments Estate Services,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/beneficiary] of their estate.

Account Number(s): [Account Number(s)]

Please advise on the process for handling investment accounts, IRAs, and any beneficiary designations. If there are TOD (Transfer on Death) registrations, please process the transfers. Otherwise, please freeze the accounts and provide current statements.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor","Beneficiary documentation (if applicable)"}', '20-45 business days', 'hard', '2026-03-19', NULL),

('Charles Schwab', 'financial', 'phone', '1-800-435-4000',
$tpl$Dear Charles Schwab Estate Services,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/beneficiary] of their estate.

Account Number(s): [Account Number(s)]

Please advise on the process for handling brokerage accounts, IRAs, and any beneficiary designations. Please freeze the accounts and provide current statements.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor"}', '20-45 business days', 'hard', '2026-03-19', NULL),

('Vanguard', 'financial', 'phone', '1-800-662-7447',
$tpl$Dear Vanguard Estate Services,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/beneficiary] of their estate.

Account Number(s): [Account Number(s)]

Please advise on the process for handling investment accounts, IRAs, and any beneficiary designations. Please freeze the accounts and provide current statements.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor"}', '20-45 business days', 'hard', '2026-03-19', NULL),

('American Express', 'financial', 'phone', '1-800-528-4800',
$tpl$Dear American Express Bereavement Services,

I am notifying you of the death of [Full Name of Deceased], a cardmember, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/administrator] of their estate.

Card Number (last 4 digits): [Last 4 Digits]

Please close the account and cancel the card to prevent further charges. Please provide the final statement with any outstanding balance or credits due. If there are supplementary cardholders, please advise on their options.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor"}', '10-20 business days', 'medium', '2026-03-19', NULL),

('Discover', 'financial', 'phone', '1-800-347-2683',
$tpl$Dear Discover Card Bereavement Services,

I am notifying you of the death of [Full Name of Deceased], a cardmember, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/administrator] of their estate.

Card Number (last 4 digits): [Last 4 Digits]

Please close the account, cancel the card, and provide the final statement.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor"}', '10-20 business days', 'medium', '2026-03-19', NULL),

('Capital One', 'financial', 'phone', '1-800-227-4825',
$tpl$Dear Capital One Bereavement Services,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/administrator] of their estate.

Account/Card Number (last 4 digits): [Last 4 Digits]

Please close the account(s), provide final statements, and advise on any outstanding balances or credits.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor"}', '10-20 business days', 'medium', '2026-03-19', NULL),

('US Bank', 'financial', 'phone', '1-800-872-2657',
$tpl$Dear US Bank Estate Services,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/administrator] of their estate.

Account Number(s): [Account Number(s)]

Please freeze the account(s), provide current balances and recent statements, and advise on the account closure or transfer process.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor"}', '15-30 business days', 'hard', '2026-03-19', NULL),

('TD Bank', 'financial', 'phone', '1-888-751-9000',
$tpl$Dear TD Bank Estate Services,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/administrator] of their estate.

Account Number(s): [Account Number(s)]

Please freeze the account(s), provide current balances and recent statements, and advise on the account closure or transfer process.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor"}', '15-30 business days', 'hard', '2026-03-19', NULL),

('Morgan Stanley', 'financial', 'phone', '1-888-454-3965',
$tpl$Dear Morgan Stanley Estate Services,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/beneficiary] of their estate.

Account Number(s): [Account Number(s)]

Please advise on the process for handling investment and brokerage accounts. Please freeze the accounts and provide current statements.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor"}', '20-45 business days', 'hard', '2026-03-19', NULL),

('PayPal', 'financial', 'online', '1-888-221-1161',
$tpl$Dear PayPal Customer Support,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/administrator] of their estate.

Account email: [Account Email]

Please close the account, transfer any remaining balance to the estate, and stop all recurring payments. Please provide a transaction history for the past 12 months.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor"}', '10-20 business days', 'medium', '2026-03-19', NULL),

('Robinhood', 'financial', 'email', 'support@robinhood.com',
$tpl$Dear Robinhood Support,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/beneficiary] of their estate.

Account email: [Account Email]

Please freeze the account and advise on the process for transferring assets to the estate or beneficiaries. Please provide a current statement of all holdings.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor"}', '20-45 business days', 'hard', '2026-03-19', NULL),

('E*Trade', 'financial', 'phone', '1-800-387-2331',
$tpl$Dear E*Trade Estate Services,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/beneficiary] of their estate.

Account Number(s): [Account Number(s)]

Please freeze the account(s) and advise on the process for transferring assets. Please provide current statements.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor"}', '20-45 business days', 'hard', '2026-03-19', NULL),

('Ally Bank', 'financial', 'phone', '1-877-247-2559',
$tpl$Dear Ally Bank Estate Services,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] and [executor/administrator] of their estate.

Account Number(s): [Account Number(s)]

Please freeze the account(s), provide current balances, and advise on the account closure or transfer process.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, Letters Testamentary or Letters of Administration.$tpl$,
'{"Certified death certificate","Letters Testamentary or Letters of Administration","Government-issued ID of executor"}', '15-30 business days', 'hard', '2026-03-19', NULL)

ON CONFLICT (service_name) DO NOTHING;


-- =============================================================================
-- INSURANCE (7 entries)
-- =============================================================================
INSERT INTO subscription_templates (service_name, category, cancellation_method, cancellation_contact, template_text, required_documents, estimated_processing_time, difficulty_rating, last_verified_date, direct_url)
VALUES
('State Farm', 'insurance', 'phone', '1-800-732-5246',
$tpl$Dear State Farm Claims Department,

I am notifying you of the death of [Full Name of Deceased], policyholder, who passed away on [Date of Death].

Policy Number(s): [Policy Number(s)]

I am the [Relationship to Deceased] and [beneficiary/executor] of their estate. Please:
1. Initiate any life insurance or death benefit claims
2. Cancel auto, home, and other active policies
3. Issue refunds for unused premiums
4. Send all necessary claim forms to the address below

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate.$tpl$,
'{"Certified death certificate","Policy numbers","Beneficiary ID or Letters Testamentary"}', '30-60 business days', 'medium', '2026-03-19', NULL),

('Geico', 'insurance', 'phone', '1-800-841-3000',
$tpl$Dear Geico Claims Department,

I am notifying you of the death of [Full Name of Deceased], policyholder, who passed away on [Date of Death].

Policy Number(s): [Policy Number(s)]

I am the [Relationship to Deceased] and [beneficiary/executor] of their estate. Please cancel all active policies and issue refunds for unused premiums. If the policy covered a vehicle, please advise on transferring or canceling coverage.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate.$tpl$,
'{"Certified death certificate","Policy numbers","Beneficiary ID or Letters Testamentary"}', '15-30 business days', 'medium', '2026-03-19', NULL),

('Progressive', 'insurance', 'phone', '1-800-776-4737',
$tpl$Dear Progressive Claims Department,

I am notifying you of the death of [Full Name of Deceased], policyholder, who passed away on [Date of Death].

Policy Number(s): [Policy Number(s)]

I am the [Relationship to Deceased] and [beneficiary/executor] of their estate. Please cancel all active policies and issue refunds for unused premiums.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate.$tpl$,
'{"Certified death certificate","Policy numbers","Beneficiary ID or Letters Testamentary"}', '15-30 business days', 'medium', '2026-03-19', NULL),

('Allstate', 'insurance', 'phone', '1-800-255-7828',
$tpl$Dear Allstate Claims Department,

I am notifying you of the death of [Full Name of Deceased], policyholder, who passed away on [Date of Death].

Policy Number(s): [Policy Number(s)]

I am the [Relationship to Deceased] and [beneficiary/executor] of their estate. Please initiate any death benefit claims, cancel active policies, and issue refunds for unused premiums.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate.$tpl$,
'{"Certified death certificate","Policy numbers","Beneficiary ID or Letters Testamentary"}', '30-60 business days', 'medium', '2026-03-19', NULL),

('USAA', 'insurance', 'phone', '1-800-531-8722',
$tpl$Dear USAA Survivor Relations,

I am notifying you of the death of [Full Name of Deceased], a USAA member, who passed away on [Date of Death].

Member/Policy Number(s): [Member/Policy Number(s)]

I am the [Relationship to Deceased] and [beneficiary/executor] of their estate. Please initiate any death benefit claims across all policies (life, auto, home, renters). USAA has a dedicated Survivor Relations team — please transfer me to that department.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate, DD-214 (if applicable).$tpl$,
'{"Certified death certificate","Policy/member numbers","Beneficiary ID or Letters Testamentary","DD-214 (if applicable)"}', '30-60 business days', 'medium', '2026-03-19', NULL),

('Liberty Mutual', 'insurance', 'phone', '1-800-290-8711',
$tpl$Dear Liberty Mutual Claims Department,

I am notifying you of the death of [Full Name of Deceased], policyholder, who passed away on [Date of Death].

Policy Number(s): [Policy Number(s)]

I am the [Relationship to Deceased] and [beneficiary/executor] of their estate. Please cancel all active policies and issue refunds for unused premiums.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate.$tpl$,
'{"Certified death certificate","Policy numbers","Beneficiary ID or Letters Testamentary"}', '15-30 business days', 'medium', '2026-03-19', NULL),

('Nationwide', 'insurance', 'phone', '1-877-669-6877',
$tpl$Dear Nationwide Claims Department,

I am notifying you of the death of [Full Name of Deceased], policyholder, who passed away on [Date of Death].

Policy Number(s): [Policy Number(s)]

I am the [Relationship to Deceased] and [beneficiary/executor] of their estate. Please initiate any death benefit claims, cancel active policies, and issue refunds for unused premiums.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Certified death certificate.$tpl$,
'{"Certified death certificate","Policy numbers","Beneficiary ID or Letters Testamentary"}', '30-60 business days', 'medium', '2026-03-19', NULL)

ON CONFLICT (service_name) DO NOTHING;


-- =============================================================================
-- UTILITIES / TELECOM (10 entries)
-- =============================================================================
INSERT INTO subscription_templates (service_name, category, cancellation_method, cancellation_contact, template_text, required_documents, estimated_processing_time, difficulty_rating, last_verified_date, direct_url)
VALUES
('Comcast/Xfinity', 'utility', 'phone', '1-800-934-6489',
$tpl$Dear Comcast/Xfinity Customer Service,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their affairs.

Account Number: [Account Number]
Service Address: [Service Address]

Please close the account (or transfer it to my name) and send the final bill to the address below. Please also advise on returning any leased equipment (modem, router, cable box).

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'medium', '2026-03-19', NULL),

('AT&T', 'utility', 'phone', '1-800-331-0500',
$tpl$Dear AT&T Customer Service,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their affairs.

Account Number: [Account Number]
Service Address: [Service Address]

Please close the account (or transfer it to my name) and send the final bill to the address below. If there is an equipment lease or installment plan, please advise on the remaining balance. If there are other lines on the account, please advise on transferring the account.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'medium', '2026-03-19', NULL),

('Verizon', 'utility', 'phone', '1-800-922-0204',
$tpl$Dear Verizon Customer Service,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their affairs.

Account Number: [Account Number]
Phone Number on Account: [Phone Number]

Please close the account (or transfer it to my name) and send the final bill to the address below. If there is a device payment plan, please advise on the remaining balance.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'medium', '2026-03-19', NULL),

('T-Mobile', 'utility', 'phone', '1-800-937-8997',
$tpl$Dear T-Mobile Customer Service,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their affairs.

Account Number: [Account Number]
Phone Number on Account: [Phone Number]

Please close the account (or transfer it to my name) and send the final bill. If there is a device payment plan, please advise on the remaining balance. T-Mobile may waive early termination fees in case of death.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'medium', '2026-03-19', NULL),

('Spectrum (Charter)', 'utility', 'phone', '1-833-267-6094',
$tpl$Dear Spectrum Customer Service,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their affairs.

Account Number: [Account Number]
Service Address: [Service Address]

Please close the account and send the final bill. Please advise on returning any leased equipment.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'medium', '2026-03-19', NULL),

('CenturyLink/Lumen', 'utility', 'phone', '1-800-244-1111',
$tpl$Dear CenturyLink/Lumen Customer Service,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their affairs.

Account Number: [Account Number]
Service Address: [Service Address]

Please close the account and send the final bill. Please advise on returning any leased equipment.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'medium', '2026-03-19', NULL),

('Cox Communications', 'utility', 'phone', '1-800-234-3993',
$tpl$Dear Cox Communications Customer Service,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their affairs.

Account Number: [Account Number]
Service Address: [Service Address]

Please close the account and send the final bill. Please advise on returning any leased equipment.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'medium', '2026-03-19', NULL),

('Frontier Communications', 'utility', 'phone', '1-800-921-8101',
$tpl$Dear Frontier Communications Customer Service,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their affairs.

Account Number: [Account Number]
Service Address: [Service Address]

Please close the account and send the final bill. Please advise on returning any leased equipment.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'medium', '2026-03-19', NULL),

('National Grid', 'utility', 'phone', '1-800-642-4272',
$tpl$Dear National Grid Customer Service,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their affairs.

Account Number: [Account Number]
Service Address: [Service Address]

Please close the account (or transfer it to my name) and send the final bill. If utility service needs to continue at the address, please transfer the account.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'easy', '2026-03-19', NULL),

('Duke Energy', 'utility', 'phone', '1-800-777-9898',
$tpl$Dear Duke Energy Customer Service,

I am notifying you of the death of [Full Name of Deceased], an account holder, who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their affairs.

Account Number: [Account Number]
Service Address: [Service Address]

Please close the account (or transfer it to my name) and send the final bill.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'easy', '2026-03-19', NULL)

ON CONFLICT (service_name) DO NOTHING;


-- =============================================================================
-- GOVERNMENT (6 entries)
-- Government agencies have specific forms and processes, not letter templates
-- =============================================================================
INSERT INTO subscription_templates (service_name, category, cancellation_method, cancellation_contact, template_text, required_documents, estimated_processing_time, difficulty_rating, last_verified_date, direct_url)
VALUES
('Social Security Administration (SSA)', 'government', 'phone', '1-800-772-1213',
$tpl$Notifying Social Security of a Death

The Social Security Administration MUST be notified of the death. Do NOT report online — SSA requires phone or in-person notification.

Steps:
1. Call SSA at 1-800-772-1213 (TTY: 1-800-325-0778), Mon-Fri 8am-7pm local time
2. Provide: deceased''s SSN, date of birth, date of death, and your relationship
3. The funeral home may have already reported the death via Electronic Death Registration (EDR) — ask them

Important:
- Any Social Security benefits received for the month of death or later MUST be returned
- If benefits are direct-deposited, notify the bank to return any payments received after death
- Surviving spouse or dependents may be eligible for survivor benefits and a one-time $255 lump-sum death payment
- Apply for survivor benefits separately — they are not automatic

Form: There is no specific form. Notification is done by phone or in person at a local SSA office.$tpl$,
'{"Death certificate","Deceased SSN","Birth certificate of surviving spouse (for survivor benefits)","Marriage certificate (for spouse benefits)"}', '1-3 months for survivor benefits', 'medium', '2026-03-19', NULL),

('State DMV / Motor Vehicles', 'government', 'mail', 'Varies by state — contact your state DMV',
$tpl$Notifying the DMV of a Death

You should notify the state DMV to cancel the deceased''s driver''s license and vehicle registrations. This prevents identity theft and potential liability.

Steps:
1. Contact your state''s DMV (in person or by mail — varies by state)
2. Surrender the driver''s license (some states require this, others do not)
3. Transfer or cancel vehicle registrations and titles
4. If the vehicle is being kept, transfer the title to the new owner

Most states require:
- Completed title transfer application (varies by state)
- Death certificate
- Letters Testamentary or proof of executor status (if not a joint owner)

For title transfers, some states allow a surviving spouse to transfer without probate if the title was held jointly.

Check your state''s specific DMV website for exact forms and requirements.$tpl$,
'{"Death certificate","Vehicle title(s)","Letters Testamentary or proof of executor status","State-specific title transfer form"}', '2-4 weeks', 'medium', '2026-03-19', NULL),

('Voter Registration', 'government', 'mail', 'Varies by state/county — contact local Board of Elections',
$tpl$Removing a Deceased Person from Voter Rolls

The deceased should be removed from voter registration to prevent potential fraud.

Steps:
1. In most cases, this is handled automatically — the state vital records office notifies the Board of Elections when a death certificate is filed
2. If you want to confirm removal, contact your local county Board of Elections or Secretary of State office
3. Some states accept written notification with a copy of the death certificate

Note: In most states, you do NOT need to take action — the death certificate filing triggers automatic removal. However, it can take several months. If you are concerned, contact your local election office to confirm.

There is no federal form — this is handled at the state/county level.$tpl$,
'{"Death certificate (usually filed automatically)"}', 'Automatic (1-3 months after death certificate filing)', 'easy', '2026-03-19', NULL),

('Medicare', 'government', 'phone', '1-800-633-4227',
$tpl$Notifying Medicare of a Death

Medicare is typically notified automatically when Social Security is notified. However, you should verify and handle any outstanding claims.

Steps:
1. Notify Social Security first (1-800-772-1213) — this usually triggers Medicare notification
2. Call Medicare at 1-800-633-4227 (TTY: 1-877-486-2048) to verify they have been notified
3. If the deceased had a Medicare Advantage or Part D plan, contact the insurance company directly to cancel
4. If the deceased had a Medigap (supplemental) policy, contact that insurer to cancel and request a premium refund
5. Request a Medicare Summary Notice for any outstanding claims

Important:
- Medicare does not cover funeral expenses
- Providers cannot bill the estate for Medicare-covered services after death
- Any premium overpayments will be refunded to the estate

Form: No specific form needed — notification is done via Social Security.$tpl$,
'{"Death certificate","Medicare card/number","Deceased SSN"}', '1-2 months', 'medium', '2026-03-19', NULL),

('U.S. Passport Office', 'government', 'mail', 'U.S. Department of State, Passport Services',
$tpl$Canceling a U.S. Passport

The deceased''s passport should be canceled to prevent identity theft.

Steps:
1. Write a letter to the U.S. Department of State requesting passport cancellation
2. Include: deceased''s full name, date of birth, date of death, passport number (if known), and your relationship
3. Include a certified copy of the death certificate
4. Include the passport itself if available (it will be returned with holes punched through it)
5. Mail to:
   U.S. Department of State
   Passport Services
   Consular Lost/Stolen Passport Section
   44132 Mercure Cir
   PO Box 1227
   Sterling, VA 20166-1227

The canceled passport can serve as a keepsake — request its return in your letter.

Note: If you need the passport for estate matters before canceling it, make copies first.$tpl$,
'{"Death certificate","Passport (if available)","Letter requesting cancellation"}', '4-6 weeks', 'easy', '2026-03-19', NULL),

('Internal Revenue Service (IRS)', 'government', 'mail', 'IRS Decedent Correspondence',
$tpl$Notifying the IRS of a Death

The IRS must be notified, and tax obligations must be fulfilled for the deceased.

Key Tax Filing Requirements:
1. FINAL FORM 1040: File the deceased''s final personal income tax return (due April 15 of the following year)
2. FORM 1041: Estate income tax return (required if estate gross income >= $600). Due April 15 following the tax year.
3. FORM 706: Estate tax return (only if estate exceeds $15M as of 2026). Due 9 months after death. 6-month extension via Form 4768.
4. PORTABILITY: File Form 706 even if under $15M threshold to preserve unused exemption for surviving spouse.

To Notify:
- Write "DECEASED" across the top of the final Form 1040, along with the date of death
- File as the executor or surviving spouse
- Use Form 56 (Notice Concerning Fiduciary Relationship) to establish yourself as the estate representative with the IRS

Important: 99%+ of families will NOT owe federal estate tax (threshold is $15M individual / $30M married as of 2026).

Mail Form 56 to the IRS service center where the deceased filed their last return.$tpl$,
'{"Death certificate","Deceased SSN","Letters Testamentary","Form 56 (Notice Concerning Fiduciary Relationship)","Prior year tax returns"}', '3-6 months for processing', 'hard', '2026-03-19', NULL)

ON CONFLICT (service_name) DO NOTHING;


-- =============================================================================
-- MEMBERSHIP / SUBSCRIPTIONS (26 entries)
-- =============================================================================
INSERT INTO subscription_templates (service_name, category, cancellation_method, cancellation_contact, template_text, required_documents, estimated_processing_time, difficulty_rating, last_verified_date, direct_url)
VALUES
('Amazon Prime', 'membership', 'online', '1-888-280-4331',
$tpl$Dear Amazon Customer Service,

I am writing to request cancellation of the Amazon Prime membership belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account email: [Account Email]

Please cancel the Prime membership and all associated subscriptions (Prime Video, Prime Music, etc.) and stop recurring charges. If a prorated refund is available, please issue it to the estate. Please also advise on any digital content, Kindle library, or pending orders.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'medium', '2026-03-19', NULL),

('Planet Fitness', 'membership', 'mail', 'Local club address (certified mail required)',
$tpl$Dear Planet Fitness Member Services,

I am writing to request cancellation of the membership belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Member Name: [Full Name of Deceased]
Home Club: [Club Location]

Planet Fitness typically requires cancellation in person or by certified mail to the home club. Due to the member''s death, please process this cancellation by mail. Please stop all recurring charges immediately.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate. Sent via certified mail, return receipt requested.$tpl$,
'{"Death certificate","Certified mail receipt"}', '10-15 business days', 'hard', '2026-03-19', NULL),

('LA Fitness', 'membership', 'mail', 'Local club address (certified mail required)',
$tpl$Dear LA Fitness Member Services,

I am writing to request cancellation of the membership belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Member Name: [Full Name of Deceased]
Home Club: [Club Location]

Please cancel the membership and stop all recurring charges immediately due to the member''s death.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate. Sent via certified mail, return receipt requested.$tpl$,
'{"Death certificate","Certified mail receipt"}', '10-15 business days', 'hard', '2026-03-19', NULL),

('Adobe Creative Cloud', 'membership', 'online', 'helpx.adobe.com',
$tpl$Dear Adobe Customer Support,

I am writing to request cancellation of the Adobe Creative Cloud subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account email: [Account Email]

Please cancel the subscription and stop all recurring charges. Adobe may waive early termination fees in case of death — please confirm. If the subscription includes cloud storage (Creative Cloud Files), please advise on downloading any stored files before the account is closed.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'medium', '2026-03-19', NULL),

('Microsoft 365', 'membership', 'online', 'support.microsoft.com',
$tpl$Dear Microsoft Support,

I am writing to request cancellation of the Microsoft 365 subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account email: [Account Email]

Please cancel the subscription and stop all recurring charges. If the account includes OneDrive storage, please advise on downloading any stored files before closure. Microsoft has a Next of Kin process for deceased account holders — please initiate that process.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate","Proof of relationship"}', '10-20 business days', 'medium', '2026-03-19', NULL),

('HelloFresh', 'membership', 'online', 'hellofresh.com/account',
$tpl$Dear HelloFresh Customer Support,

I am writing to request cancellation of the meal kit subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account email: [Account Email]

Please cancel the subscription immediately, stop all recurring charges, and cancel any pending deliveries. If a refund is due for any undelivered boxes, please issue it to the estate.

Sincerely,
[Your Full Name]
[Your Phone Number]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('Blue Apron', 'membership', 'online', 'support.blueapron.com',
$tpl$Dear Blue Apron Customer Support,

I am writing to request cancellation of the meal kit subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account email: [Account Email]

Please cancel the subscription immediately, stop all recurring charges, and cancel any pending deliveries.

Sincerely,
[Your Full Name]
[Your Phone Number]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('New York Times', 'membership', 'online', '1-800-591-9233',
$tpl$Dear New York Times Customer Service,

I am writing to request cancellation of the subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account email or subscriber ID: [Account Email/ID]

Please cancel the subscription and stop all recurring charges. If there is print delivery, please stop delivery immediately. If a prorated refund is due, please issue it to the estate.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'easy', '2026-03-19', NULL),

('Wall Street Journal', 'membership', 'phone', '1-800-568-7625',
$tpl$Dear Wall Street Journal Customer Service,

I am writing to request cancellation of the subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account email or subscriber ID: [Account Email/ID]

Please cancel the subscription and stop all recurring charges. If there is print delivery, please stop delivery immediately. If a prorated refund is due, please issue it to the estate.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'easy', '2026-03-19', NULL),

('Washington Post', 'membership', 'online', 'washingtonpost.com/subscribe/signin',
$tpl$Dear Washington Post Customer Service,

I am writing to request cancellation of the subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account email: [Account Email]

Please cancel the subscription and stop all recurring charges.

Sincerely,
[Your Full Name]
[Your Phone Number]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('Costco', 'membership', 'phone', '1-800-774-2678',
$tpl$Dear Costco Member Services,

I am writing to request cancellation of the Costco membership belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Membership Number: [Membership Number]

Please cancel the membership. Costco offers a full membership fee refund at any time — please issue the refund to the estate. If there is a household card member, please advise on their options.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate, membership card (if available).$tpl$,
'{"Death certificate","Membership card (if available)"}', '5-10 business days', 'easy', '2026-03-19', NULL),

('Sam''s Club', 'membership', 'phone', '1-888-746-7726',
$tpl$Dear Sam''s Club Member Services,

I am writing to request cancellation of the Sam''s Club membership belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Membership Number: [Membership Number]

Please cancel the membership and issue a prorated refund if applicable.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate","Membership card (if available)"}', '5-10 business days', 'easy', '2026-03-19', NULL),

('AAA', 'membership', 'phone', '1-800-222-4357',
$tpl$Dear AAA Member Services,

I am writing to request cancellation of the AAA membership belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Membership Number: [Membership Number]

Please cancel the membership and issue a prorated refund for the unused portion. If there are other members on the account, please advise on their options.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate","Membership card (if available)"}', '5-10 business days', 'easy', '2026-03-19', NULL),

('PlayStation Plus', 'membership', 'online', 'playstation.com/support',
$tpl$Dear PlayStation Support,

I am writing to request cancellation of the PlayStation Plus subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

PlayStation Network ID: [PSN ID]
Account email: [Account Email]

Please cancel the subscription and stop all recurring charges. Sony has a process for handling deceased account holders — please initiate that process and advise on any digital purchases or wallet balance.

Sincerely,
[Your Full Name]
[Your Phone Number]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate","Proof of relationship"}', '10-20 business days', 'medium', '2026-03-19', NULL),

('Xbox Game Pass', 'membership', 'online', 'xbox.com/support',
$tpl$Dear Xbox / Microsoft Support,

I am writing to request cancellation of the Xbox Game Pass subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Gamertag: [Gamertag]
Account email: [Account Email]

Please cancel the subscription and stop all recurring charges. Microsoft has a Next of Kin process for deceased account holders — please initiate that process.

Sincerely,
[Your Full Name]
[Your Phone Number]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate","Proof of relationship"}', '10-20 business days', 'medium', '2026-03-19', NULL),

('Nintendo Switch Online', 'membership', 'online', 'nintendo.com/support',
$tpl$Dear Nintendo Customer Support,

I am writing to request cancellation of the Nintendo Switch Online subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Nintendo Account email: [Account Email]

Please cancel the subscription and stop all recurring charges. If this is a Family Membership, please advise on removing the deceased member while keeping other members active.

Sincerely,
[Your Full Name]
[Your Phone Number]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'easy', '2026-03-19', NULL),

('Apple One', 'membership', 'online', '1-800-275-2273',
$tpl$Dear Apple Support,

I am writing to request cancellation of the Apple One subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Apple ID: [Apple ID/Email]

Apple One bundles multiple services (iCloud+, Apple Music, Apple TV+, Apple Arcade, etc.). Please cancel the entire bundle and stop all recurring charges. Apple has a Digital Legacy program — please advise on accessing or transferring any data before closure.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate","Proof of relationship"}', '10-20 business days', 'medium', '2026-03-19', NULL),

('Peloton', 'membership', 'online', '1-866-679-9129',
$tpl$Dear Peloton Customer Support,

I am writing to request cancellation of the Peloton membership belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account email: [Account Email]

Please cancel the All-Access or App membership and stop all recurring charges. If there is a financing plan on the Peloton equipment, please advise separately on the remaining balance and options.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'medium', '2026-03-19', NULL),

('Equinox', 'membership', 'mail', 'Local club address (certified mail required)',
$tpl$Dear Equinox Member Services,

I am writing to request cancellation of the membership belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Member Name: [Full Name of Deceased]
Home Club: [Club Location]

Please cancel the membership and stop all recurring charges immediately. Equinox typically requires 45 days notice for cancellation, but this should be waived due to death.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate. Sent via certified mail, return receipt requested.$tpl$,
'{"Death certificate","Certified mail receipt"}', '10-15 business days', 'hard', '2026-03-19', NULL),

('YMCA', 'membership', 'phone', 'Local branch (varies by location)',
$tpl$Dear YMCA Member Services,

I am writing to request cancellation of the YMCA membership belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Member Name: [Full Name of Deceased]
Home Branch: [Branch Location]

Please cancel the membership and stop all recurring charges.

Sincerely,
[Your Full Name]
[Your Phone Number]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '5-10 business days', 'easy', '2026-03-19', NULL),

('Kindle Unlimited', 'membership', 'online', '1-888-280-4331',
$tpl$Dear Amazon Customer Service,

I am writing to request cancellation of the Kindle Unlimited subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account email: [Account Email]

Please cancel the Kindle Unlimited subscription and stop all recurring charges. Please also advise on any purchased Kindle books (not Kindle Unlimited borrows) — are they transferable?

Sincerely,
[Your Full Name]
[Your Phone Number]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('DoorDash DashPass', 'membership', 'online', 'doordash.com/help',
$tpl$Dear DoorDash Customer Support,

I am writing to request cancellation of the DashPass subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account email: [Account Email]

Please cancel the DashPass subscription and stop all recurring charges. Please also cancel any active orders.

Sincerely,
[Your Full Name]
[Your Phone Number]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('Uber One', 'membership', 'online', 'uber.com/help',
$tpl$Dear Uber Support,

I am writing to request cancellation of the Uber One membership belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account email/phone: [Account Email or Phone]

Please cancel the Uber One membership and stop all recurring charges. Please also deactivate the Uber account to prevent unauthorized use.

Sincerely,
[Your Full Name]
[Your Phone Number]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('Anytime Fitness', 'membership', 'mail', 'Local club address (certified mail required)',
$tpl$Dear Anytime Fitness Member Services,

I am writing to request cancellation of the membership belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Member Name: [Full Name of Deceased]
Home Club: [Club Location]

Please cancel the membership and stop all recurring charges immediately.

Sincerely,
[Your Full Name]
[Your Phone Number]
[Your Mailing Address]

Enclosed: Copy of death certificate. Sent via certified mail, return receipt requested.$tpl$,
'{"Death certificate","Certified mail receipt"}', '10-15 business days', 'hard', '2026-03-19', NULL),

('GoodRx Gold', 'membership', 'online', 'goodrx.com/help',
$tpl$Dear GoodRx Customer Support,

I am writing to request cancellation of the GoodRx Gold membership belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account email: [Account Email]

Please cancel the membership and stop all recurring charges.

Sincerely,
[Your Full Name]
[Your Phone Number]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL),

('Dollar Shave Club', 'membership', 'online', 'dollarshaveclub.com/help',
$tpl$Dear Dollar Shave Club Customer Support,

I am writing to request cancellation of the subscription belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their estate.

Account email: [Account Email]

Please cancel the subscription, stop all recurring charges, and cancel any pending shipments.

Sincerely,
[Your Full Name]
[Your Phone Number]

Enclosed: Copy of death certificate.$tpl$,
'{"Death certificate"}', '3-5 business days', 'easy', '2026-03-19', NULL)

ON CONFLICT (service_name) DO NOTHING;


-- =============================================================================
-- EMAIL PROVIDERS (5 entries)
-- =============================================================================
INSERT INTO subscription_templates (service_name, category, cancellation_method, cancellation_contact, template_text, required_documents, estimated_processing_time, difficulty_rating, last_verified_date, direct_url)
VALUES
('Google (Gmail / Google Account)', 'email', 'online', 'support.google.com/accounts/troubleshooter/6357590',
$tpl$Handling a Deceased Person''s Google Account

Google has an Inactive Account Manager feature and a process for requesting access to or deletion of a deceased person''s account.

Options:
1. INACTIVE ACCOUNT MANAGER: If the deceased set up Google''s Inactive Account Manager, trusted contacts are automatically notified and given access after the account goes inactive for a set period.

2. REQUEST ACCOUNT CLOSURE: Submit a request through Google''s support page for deceased users. You will need to provide:
   - Your full name and email address
   - The deceased''s full Gmail address
   - A copy of the death certificate
   - A copy of a document that connects you to the deceased (Letters Testamentary, power of attorney, birth certificate, marriage certificate)

3. REQUEST DATA ACCESS: You can request access to the deceased''s data (emails, photos, Drive files). Google reviews these on a case-by-case basis and may require a court order.

Google will NOT provide passwords to a deceased person''s account under any circumstances.$tpl$,
'{"Death certificate","Proof of relationship or executor status","Government-issued ID"}', '30-60 days', 'hard', '2026-03-19', NULL),

('Microsoft (Outlook / Hotmail)', 'email', 'online', 'support.microsoft.com',
$tpl$Handling a Deceased Person''s Microsoft Account

Microsoft has a Next of Kin (NOK) process for handling deceased account holders.

Steps:
1. Go to Microsoft Support and search for "Next of Kin" or "deceased account"
2. Submit the Next of Kin form with:
   - The deceased''s Microsoft account email
   - Your information and relationship to the deceased
   - A copy of the death certificate
   - Proof of your authority (Letters Testamentary, power of attorney)
3. Microsoft will review and may provide account data or close the account

Important:
- Microsoft will NOT provide the account password
- You may receive the account''s content (emails, OneDrive files) on physical media
- This process also covers Outlook.com, Hotmail, Xbox, and any other Microsoft account services
- Microsoft 365 subscriptions should be canceled separately$tpl$,
'{"Death certificate","Proof of relationship or executor status","Government-issued ID"}', '30-60 days', 'hard', '2026-03-19', NULL),

('Yahoo Mail', 'email', 'online', 'help.yahoo.com',
$tpl$Closing a Deceased Person''s Yahoo Account

Steps:
1. Go to Yahoo Help and search for "Close a deceased person''s account"
2. Submit a request with:
   - Your full name and contact information
   - The deceased''s Yahoo email address
   - A copy of the death certificate
   - Proof of your authority (Letters Testamentary, power of attorney)
3. Yahoo will close the account and delete all associated data

Important:
- Yahoo will NOT provide access to account content (emails, etc.)
- Yahoo will NOT forward emails from the closed account
- If the account is linked to other services (Flickr, Fantasy Sports), those will also be closed$tpl$,
'{"Death certificate","Proof of relationship or executor status"}', '30-60 days', 'medium', '2026-03-19', NULL),

('AOL Mail', 'email', 'online', 'help.aol.com',
$tpl$Closing a Deceased Person''s AOL Account

AOL is now owned by Yahoo (Verizon Media). The process is similar to Yahoo.

Steps:
1. Go to AOL Help and search for "deceased account"
2. Submit a request with the deceased''s AOL email, death certificate, and proof of your authority
3. AOL/Yahoo will close the account

If the deceased had AOL Desktop Gold or any paid AOL subscription, make sure to cancel that separately to stop charges.$tpl$,
'{"Death certificate","Proof of relationship or executor status"}', '30-60 days', 'medium', '2026-03-19', NULL),

('ProtonMail', 'email', 'email', 'support@protonmail.com',
$tpl$Dear ProtonMail Support,

I am writing to request closure of the ProtonMail account belonging to [Full Name of Deceased], who passed away on [Date of Death].

Account email: [ProtonMail Address]

I am the [Relationship to Deceased] handling their digital estate. Please close the account and cancel any paid subscription (ProtonMail Plus, Proton Unlimited, etc.).

Important note: Due to ProtonMail''s encryption, you will NOT be able to provide the contents of the account. I understand this and am requesting account closure only.

Sincerely,
[Your Full Name]
[Your Phone Number]

Enclosed: Death certificate and proof of relationship.$tpl$,
'{"Death certificate","Proof of relationship or executor status"}', '14-30 days', 'medium', '2026-03-19', NULL)

ON CONFLICT (service_name) DO NOTHING;


-- =============================================================================
-- CLOUD STORAGE (5 entries)
-- =============================================================================
INSERT INTO subscription_templates (service_name, category, cancellation_method, cancellation_contact, template_text, required_documents, estimated_processing_time, difficulty_rating, last_verified_date, direct_url)
VALUES
('Dropbox', 'cloud_storage', 'online', 'help.dropbox.com',
$tpl$Dear Dropbox Support,

I am writing to request closure of the Dropbox account belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their digital estate.

Account email: [Account Email]

Please cancel any paid subscription (Dropbox Plus, Professional, etc.) and stop recurring charges. Before closing the account, please advise on how to download the stored files. If the deceased used Dropbox for shared folders with other users, please advise on the impact to shared collaborators.

Sincerely,
[Your Full Name]
[Your Phone Number]

Enclosed: Death certificate and proof of relationship.$tpl$,
'{"Death certificate","Proof of relationship or executor status"}', '14-30 days', 'medium', '2026-03-19', NULL),

('Google One / Google Drive', 'cloud_storage', 'online', 'support.google.com/googleone',
$tpl$Canceling Google One Storage for a Deceased Person

Google One storage is tied to the Google Account. Follow the Google Account deceased user process:

1. If the deceased set up Inactive Account Manager, trusted contacts may already have access
2. Otherwise, submit a deceased user request through Google Support (see "Google (Gmail / Google Account)" entry)
3. Request data download before account closure if possible

The Google One paid storage subscription will end when the Google Account is closed. If the storage was shared with a Google One Family plan, other family members will revert to the free 15GB tier.

Note: Downloaded data may include Google Drive files, Photos, and other Google service data.$tpl$,
'{"Death certificate","Proof of relationship or executor status"}', '30-60 days', 'hard', '2026-03-19', NULL),

('iCloud+', 'cloud_storage', 'online', '1-800-275-2273',
$tpl$Canceling iCloud+ for a Deceased Person

iCloud+ is tied to the Apple ID. Apple has a Digital Legacy and deceased account process.

Steps:
1. Call Apple Support at 1-800-275-2273 or visit an Apple Store
2. Request the deceased account process for the Apple ID [Apple ID/Email]
3. You will need to provide a death certificate and proof of your authority
4. Apple may provide data access if the deceased set up Digital Legacy contacts (iOS 15.2+)
5. If no Digital Legacy contact was designated, Apple may require a court order to provide data access

The iCloud+ subscription will end when the Apple ID is closed. Any iCloud-synced data (photos, documents, backups) will be deleted.

If using Apple Family Sharing, other family members will lose shared iCloud+ storage.$tpl$,
'{"Death certificate","Proof of relationship or executor status","Court order (if no Digital Legacy contact)"}', '30-60 days', 'hard', '2026-03-19', NULL),

('OneDrive', 'cloud_storage', 'online', 'support.microsoft.com',
$tpl$Canceling OneDrive for a Deceased Person

OneDrive is tied to the Microsoft Account. Follow the Microsoft Next of Kin (NOK) process:

1. Go to Microsoft Support and submit the Next of Kin form
2. Provide the deceased''s Microsoft account email, death certificate, and proof of your authority
3. Microsoft may provide account data on physical media
4. The OneDrive subscription and stored files will be removed when the Microsoft Account is closed

If the deceased had a Microsoft 365 subscription that included OneDrive storage, cancel the subscription separately to stop charges (see "Microsoft 365" entry).$tpl$,
'{"Death certificate","Proof of relationship or executor status"}', '30-60 days', 'hard', '2026-03-19', NULL),

('Box', 'cloud_storage', 'online', 'support.box.com',
$tpl$Dear Box Support,

I am writing to request closure of the Box account belonging to [Full Name of Deceased], who passed away on [Date of Death]. I am the [Relationship to Deceased] handling their digital estate.

Account email: [Account Email]

Please cancel any paid subscription (Box Personal Pro, Business, etc.) and stop recurring charges. Before closing the account, please advise on how to download the stored files.

If the deceased used a Box enterprise account through their employer, please contact the employer''s IT department instead — they manage enterprise Box accounts.

Sincerely,
[Your Full Name]
[Your Phone Number]

Enclosed: Death certificate and proof of relationship.$tpl$,
'{"Death certificate","Proof of relationship or executor status"}', '14-30 days', 'medium', '2026-03-19', NULL)

ON CONFLICT (service_name) DO NOTHING;
