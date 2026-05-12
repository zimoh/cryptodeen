export type AssetType = "crypto" | "stock" | "index";

export type Region =
  | "Crypto"
  | "US"
  | "London"
  | "Paris"
  | "Tokyo"
  | "Milan"
  | "Frankfurt";

export type HalalGrade = "A" | "B" | "C" | "D" | "E";

export type RiskFlag =
  | "bds"
  | "unSanctions"
  | "warCrimesAllegation"
  | "leadershipWarCrimesExposure"
  | "leadershipAccusedEntityPromotion"
  | "companySocialMediaAccusedEntityPromotion"
  | "executiveSocialMediaAccusedEntityPromotion"
  | "leadershipFinancialCrimeConviction"
  | "leadershipSevereCriminalConviction"
  | "leadershipSexualExploitationConviction"
  | "leadershipPublicHealthConviction";

export type ComplianceInput = {
  businessActivity: number;
  interestExposure: number;
  debtRatio: number;
  liquidityPurity: number;
  governanceTransparency: number;
  investorBackground: number;
  leadershipEthics: number;
  socialMediaEthics: number;
  legalBackground: number;
};

export type InvestorProfile = {
  name: string;
  role: string;
  ownershipPercentage?: number;
  portfolioScore: number;
  exposureFlags: string[];
  rationale: string;
  sourceStatus: string;
};

export type LeadershipProfile = {
  name: string;
  role: string;
  ethicsScore: number;
  exposureFlags: string[];
  rationale: string;
  sourceStatus: string;
};

export type SocialMediaProfile = {
  subject: string;
  scope: "company" | "executive" | "founder" | "board" | "protocol";
  platformCoverage: string[];
  ethicsScore: number;
  exposureFlags: string[];
  rationale: string;
  sourceStatus: string;
};

export type LegalBackgroundProfile = {
  subject: string;
  role: string;
  jurisdictionCoverage: string[];
  legalScore: number;
  findingTypes: string[];
  rationale: string;
  sourceStatus: string;
};

export type Asset = {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  region: Region;
  venue: string;
  price: number;
  currency: string;
  change24h: number;
  marketCapRank?: number;
  compliance: ComplianceInput;
  investors: InvestorProfile[];
  leadership: LeadershipProfile[];
  socialMedia: SocialMediaProfile[];
  legalBackground: LegalBackgroundProfile[];
  flags: RiskFlag[];
  rationale: string[];
  purificationNote: string;
  sourceStatus: string[];
};

export type ScoredAsset = Asset & {
  score: number;
  grade: HalalGrade;
  investorScore: number;
  leadershipScore: number;
  socialMediaScore: number;
  legalBackgroundScore: number;
  forcedGradeReason?: string;
};
