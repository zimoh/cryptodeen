import { Stack } from "expo-router/stack";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "left",
        headerShadowVisible: false,
        contentStyle: { backgroundColor: "#f7f8f6" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Cryptodeen" }} />
    </Stack>
  );
}
