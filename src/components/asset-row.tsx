import { Pressable, Text, View } from "react-native";

import { GradePill } from "@/components/grade-pill";
import { colors } from "@/theme";
import { ScoredAsset } from "@/types";

type AssetRowProps = {
  asset: ScoredAsset;
  selected: boolean;
  onPress: () => void;
  compact: boolean;
};

const formatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

export function AssetRow({ asset, selected, onPress, compact }: AssetRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: selected ? "#edf7f1" : colors.surface,
        borderColor: selected ? "#9bd0b3" : colors.border,
        borderWidth: 1,
        borderRadius: 8,
        opacity: pressed ? 0.72 : 1,
        padding: 12,
        gap: 10,
      })}
    >
      <View style={{ flexDirection: compact ? "column" : "row", gap: 12, alignItems: compact ? "stretch" : "center" }}>
        <View style={{ flex: 1.4, minWidth: 140, gap: 3 }}>
          <Text selectable style={{ color: colors.ink, fontSize: 15, lineHeight: 18, fontWeight: "800" }}>
            {asset.symbol}
          </Text>
          <Text selectable numberOfLines={1} style={{ color: colors.muted, fontSize: 12, lineHeight: 15, fontWeight: "600" }}>
            {asset.name}
          </Text>
        </View>
        <View style={{ flex: 1.1, minWidth: 116, gap: 3 }}>
          <Text selectable style={{ color: colors.ink, fontSize: 13, lineHeight: 16, fontWeight: "700" }}>
            {asset.venue}
          </Text>
          <Text selectable style={{ color: colors.muted, fontSize: 12, lineHeight: 15 }}>
            {asset.region} · {asset.type}
          </Text>
        </View>
        <View style={{ flex: 1, minWidth: 112, gap: 3 }}>
          <Text
            selectable
            style={{
              color: colors.ink,
              fontSize: 14,
              lineHeight: 17,
              fontWeight: "800",
              fontVariant: ["tabular-nums"],
            }}
          >
            {formatter.format(asset.price)} {asset.currency}
          </Text>
          <Text
            selectable
            style={{
              color: asset.change24h >= 0 ? colors.accent : colors.danger,
              fontSize: 12,
              lineHeight: 15,
              fontWeight: "700",
              fontVariant: ["tabular-nums"],
            }}
          >
            {asset.change24h >= 0 ? "+" : ""}
            {asset.change24h.toFixed(2)}%
          </Text>
        </View>
        <View style={{ minWidth: 96 }}>
          <GradePill grade={asset.grade} score={asset.score} />
        </View>
      </View>
      <Text selectable numberOfLines={2} style={{ color: colors.muted, fontSize: 12, lineHeight: 16 }}>
        {asset.forcedGradeReason ?? asset.rationale[0]}
      </Text>
    </Pressable>
  );
}
