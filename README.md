# Cryptodeen

Cryptodeen is a cross-platform market portal for halal-aware crypto and equity screening. The app is designed to run on web, iOS, and Android from one Expo codebase.

## Current MVP

- Ranked asset list for crypto, US, London, Paris, Tokyo, Milan, and Frankfurt markets.
- Search and filters by market, halal grade, and risk flags.
- Halal index grades:
  - `A`: 75-100, very adherent
  - `B`: 60-74, adherent
  - `C`: 45-59, questionable
  - `D`: 25-44, not adherent
  - `E`: below 25, lowest adherence
- Active `BDS`, `UN sanctions`, or `war-crimes allegation` flags force the grade to `E`.
- Leadership ethics screening for founders, board members, C-level executives, and high-influence promoters.
- Verified leadership links to active-duty war-crimes exposure or promotion of an accused entity can force an `E` grade.
- Full company social media screening and executive/founder/board public-post analysis.
- Verified official or executive social promotion of an entity accused by UN representatives of war crimes can force an `E` grade.
- Legal background screening for founders, board members, C-level executives, and material protocol leaders.
- Verified leadership convictions or official findings for corruption, bribery, fraud, exploitation/abuse, severe criminal conduct, or serious public-health harm can force an `E` grade when legally relevant and source-backed.
- Selected-asset rationale panel with source status, purification note, and shariah-screen dimensions.

The included quotes and compliance inputs are seeded sample data. They are not investment advice, fatwa, or live market data.

## Run

```bash
npm install
npm run web
```

For mobile development:

```bash
npm start
```

Then open the project in Expo Go on iOS or Android.

## Product direction

Cryptodeen should separate three layers:

1. Market data adapters: quote, market cap rank, fundamentals, filings, and exchange metadata.
2. Screening engine: shariah business activity, financial ratios, purification estimate, controversy flags, and forced exclusions.
3. Investor and leadership due diligence: material shareholder portfolios, board/C-level/founder backgrounds, active influence, and controversy evidence.
4. Social media evidence pipeline: official account inventory, executive public posts, source archives, AI triage, and human review.
5. Legal background pipeline: court/regulator/sanctions sources, jurisdiction coverage, disposition status, recency, privacy constraints, and reviewer approval.
6. Review workflow: scholar-approved methodology versions, source evidence, audit logs, and public rationale.

Do not publish compliance grades as final until a qualified shariah review process and source-verification process are in place.
