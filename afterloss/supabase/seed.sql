-- AfterLoss Seed Data
-- All inserts are idempotent: ON CONFLICT DO NOTHING
-- Run with: supabase db seed

-- =============================================================================
-- CHECKLIST TEMPLATES — Master checklist organized by timeline
-- =============================================================================

-- IMMEDIATE (first 24 hours)
INSERT INTO checklist_templates (step_id, category, title, description, estimated_time_minutes, required_documents, deadline_rule, sort_order)
VALUES
  ('imm-01', 'immediate', 'Obtain a legal pronouncement of death', 'If the person died at home or without a doctor present, call 911 or the local coroner to get an official pronouncement.', 30, '{}', NULL, 1),
  ('imm-02', 'immediate', 'Contact a funeral home or cremation service', 'The funeral home will guide you through immediate next steps including transporting the body and planning arrangements.', 60, '{}', NULL, 2),
  ('imm-03', 'immediate', 'Notify immediate family and close friends', 'Reach out to close family members and friends. Consider designating someone to help spread the word.', 30, '{}', NULL, 3),
  ('imm-04', 'immediate', 'Secure the home and property', 'Lock the deceased''s home, secure valuables, and ensure pets are cared for.', 30, '{}', NULL, 4),
  ('imm-05', 'immediate', 'Locate important documents', 'Find the will, trust documents, insurance policies, financial accounts, and safe deposit box keys.', 120, '{"Will or trust", "Insurance policies", "Financial statements"}', NULL, 5),
  ('imm-06', 'immediate', 'Order death certificates', 'Order at least 10-15 certified copies. You will need them for banks, insurance, government agencies, and more.', 15, '{}', NULL, 6),
  ('imm-07', 'immediate', 'Contact the deceased''s employer', 'Notify their employer about the death. Ask about final paycheck, life insurance, retirement benefits, and COBRA health coverage.', 30, '{"Death certificate"}', NULL, 7),
  ('imm-08', 'immediate', 'Notify the deceased''s doctor and healthcare providers', 'Inform their primary care physician and any specialists.', 15, '{}', NULL, 8)
ON CONFLICT (step_id) DO NOTHING;

-- FIRST WEEK
INSERT INTO checklist_templates (step_id, category, title, description, estimated_time_minutes, required_documents, deadline_rule, sort_order)
VALUES
  ('wk1-01', 'first_week', 'Notify Social Security Administration', 'Report the death to SSA by calling 1-800-772-1213. The funeral home may do this for you via Electronic Death Registration (EDR).', 30, '{"Death certificate", "Deceased SSN"}', '+7 days', 1),
  ('wk1-02', 'first_week', 'Contact life insurance companies', 'File claims with all life insurance providers. Check employer benefits, personal policies, and mortgage insurance.', 60, '{"Death certificate", "Policy numbers", "Beneficiary ID"}', '+30 days', 2),
  ('wk1-03', 'first_week', 'Notify banks and financial institutions', 'Contact each bank to freeze or close accounts. Ask about joint accounts, safe deposit boxes, and automatic payments.', 60, '{"Death certificate", "Letters testamentary or affidavit"}', NULL, 3),
  ('wk1-04', 'first_week', 'Contact the post office', 'Forward mail to the executor or responsible family member to catch bills and correspondence.', 15, '{"Death certificate"}', NULL, 4),
  ('wk1-05', 'first_week', 'Secure digital accounts and passwords', 'Identify email accounts, social media, cloud storage, and digital subscriptions. Change passwords if needed for security.', 60, '{}', NULL, 5),
  ('wk1-06', 'first_week', 'Review and continue essential bills', 'Identify recurring bills (mortgage, utilities, insurance) that must continue to be paid to avoid service interruptions or penalties.', 45, '{}', NULL, 6),
  ('wk1-07', 'first_week', 'Contact the DMV', 'Report the death to the DMV to cancel the driver''s license and prevent identity theft.', 30, '{"Death certificate"}', NULL, 7),
  ('wk1-08', 'first_week', 'Notify credit card companies', 'Contact each credit card issuer to close or transfer accounts. Request final statements.', 45, '{"Death certificate"}', NULL, 8),
  ('wk1-09', 'first_week', 'Contact the Veterans Administration (if applicable)', 'If the deceased was a veteran, contact the VA about burial benefits, survivor benefits, and memorial headstone.', 30, '{"Death certificate", "DD-214 discharge papers"}', NULL, 9),
  ('wk1-10', 'first_week', 'Begin cancelling subscriptions and memberships', 'Cancel streaming services, gym memberships, magazine subscriptions, and other recurring charges.', 60, '{"Death certificate"}', NULL, 10)
ON CONFLICT (step_id) DO NOTHING;

-- FIRST MONTH
INSERT INTO checklist_templates (step_id, category, title, description, estimated_time_minutes, required_documents, deadline_rule, sort_order)
VALUES
  ('mo1-01', 'first_month', 'Consult with a probate attorney', 'Determine whether probate is required based on the estate size and your state''s laws. Many estates qualify for simplified probate.', 60, '{"Will", "Asset inventory"}', NULL, 1),
  ('mo1-02', 'first_month', 'File the will with the probate court', 'Most states require filing the will with the local probate court, even if full probate is not needed.', 60, '{"Original will", "Death certificate", "Filing fee"}', '+30 days', 2),
  ('mo1-03', 'first_month', 'Apply for Letters Testamentary or Letters of Administration', 'These court-issued documents give you legal authority to act on behalf of the estate.', 60, '{"Death certificate", "Will", "Petition for probate"}', NULL, 3),
  ('mo1-04', 'first_month', 'Create a complete inventory of assets', 'List all assets: real estate, vehicles, bank accounts, investments, retirement accounts, personal property, digital assets.', 180, '{}', NULL, 4),
  ('mo1-05', 'first_month', 'Create a complete inventory of debts', 'List all debts: mortgage, car loans, credit cards, medical bills, student loans, personal loans, taxes owed.', 120, '{}', NULL, 5),
  ('mo1-06', 'first_month', 'Notify creditors of the death', 'Send written notification to all known creditors. Some states require publishing a notice in the local newspaper.', 60, '{"Death certificate", "Letters testamentary"}', '+30 days', 6),
  ('mo1-07', 'first_month', 'Contact retirement account providers', 'Notify 401(k), IRA, and pension administrators. Beneficiary designations typically override the will.', 45, '{"Death certificate", "Beneficiary ID"}', NULL, 7),
  ('mo1-08', 'first_month', 'Transfer or cancel vehicle titles', 'Contact the DMV to transfer vehicle titles or cancel registration.', 45, '{"Death certificate", "Vehicle title", "Letters testamentary"}', NULL, 8),
  ('mo1-09', 'first_month', 'Review and update your own estate plan', 'If the deceased was your spouse or a beneficiary on your own accounts, update your will, beneficiaries, and power of attorney.', 60, '{}', NULL, 9),
  ('mo1-10', 'first_month', 'Contact the mortgage company', 'Notify the mortgage lender. Determine options: continue payments, refinance, or sell the property.', 30, '{"Death certificate", "Letters testamentary"}', NULL, 10),
  ('mo1-11', 'first_month', 'File for survivor benefits', 'Apply for Social Security survivor benefits, pension survivor benefits, and any other applicable benefits.', 60, '{"Death certificate", "Marriage certificate", "Birth certificates"}', NULL, 11),
  ('mo1-12', 'first_month', 'Notify health insurance providers', 'Cancel the deceased''s health insurance. If you were on their plan, apply for COBRA or marketplace coverage within 60 days.', 30, '{"Death certificate"}', '+60 days', 12)
ON CONFLICT (step_id) DO NOTHING;

-- FIRST QUARTER (1-3 months)
INSERT INTO checklist_templates (step_id, category, title, description, estimated_time_minutes, required_documents, deadline_rule, sort_order)
VALUES
  ('q1-01', 'first_quarter', 'Open an estate bank account', 'Open a separate checking account for the estate to track income and expenses during settlement.', 60, '{"Letters testamentary", "EIN", "Death certificate"}', NULL, 1),
  ('q1-02', 'first_quarter', 'Apply for an EIN for the estate', 'Apply for an Employer Identification Number from the IRS. Needed for the estate bank account and tax filing.', 15, '{}', NULL, 2),
  ('q1-03', 'first_quarter', 'Publish notice to creditors (if required)', 'Some states require publishing a notice in a local newspaper to alert unknown creditors. Check your state''s requirements.', 30, '{"Letters testamentary"}', '+30 days', 3),
  ('q1-04', 'first_quarter', 'Handle real estate', 'Determine whether to keep, sell, or transfer real property. Get appraisals if needed for probate or tax purposes.', 120, '{"Property deeds", "Letters testamentary"}', NULL, 4),
  ('q1-05', 'first_quarter', 'Cancel remaining subscriptions and services', 'Complete the cancellation of all remaining subscriptions, memberships, and online accounts.', 90, '{"Death certificate"}', NULL, 5),
  ('q1-06', 'first_quarter', 'Close or memorialize social media accounts', 'Contact Facebook, Instagram, Twitter/X, LinkedIn, and other platforms to memorialize or delete accounts.', 60, '{"Death certificate", "Proof of authority"}', NULL, 6),
  ('q1-07', 'first_quarter', 'Handle digital assets and cryptocurrency', 'Access and secure digital assets, cryptocurrency wallets, domain names, and online businesses.', 120, '{}', NULL, 7),
  ('q1-08', 'first_quarter', 'Pay outstanding debts from estate assets', 'Pay valid debts from estate funds. Personal debts generally do not transfer to heirs (except in community property states for spouses).', 60, '{"Creditor claims", "Estate account"}', NULL, 8),
  ('q1-09', 'first_quarter', 'Distribute personal property', 'Follow the will''s instructions or state law to distribute personal belongings, jewelry, and household items.', 120, '{"Will", "Inventory"}', NULL, 9),
  ('q1-10', 'first_quarter', 'Consider grief counseling or support groups', 'Take care of yourself. Grief is a process. Consider professional counseling or local support groups.', 30, '{}', NULL, 10)
ON CONFLICT (step_id) DO NOTHING;

-- FIRST YEAR
INSERT INTO checklist_templates (step_id, category, title, description, estimated_time_minutes, required_documents, deadline_rule, sort_order)
VALUES
  ('yr1-01', 'first_year', 'File the final income tax return (Form 1040)', 'File the deceased''s final personal income tax return for the year of death. Due April 15 of the following year.', 120, '{"W-2s", "1099s", "Death certificate"}', '+365 days', 1),
  ('yr1-02', 'first_year', 'File estate income tax return (Form 1041)', 'If the estate earned more than $600 in income, file Form 1041. Due April 15 of the year following the estate''s fiscal year end.', 120, '{"Estate income records", "EIN"}', '+365 days', 2),
  ('yr1-03', 'first_year', 'File estate tax return if required (Form 706)', 'Required if the estate exceeds $15M (2026 threshold). Due 9 months after death. Request 6-month extension with Form 4768 if needed.', 180, '{"Complete asset inventory", "Appraisals"}', '+270 days', 3),
  ('yr1-04', 'first_year', 'File for portability election if applicable', 'If married, file Form 706 even if under the $15M threshold to preserve the unused exemption for the surviving spouse.', 120, '{"Estate valuation"}', '+270 days', 4),
  ('yr1-05', 'first_year', 'Distribute remaining estate assets to heirs', 'After all debts, taxes, and expenses are paid, distribute remaining assets according to the will or state intestacy laws.', 120, '{"Court approval", "Final accounting"}', NULL, 5),
  ('yr1-06', 'first_year', 'File final accounting with probate court', 'Submit a final accounting to the court showing all income, expenses, and distributions. Required to close the estate.', 120, '{"All receipts", "Distribution records"}', NULL, 6),
  ('yr1-07', 'first_year', 'Close the estate with the probate court', 'Petition the court to formally close the estate once all obligations are met.', 60, '{"Final accounting", "Distribution proof"}', NULL, 7),
  ('yr1-08', 'first_year', 'Close the estate bank account', 'After all estate business is complete, close the estate checking account.', 15, '{"Court order closing estate"}', NULL, 8),
  ('yr1-09', 'first_year', 'Store important documents permanently', 'Keep copies of the will, death certificates, tax returns, and estate settlement records. Some should be kept indefinitely.', 30, '{}', NULL, 9),
  ('yr1-10', 'first_year', 'Review your own estate plan', 'After going through this process, update your own will, beneficiary designations, and advance directives.', 60, '{}', NULL, 10)
ON CONFLICT (step_id) DO NOTHING;

-- =============================================================================
-- AFFILIATE PARTNERS — Initial partner data
-- =============================================================================
INSERT INTO affiliate_partners (partner_name, category, url, description, commission_type, display_context)
VALUES
  ('Trust & Will', 'estate_planning', 'https://trustandwill.com', 'Online estate planning — wills, trusts, and guardianship.', '20% per sale', '{"mo1-01", "mo1-09", "yr1-10"}'),
  ('LegalZoom', 'legal_services', 'https://legalzoom.com', 'Legal services including estate planning, probate help, and attorney referrals.', '15% per sale', '{"mo1-01", "mo1-02", "mo1-03"}'),
  ('Nolo', 'legal_self_help', 'https://nolo.com', 'Legal self-help books and guides on probate, wills, and estate planning.', 'Up to 15%', '{"mo1-01", "mo1-02", "q1-04"}'),
  ('BetterHelp', 'grief_counseling', 'https://betterhelp.com', 'Online therapy and counseling — connect with a licensed therapist from home.', '$10-$150 per referral', '{"q1-10"}'),
  ('Rocket Lawyer', 'legal_services', 'https://rocketlawyer.com', 'Legal documents, attorney consultations, and business formation.', '30% per sale', '{"mo1-01", "mo1-03"}')
ON CONFLICT DO NOTHING;
