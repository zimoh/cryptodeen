import { Asset, HalalGrade, RiskFlag, ScoredAsset } from "@/types";

const FORCED_E_FLAGS: Record<RiskFlag, string> = {
  bds: "Flagged by BDS boycott criteria",
  unSanctions: "Linked to UN sanctions screening",
  warCrimesAllegation: "Alleged direct or indirect participation in war crimes by UN representatives",
  leadershipWarCrimesExposure: "Leadership background linked to active-duty service in an army accused of war crimes",
  leadershipAccusedEntityPromotion: "Leadership background linked to active promotion of an entity accused by UN representatives of war crimes",
  companySocialMediaAccusedEntityPromotion:
    "Official company social media linked to promotion of an entity accused by UN representatives of war crimes",
  executiveSocialMediaAccusedEntityPromotion:
    "Executive or founder social media linked to promotion of an entity accused by UN representatives of war crimes",
  leadershipFinancialCrimeConviction: "Leadership legal background includes a verified financial crime, corruption, fraud, or bribery conviction",
  leadershipSevereCriminalConviction: "Leadership legal background includes a verified severe criminal conviction relevant to governance ethics",
  leadershipSexualExploitationConviction:
    "Leadership legal background includes a verified sexual exploitation, child abuse, or trafficking conviction",
  leadershipPublicHealthConviction:
    "Leadership legal background includes a verified public-health, safety, or mass-harm conviction relevant to governance ethics",
};

export function gradeFromScore(score: number): HalalGrade {
  if (score >= 75) return "A";
  if (score >= 60) return "B";
  if (score >= 45) return "C";
  if (score >= 25) return "D";
  return "E";
}

export function scoreAsset(asset: Asset): ScoredAsset {
  const forcedFlag = asset.flags.find((flag) => flag in FORCED_E_FLAGS);
  const investorScore = scoreInvestorBackground(asset);
  const leadershipScore = scoreLeadershipEthics(asset);
  const socialMediaScore = scoreSocialMediaEthics(asset);
  const legalBackgroundScore = scoreLegalBackground(asset);
  const weightedScore =
    asset.compliance.businessActivity * 0.24 +
    asset.compliance.interestExposure * 0.15 +
    asset.compliance.debtRatio * 0.13 +
    asset.compliance.liquidityPurity * 0.1 +
    asset.compliance.governanceTransparency * 0.07 +
    investorScore * 0.08 +
    leadershipScore * 0.08 +
    socialMediaScore * 0.07 +
    legalBackgroundScore * 0.08;

  if (forcedFlag) {
    return {
      ...asset,
      score: Math.round(weightedScore),
      grade: "E",
      investorScore,
      leadershipScore,
      socialMediaScore,
      legalBackgroundScore,
      forcedGradeReason: FORCED_E_FLAGS[forcedFlag],
    };
  }

  const score = Math.round(weightedScore);
  return {
    ...asset,
    score,
    grade: gradeFromScore(score),
    investorScore,
    leadershipScore,
    socialMediaScore,
    legalBackgroundScore,
  };
}

export function scoreInvestorBackground(asset: Asset) {
  if (asset.investors.length === 0) {
    return asset.compliance.investorBackground;
  }

  const totalWeight = asset.investors.reduce((sum, investor) => sum + investorWeight(investor.ownershipPercentage), 0);
  const weighted = asset.investors.reduce(
    (sum, investor) => sum + investor.portfolioScore * investorWeight(investor.ownershipPercentage),
    0,
  );

  return Math.round(weighted / totalWeight);
}

function investorWeight(ownershipPercentage?: number) {
  if (ownershipPercentage === undefined) return 1;
  return Math.max(1, ownershipPercentage);
}

export function scoreLeadershipEthics(asset: Asset) {
  if (asset.leadership.length === 0) {
    return asset.compliance.leadershipEthics;
  }

  const totalWeight = asset.leadership.reduce((sum, leader) => sum + leadershipWeight(leader.role), 0);
  const weighted = asset.leadership.reduce((sum, leader) => sum + leader.ethicsScore * leadershipWeight(leader.role), 0);

  return Math.round(weighted / totalWeight);
}

function leadershipWeight(role: string) {
  const normalized = role.toLowerCase();
  if (normalized.includes("founder") || normalized.includes("chief executive") || normalized.includes("ceo")) return 3;
  if (normalized.includes("chair") || normalized.includes("board") || normalized.includes("director")) return 2;
  if (normalized.includes("c-level") || normalized.includes("executive")) return 2;
  return 1;
}

export function scoreSocialMediaEthics(asset: Asset) {
  if (asset.socialMedia.length === 0) {
    return asset.compliance.socialMediaEthics;
  }

  const totalWeight = asset.socialMedia.reduce((sum, profile) => sum + socialMediaWeight(profile.scope), 0);
  const weighted = asset.socialMedia.reduce((sum, profile) => sum + profile.ethicsScore * socialMediaWeight(profile.scope), 0);

  return Math.round(weighted / totalWeight);
}

function socialMediaWeight(scope: string) {
  if (scope === "company") return 3;
  if (scope === "founder" || scope === "executive") return 2;
  return 1;
}

export function scoreLegalBackground(asset: Asset) {
  if (asset.legalBackground.length === 0) {
    return asset.compliance.legalBackground;
  }

  const totalWeight = asset.legalBackground.reduce((sum, profile) => sum + legalBackgroundWeight(profile.role), 0);
  const weighted = asset.legalBackground.reduce((sum, profile) => sum + profile.legalScore * legalBackgroundWeight(profile.role), 0);

  return Math.round(weighted / totalWeight);
}

function legalBackgroundWeight(role: string) {
  const normalized = role.toLowerCase();
  if (normalized.includes("founder") || normalized.includes("chief executive") || normalized.includes("ceo")) return 3;
  if (normalized.includes("chair") || normalized.includes("board") || normalized.includes("director")) return 2;
  if (normalized.includes("c-level") || normalized.includes("executive")) return 2;
  return 1;
}

export function explainGrade(grade: HalalGrade) {
  switch (grade) {
    case "A":
      return "Very adherent";
    case "B":
      return "Adherent";
    case "C":
      return "Questionable";
    case "D":
      return "Not adherent";
    case "E":
      return "Lowest adherence";
  }
}
