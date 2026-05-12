import { useMemo, useState } from "react";
import { ScrollView, Text, TextInput, useWindowDimensions, View } from "react-native";

import { AssetInspector } from "@/components/asset-inspector";
import { AssetRow } from "@/components/asset-row";
import { FilterChip } from "@/components/filter-chip";
import { scoreAsset } from "@/compliance";
import { assets } from "@/data/assets";
import { colors, typeScale } from "@/theme";
import { HalalGrade, Region, RiskFlag } from "@/types";

const regions: Array<Region | "All"> = ["All", "US", "London", "Paris", "Tokyo", "Milan", "Frankfurt", "Crypto"];
const grades: Array<HalalGrade | "All"> = ["All", "A", "B", "C", "D", "E"];
const risks: Array<{ label: string; value: RiskFlag }> = [
  { label: "BDS", value: "bds" },
  { label: "UN sanctions", value: "unSanctions" },
  { label: "War crimes", value: "warCrimesAllegation" },
  { label: "Leadership", value: "leadershipWarCrimesExposure" },
  { label: "Promoters", value: "leadershipAccusedEntityPromotion" },
  { label: "Company posts", value: "companySocialMediaAccusedEntityPromotion" },
  { label: "Executive posts", value: "executiveSocialMediaAccusedEntityPromotion" },
  { label: "Financial crime", value: "leadershipFinancialCrimeConviction" },
  { label: "Severe legal", value: "leadershipSevereCriminalConviction" },
  { label: "Exploitation", value: "leadershipSexualExploitationConviction" },
  { label: "Public health", value: "leadershipPublicHealthConviction" },
];

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "All">("All");
  const [grade, setGrade] = useState<HalalGrade | "All">("All");
  const [riskOnly, setRiskOnly] = useState<RiskFlag | "All">("All");
  const [selectedId, setSelectedId] = useState("btc");
  const { width } = useWindowDimensions();
  const compact = width < 840;

  const scoredAssets = useMemo(() => assets.map(scoreAsset).sort((a, b) => b.score - a.score), []);

  const filteredAssets = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return scoredAssets.filter((asset) => {
      const matchesQuery =
        normalized.length === 0 ||
        asset.symbol.toLowerCase().includes(normalized) ||
        asset.name.toLowerCase().includes(normalized) ||
        asset.venue.toLowerCase().includes(normalized);
      const matchesRegion = region === "All" || asset.region === region;
      const matchesGrade = grade === "All" || asset.grade === grade;
      const matchesRisk = riskOnly === "All" || asset.flags.includes(riskOnly);
      return matchesQuery && matchesRegion && matchesGrade && matchesRisk;
    });
  }, [grade, query, region, riskOnly, scoredAssets]);

  const selectedAsset = filteredAssets.find((asset) => asset.id === selectedId) ?? filteredAssets[0] ?? scoredAssets[0];

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: colors.background }}>
      <View style={{ padding: compact ? 14 : 24, gap: 18, width: "100%", maxWidth: 1400, alignSelf: "center" }}>
        <Header />

        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border,
            padding: compact ? 12 : 16,
            gap: 14,
          }}
        >
          <TextInput
            accessibilityLabel="Search assets"
            placeholder="Search BTC, Apple, Toyota, venue, or region"
            value={query}
            onChangeText={setQuery}
            style={{
              minHeight: 45,
              borderRadius: 7,
              borderWidth: 1,
              borderColor: colors.border,
              paddingHorizontal: 13,
              color: colors.ink,
              backgroundColor: "#fbfcfb",
              fontSize: 15,
              fontWeight: "600",
            }}
            placeholderTextColor="#8b9791"
          />
          <FilterRow label="Markets">
            {regions.map((item) => (
              <FilterChip key={item} label={item} active={region === item} onPress={() => setRegion(item)} />
            ))}
          </FilterRow>
        </View>

        <View style={{ flexDirection: compact ? "column" : "row", alignItems: "flex-start", gap: 16 }}>
          <View
            style={{
              width: compact ? "100%" : 230,
              backgroundColor: colors.surface,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 14,
              gap: 16,
            }}
          >
            <FilterRow label="Halal grade">
              {grades.map((item) => (
                <FilterChip key={item} label={item} active={grade === item} onPress={() => setGrade(item)} />
              ))}
            </FilterRow>
            <FilterRow label="Risk flags">
              <FilterChip label="All" active={riskOnly === "All"} onPress={() => setRiskOnly("All")} />
              {risks.map((risk) => (
                <FilterChip key={risk.value} label={risk.label} active={riskOnly === risk.value} onPress={() => setRiskOnly(risk.value)} />
              ))}
            </FilterRow>
            <View style={{ gap: 7 }}>
              <Text selectable style={{ color: colors.muted, fontSize: 12, lineHeight: 16, fontWeight: "800" }}>
                SCORING POLICY
              </Text>
              <Text selectable style={{ color: colors.ink, fontSize: 13, lineHeight: 18 }}>
                A is 75% or higher. B is 60-74%. C is 45-59%. D is 25-44%. E is below 25%, or forced by active BDS, UN sanctions, war-crimes, leadership, legal, or social-media ethics flags.
              </Text>
            </View>
          </View>

          <View style={{ flex: 1, width: compact ? "100%" : undefined, gap: 10 }}>
            <TableHeader count={filteredAssets.length} />
            {filteredAssets.map((asset) => (
              <AssetRow
                key={asset.id}
                asset={asset}
                compact={compact}
                selected={selectedAsset.id === asset.id}
                onPress={() => setSelectedId(asset.id)}
              />
            ))}
            {filteredAssets.length === 0 ? (
              <View
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: colors.border,
                  padding: 18,
                }}
              >
                <Text selectable style={{ color: colors.muted, fontSize: 14, lineHeight: 18, fontWeight: "600" }}>
                  No assets match the current filters.
                </Text>
              </View>
            ) : null}
          </View>

          <View style={{ width: compact ? "100%" : 360 }}>
            <AssetInspector asset={selectedAsset} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function Header() {
  return (
    <View style={{ gap: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <View style={{ gap: 4 }}>
          <Text selectable style={{ color: colors.ink, fontSize: typeScale.h1, lineHeight: 34, fontWeight: "900" }}>
            Cryptodeen
          </Text>
          <Text selectable style={{ color: colors.muted, fontSize: 15, lineHeight: 20, maxWidth: 760 }}>
            Real-time market portal for halal-aware crypto and equity screening, built for transparent Islamic finance review.
          </Text>
        </View>
        <View
          style={{
            borderRadius: 7,
            borderWidth: 1,
            borderColor: "#9dd4b7",
            backgroundColor: "#e5f5ec",
            paddingHorizontal: 12,
            paddingVertical: 9,
          }}
        >
          <Text selectable style={{ color: colors.accent, fontSize: 13, lineHeight: 16, fontWeight: "800" }}>
            Scholar review workflow required
          </Text>
        </View>
      </View>
    </View>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ gap: 8 }}>
      <Text selectable style={{ color: colors.muted, fontSize: 12, lineHeight: 15, fontWeight: "800" }}>
        {label.toUpperCase()}
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>{children}</View>
    </View>
  );
}

function TableHeader({ count }: { count: number }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12, alignItems: "flex-end" }}>
      <View style={{ gap: 2 }}>
        <Text selectable style={{ color: colors.ink, fontSize: typeScale.h2, lineHeight: 25, fontWeight: "800" }}>
          Ranked assets
        </Text>
        <Text selectable style={{ color: colors.muted, fontSize: 13, lineHeight: 17, fontWeight: "600" }}>
          {count} visible · quotes shown as seeded market snapshots
        </Text>
      </View>
      <Text selectable style={{ color: colors.muted, fontSize: 12, lineHeight: 15, fontWeight: "800" }}>
        QUOTE · 24H · HALAL INDEX
      </Text>
    </View>
  );
}
