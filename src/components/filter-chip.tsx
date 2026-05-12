import { Pressable, Text } from "react-native";

import { colors } from "@/theme";

type FilterChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export function FilterChip({ label, active, onPress }: FilterChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => ({
        borderRadius: 6,
        borderWidth: 1,
        borderColor: active ? colors.accent : colors.border,
        backgroundColor: active ? "#e3f3ea" : colors.surface,
        opacity: pressed ? 0.72 : 1,
        paddingHorizontal: 11,
        paddingVertical: 8,
      })}
    >
      <Text
        selectable
        style={{
          color: active ? colors.accent : colors.ink,
          fontSize: 13,
          lineHeight: 16,
          fontWeight: active ? "700" : "600",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
