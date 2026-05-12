# Compliance Methodology Draft

This is an implementation draft, not a fatwa or investment recommendation.

## Grade model

Cryptodeen computes a 0-100 score from nine dimensions:

- Business activity: whether the asset's primary activity is permissible.
- Interest exposure: exposure to interest income, lending, or yield mechanics.
- Debt ratio: conventional debt and leverage screening.
- Liquidity purity: cash, receivables, and non-operating financial instruments.
- Governance transparency: disclosure quality, protocol/company transparency, and review confidence.
- Investor background: ownership-chain review of major shareholders, insiders, lead VC funds, strategic investors, asset managers, sovereign wealth funds, and other material beneficial owners.
- Leadership ethics: background review of founders, board members, C-level executives, high-influence promoters, and public representatives.
- Social media ethics: full screening of official company channels and public posts from executives, founders, board members, protocol leaders, and other high-influence promoters.
- Legal background: public-record and regulatory background checks for leadership and board members where convictions, sanctions, bars, or findings materially affect governance ethics.

Weights in the MVP:

- Business activity: 24%
- Interest exposure: 15%
- Debt ratio: 13%
- Liquidity purity: 10%
- Governance transparency: 7%
- Investor background: 8%
- Leadership ethics: 8%
- Social media ethics: 7%
- Legal background: 8%

Grade bands:

- `A`: 75-100, very adherent
- `B`: 60-74, adherent
- `C`: 45-59, questionable
- `D`: 25-44, not adherent
- `E`: below 25, lowest adherence

## Forced exclusions

An active flag in any of these categories forces an `E` grade regardless of numeric score:

- BDS boycott list match.
- UN sanctions screening match.
- Alleged direct or indirect participation in war crimes according to UN representatives.
- Verified leadership background involving active-duty service in an army accused of war crimes.
- Verified leadership activity promoting, defending, financing, or materially enabling an entity accused by UN representatives of war crimes.
- Verified official company social media promotion, defense, financing, recruitment, or material support for an entity accused by UN representatives of war crimes.
- Verified executive, founder, board member, protocol leader, or high-influence promoter social post supporting or materially promoting an entity accused by UN representatives of war crimes.
- Verified leadership or board conviction for financial crime, fraud, bribery, corruption, money laundering, market abuse, or sanctions evasion.
- Verified leadership or board conviction for severe criminal conduct materially relevant to ethical governance.
- Verified leadership or board conviction for sexual exploitation, child sexual abuse, trafficking, or similar abuse offenses.
- Verified leadership or board conviction or regulatory finding for serious public-health, safety, environmental, or mass-harm misconduct.

Every forced exclusion must store source URL, source date, reviewer, and evidence status before being shown in production.

## Investor background screen

Every material investor should receive its own portfolio grade from `A` to `E`.

Investor screening covers:

- Portfolio exposure to weapons, military technology, surveillance, conventional finance, gambling, alcohol, pornography, non-halal food chains, and other prohibited or harmful sectors.
- Direct or indirect investment in companies linked to BDS boycott criteria, UN sanctions, or alleged war-crimes participation according to UN representatives.
- Whether the investor is passive, active, strategic, controlling, lead venture investor, board appointing, or otherwise able to influence the company.
- Ownership percentage, voting rights, board seats, financing terms, and public stewardship position.
- Source quality: regulatory filings, cap tables, annual reports, fund holdings, public portfolio pages, sanctions lists, UN materials, BDS sources, and human reviewer notes.

Investor score bands use the same `A` to `E` grade bands as assets. A low-scoring material investor lowers the asset's investor-background score. A controlling or strategic investor with a verified `D` or `E` profile can cap the asset grade until reviewed.

Examples of how the rule applies:

- A broad asset manager or VC fund with substantial verified exposure to military technology, weapons, or companies flagged by BDS/sanctions/war-crimes sources should receive a low investor grade, often `D` or `E` depending on evidence and materiality.
- Named investors such as BlackRock, Sequoia, sovereign funds, or defense-focused funds must not be publicly assigned a `D` or `E` grade without stored evidence, source dates, and reviewer approval.
- Minor passive ownership can still reduce the score, but it should be weighted differently from controlling ownership, lead venture ownership, board control, or strategic financing.

## Leadership ethics screen

Every material leader should receive an ethics profile and a 0-100 score mapped to the same `A` to `E` grade bands.

Leadership screening covers:

- Founders, co-founders, board members, chairs, C-level executives, general partners for lead VC-backed companies, high-influence public promoters, and public representatives of protocols or DAOs.
- Prior or current active-duty military service, command responsibility, defense-intelligence roles, weapons procurement roles, and state-security roles.
- Public activity promoting, defending, financing, lobbying for, or materially enabling an army, state body, company, or organization accused by UN representatives of war crimes.
- Links to BDS boycott criteria, UN sanctions, human-rights investigations, procurement controversies, or conflict-finance allegations.
- Whether the person is currently influential in the asset: founder control, CEO authority, board seat, voting control, protocol governance influence, or public spokesperson role.

Leadership flags:

- `leadershipWarCrimesExposure`: verified active-duty leadership or service connection to an army accused of war crimes.
- `leadershipAccusedEntityPromotion`: verified active promotion or material support for an entity accused by UN representatives of war crimes.

These flags can force the asset grade to `E` under the forced-exclusion policy. They must not be shown as public facts unless the app stores:

- Evidence source URLs or documents.
- Source date and retrieval date.
- Exact allegation wording and the body making the allegation.
- Reviewer name or reviewer role.
- Confidence level and dispute status.
- Whether the person is still active in the company or protocol.

For production, the app should distinguish between:

- Confirmed evidence: can affect score and public flags.
- Under review: can lower confidence and require manual review, but should not be stated as fact.
- Disputed or stale evidence: must show context and recency before affecting a public grade.

## Social media ethics screen

Cryptodeen screens both official corporate communications and leadership-level public posts.

Company social media screening covers:

- Official accounts on X, LinkedIn, YouTube, TikTok, Instagram, Facebook, Discord, Telegram, GitHub, Medium, Substack, company blogs, investor-relations pages, and newsroom posts.
- Product marketing, recruitment, partnership announcements, public policy statements, crisis statements, sponsored content, and executive quote cards published by the company.
- Promotion of prohibited sectors, weapons, surveillance, military technology, gambling, alcohol, pornography, interest-based finance, misleading shariah claims, greenwashing, hate speech, dehumanizing rhetoric, or accused entities.
- Deletions, edits, reposts, quote-posts, likes when publicly visible, and coordinated campaign behavior where evidence can be preserved.

Executive social media screening covers:

- Founders, board members, C-level executives, lead protocol maintainers, general partners acting as company sponsors, public spokespeople, and other individuals who materially influence the asset.
- Public posts, reposts, quote-posts, interviews, newsletters, podcasts, livestreams, conference statements, and public comments.
- Promotion, defense, fundraising, recruitment, lobbying, procurement advocacy, or reputational support for entities accused by UN representatives of war crimes.
- Patterns of hateful, dehumanizing, racist, anti-Muslim, antisemitic, or otherwise harmful statements that create material ethical risk.

Social media analysis must preserve:

- Post URL, platform, author handle, author role, timestamp, retrieval date, and screenshot or archive hash.
- Exact post text or a short compliant excerpt, with translation when needed.
- Whether the post is original, repost, quote-post, like, reply, interview, or company-published statement.
- AI classifier output, human reviewer decision, confidence level, and dispute status.
- Evidence recency and whether the person still holds a material role.

Social-media flags:

- `companySocialMediaAccusedEntityPromotion`: verified official-channel promotion or material support for an entity accused by UN representatives of war crimes.
- `executiveSocialMediaAccusedEntityPromotion`: verified executive, founder, board, protocol-leader, or promoter post supporting or materially promoting an accused entity.

These flags can force the asset grade to `E`. Lower-severity social-media concerns can reduce the social-media ethics score without forcing an exclusion.

## Legal background screen

Cryptodeen screens the legal and regulatory background of material leaders:

- Founders, co-founders, board members, chairs, C-level executives, controlling partners, general partners for lead VC-backed companies, protocol leaders, and any public representative with material influence.
- Criminal convictions, plea agreements, regulatory bars, director disqualifications, sanctions, corruption findings, bribery findings, fraud findings, money-laundering findings, market-abuse findings, and serious public-health or safety findings.
- Serious abuse categories, including sexual exploitation, trafficking, child sexual abuse, child exploitation, and related offenses. Prostitution-related records must be handled carefully: only leadership wrongdoing that is legally relevant to governance ethics should affect the score, and records that indicate victimization, exploitation, sealed records, or non-material private conduct must not be used as a public ethical penalty.
- Public-health and safety records such as knowingly harmful products, mass negligence, environmental crime, public-health fraud, product-safety convictions, or regulatory findings that caused material harm.

Legal background evidence must preserve:

- Person identity, role, and active/inactive status at the company or protocol.
- Jurisdiction searched and jurisdiction not searched.
- Court, regulator, sanctions, or official source URL/document.
- Case number or regulator reference where available.
- Charge, conviction/finding, disposition, sentence/sanction, and date.
- Whether the record is final, appealed, overturned, expunged, sealed, pardoned, spent, stale, disputed, or under review.
- Reviewer decision, confidence level, and reason the record is material to governance.

Legal-background flags:

- `leadershipFinancialCrimeConviction`: verified conviction/finding for fraud, bribery, corruption, money laundering, market abuse, sanctions evasion, or similar financial misconduct.
- `leadershipSevereCriminalConviction`: verified severe criminal conviction relevant to governance ethics.
- `leadershipSexualExploitationConviction`: verified sexual exploitation, child abuse, trafficking, or similar abuse conviction.
- `leadershipPublicHealthConviction`: verified public-health, safety, environmental, or mass-harm conviction/finding.

These flags can force the asset grade to `E` when the record is verified, material, and still relevant. Non-final allegations, sealed or expunged records, unrelated minor offenses, and stale records should not be shown as public facts or used as hard exclusions without legal and reviewer approval.

## Crypto-specific review

Crypto assets need separate treatment from equities:

- Spot asset utility and tokenomics.
- Staking, lending, leverage, derivatives, and wrapped assets.
- Protocol revenue and fee distribution.
- Governance concentration and censorship risk.
- Exchange/custody product risk separate from the base asset.

## Equity-specific review

Stocks and indices need current filings and index constituent analysis:

- Sector and revenue screen.
- Interest income and non-compliant income.
- Conventional debt ratio.
- Cash and receivables ratio.
- Purification estimate.
- Controversy and sanctions review.

## Production requirements

- Version every methodology change.
- Keep source evidence for each grade.
- Separate automated draft score from scholar-approved score.
- Show confidence level and last-reviewed date.
- Re-screen assets when filings, sanctions, BDS, or controversy sources change.
