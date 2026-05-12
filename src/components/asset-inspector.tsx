import { Text, View } from "react-native";

import { GradePill } from "@/components/grade-pill";
import { gradeFromScore } from "@/compliance";
import { colors } from "@/theme";
import { RiskFlag, ScoredAsset } from "@/types";

type AssetInspectorProps = {
  asset: ScoredAsset;
};

const riskLabels: Record<RiskFlag, string> = {
  bds: "BDS boycott",
  unSanctions: "UN sanctions",
  warCrimesAllegation: "War-crimes allegation",
  leadershipWarCrimesExposure: "Leadership war-crimes exposure",
  leadershipAccusedEntityPromotion: "Leadership accused-entity promotion",
  companySocialMediaAccusedEntityPromotion: "Company social promotion",
  executiveSocialMediaAccusedEntityPromotion: "Executive social promotion",
  leadershipFinancialCrimeConviction: "Leadership financial crime conviction",
  leadershipSevereCriminalConviction: "Leadership severe criminal conviction",
  leadershipSexualExploitationConviction: "Leadership exploitation conviction",
  leadershipPublicHealthConviction: "Leadership public-health conviction",
};

export function AssetInspector({ asset }: AssetInspectorProps) {
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        gap: 16,
      }}
    >
      <View style={{ gap: 8 }}>
        <Text selectable style={{ color: colors.muted, fontSize: 12, lineHeight: 15, fontWeight: "700" }}>
          SELECTED ASSET
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <View style={{ flex: 1, gap: 3 }}>
            <Text selectable style={{ color: colors.ink, fontSize: 23, lineHeight: 27, fontWeight: "800" }}>
              {asset.symbol}
            </Text>
            <Text selectable style={{ color: colors.muted, fontSize: 14, lineHeight: 18, fontWeight: "600" }}>
              {asset.name}
            </Text>
          </View>
          <GradePill grade={asset.grade} score={asset.score} />
        </View>
      </View>

      {asset.forcedGradeReason ? (
        <View style={{ backgroundColor: "#fff2ef", borderRadius: 6, borderWidth: 1, borderColor: "#efb3a8", padding: 11 }}>
          <Text selectable style={{ color: colors.danger, fontSize: 13, lineHeight: 18, fontWeight: "700" }}>
            Forced E: {asset.forcedGradeReason}
          </Text>
        </View>
      ) : null}

      <MetricGrid asset={asset} />

      <Section title="Investor background">
        <Text selectable style={{ color: colors.ink, fontSize: 13, lineHeight: 18 }}>
          Ownership-chain score: {asset.investorScore}% ({gradeFromScore(asset.investorScore)})
        </Text>
        {asset.investors.map((investor) => (
          <View
            key={investor.name}
            style={{
              borderRadius: 6,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 9,
              gap: 7,
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
              <View style={{ flex: 1, gap: 2 }}>
                <Text selectable style={{ color: colors.ink, fontSize: 13, lineHeight: 16, fontWeight: "800" }}>
                  {investor.name}
                </Text>
                <Text selectable style={{ color: colors.muted, fontSize: 11, lineHeight: 14, fontWeight: "600" }}>
                  {investor.role}
                  {investor.ownershipPercentage ? ` · ${investor.ownershipPercentage}%` : ""}
                </Text>
              </View>
              <GradePill grade={gradeFromScore(investor.portfolioScore)} score={investor.portfolioScore} />
            </View>
            <Text selectable style={{ color: colors.ink, fontSize: 12, lineHeight: 17 }}>
              {investor.rationale}
            </Text>
            <Text selectable style={{ color: colors.muted, fontSize: 11, lineHeight: 14, fontWeight: "700" }}>
              {investor.sourceStatus}
            </Text>
          </View>
        ))}
      </Section>

      <Section title="Leadership ethics">
        <Text selectable style={{ color: colors.ink, fontSize: 13, lineHeight: 18 }}>
          Board, founder, and C-level score: {asset.leadershipScore}% ({gradeFromScore(asset.leadershipScore)})
        </Text>
        {asset.leadership.map((leader) => (
          <View
            key={`${leader.name}-${leader.role}`}
            style={{
              borderRadius: 6,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 9,
              gap: 7,
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
              <View style={{ flex: 1, gap: 2 }}>
                <Text selectable style={{ color: colors.ink, fontSize: 13, lineHeight: 16, fontWeight: "800" }}>
                  {leader.name}
                </Text>
                <Text selectable style={{ color: colors.muted, fontSize: 11, lineHeight: 14, fontWeight: "600" }}>
                  {leader.role}
                </Text>
              </View>
              <GradePill grade={gradeFromScore(leader.ethicsScore)} score={leader.ethicsScore} />
            </View>
            <Text selectable style={{ color: colors.ink, fontSize: 12, lineHeight: 17 }}>
              {leader.rationale}
            </Text>
            <Text selectable style={{ color: colors.muted, fontSize: 11, lineHeight: 14, fontWeight: "700" }}>
              {leader.sourceStatus}
            </Text>
          </View>
        ))}
      </Section>

      <Section title="Social media screen">
        <Text selectable style={{ color: colors.ink, fontSize: 13, lineHeight: 18 }}>
          Company and executive posts score: {asset.socialMediaScore}% ({gradeFromScore(asset.socialMediaScore)})
        </Text>
        {asset.socialMedia.map((profile) => (
          <View
            key={`${profile.subject}-${profile.scope}`}
            style={{
              borderRadius: 6,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 9,
              gap: 7,
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
              <View style={{ flex: 1, gap: 2 }}>
                <Text selectable style={{ color: colors.ink, fontSize: 13, lineHeight: 16, fontWeight: "800" }}>
                  {profile.subject}
                </Text>
                <Text selectable style={{ color: colors.muted, fontSize: 11, lineHeight: 14, fontWeight: "600" }}>
                  {profile.scope} · {profile.platformCoverage.join(", ")}
                </Text>
              </View>
              <GradePill grade={gradeFromScore(profile.ethicsScore)} score={profile.ethicsScore} />
            </View>
            <Text selectable style={{ color: colors.ink, fontSize: 12, lineHeight: 17 }}>
              {profile.rationale}
            </Text>
            <Text selectable style={{ color: colors.muted, fontSize: 11, lineHeight: 14, fontWeight: "700" }}>
              {profile.sourceStatus}
            </Text>
          </View>
        ))}
      </Section>

      <Section title="Legal background">
        <Text selectable style={{ color: colors.ink, fontSize: 13, lineHeight: 18 }}>
          Leadership legal-governance score: {asset.legalBackgroundScore}% ({gradeFromScore(asset.legalBackgroundScore)})
        </Text>
        {asset.legalBackground.map((profile) => (
          <View
            key={`${profile.subject}-${profile.role}`}
            style={{
              borderRadius: 6,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 9,
              gap: 7,
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
              <View style={{ flex: 1, gap: 2 }}>
                <Text selectable style={{ color: colors.ink, fontSize: 13, lineHeight: 16, fontWeight: "800" }}>
                  {profile.subject}
                </Text>
                <Text selectable style={{ color: colors.muted, fontSize: 11, lineHeight: 14, fontWeight: "600" }}>
                  {profile.role} · {profile.jurisdictionCoverage.join(", ")}
                </Text>
              </View>
              <GradePill grade={gradeFromScore(profile.legalScore)} score={profile.legalScore} />
            </View>
            <Text selectable style={{ color: colors.ink, fontSize: 12, lineHeight: 17 }}>
              {profile.rationale}
            </Text>
            <Text selectable style={{ color: colors.muted, fontSize: 11, lineHeight: 14, fontWeight: "700" }}>
              {profile.sourceStatus}
            </Text>
          </View>
        ))}
      </Section>

      <Section title="Rationale">
        {asset.rationale.map((item) => (
          <Text selectable key={item} style={{ color: colors.ink, fontSize: 13, lineHeight: 18 }}>
            • {item}
          </Text>
        ))}
      </Section>

      <Section title="Risk flags">
        {(
          [
            "bds",
            "unSanctions",
            "warCrimesAllegation",
            "leadershipWarCrimesExposure",
            "leadershipAccusedEntityPromotion",
            "companySocialMediaAccusedEntityPromotion",
            "executiveSocialMediaAccusedEntityPromotion",
            "leadershipFinancialCrimeConviction",
            "leadershipSevereCriminalConviction",
            "leadershipSexualExploitationConviction",
            "leadershipPublicHealthConviction",
          ] as RiskFlag[]
        ).map((flag) => {
          const active = asset.flags.includes(flag);
          return (
            <View
              key={flag}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                paddingVertical: 7,
                gap: 12,
              }}
            >
              <Text selectable style={{ color: colors.ink, fontSize: 13, lineHeight: 16, fontWeight: "600" }}>
                {riskLabels[flag]}
              </Text>
              <Text
                selectable
                style={{
                  color: active ? colors.danger : colors.accent,
                  fontSize: 12,
                  lineHeight: 16,
                  fontWeight: "800",
                }}
              >
                {active ? "Flagged" : "Clear"}
              </Text>
            </View>
          );
        })}
      </Section>

      <Section title="Purification note">
        <Text selectable style={{ color: colors.ink, fontSize: 13, lineHeight: 18 }}>
          {asset.purificationNote}
        </Text>
      </Section>

      <Section title="Source status">
        <View style={{ flexDirection: "row", gap: 7, flexWrap: "wrap" }}>
          {asset.sourceStatus.map((source) => (
            <View key={source} style={{ borderRadius: 6, backgroundColor: colors.surfaceMuted, paddingHorizontal: 8, paddingVertical: 6 }}>
              <Text selectable style={{ color: colors.muted, fontSize: 11, lineHeight: 13, fontWeight: "700" }}>
                {source}
              </Text>
            </View>
          ))}
        </View>
      </Section>
    </View>
  );
}

function MetricGrid({ asset }: AssetInspectorProps) {
  const metrics = [
    ["Activity", asset.compliance.businessActivity],
    ["Interest", asset.compliance.interestExposure],
    ["Debt", asset.compliance.debtRatio],
    ["Liquidity", asset.compliance.liquidityPurity],
    ["Governance", asset.compliance.governanceTransparency],
    ["Investors", asset.investorScore],
    ["Leadership", asset.leadershipScore],
    ["Social", asset.socialMediaScore],
    ["Legal", asset.legalBackgroundScore],
  ];

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {metrics.map(([label, value]) => (
        <View
          key={String(label)}
          style={{
            flexGrow: 1,
            minWidth: 94,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: colors.border,
            padding: 9,
            gap: 4,
          }}
        >
          <Text selectable style={{ color: colors.muted, fontSize: 11, lineHeight: 13, fontWeight: "700" }}>
            {label}
          </Text>
          <Text selectable style={{ color: colors.ink, fontSize: 17, lineHeight: 20, fontWeight: "800", fontVariant: ["tabular-nums"] }}>
            {value}%
          </Text>
        </View>
      ))}
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ gap: 8 }}>
      <Text selectable style={{ color: colors.muted, fontSize: 12, lineHeight: 15, fontWeight: "800" }}>
        {title.toUpperCase()}
      </Text>
      <View style={{ gap: 7 }}>{children}</View>
    </View>
  );
}
