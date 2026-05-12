import { Text, View } from "react-native";

import { explainGrade } from "@/compliance";
import { gradeColors } from "@/theme";
import { HalalGrade } from "@/types";

type GradePillProps = {
  grade: HalalGrade;
  score: number;
};

export function GradePill({ grade, score }: GradePillProps) {
  const palette = gradeColors[grade];

  return (
    <View
      style={{
        alignSelf: "flex-start",
        minWidth: 86,
        borderWidth: 1,
        borderColor: palette.border,
        borderRadius: 6,
        backgroundColor: palette.bg,
        paddingHorizontal: 9,
        paddingVertical: 5,
        gap: 1,
      }}
    >
      <Text
        selectable
        style={{
          color: palette.fg,
          fontSize: 15,
          lineHeight: 17,
          fontWeight: "800",
          fontVariant: ["tabular-nums"],
        }}
      >
        {grade} {score}%
      </Text>
      <Text selectable style={{ color: palette.fg, fontSize: 10, lineHeight: 12, fontWeight: "600" }}>
        {explainGrade(grade)}
      </Text>
    </View>
  );
}
