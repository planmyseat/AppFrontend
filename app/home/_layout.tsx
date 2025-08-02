import { Tabs } from "expo-router";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: "blue",
      }}
    >
      <Tabs.Screen name="block" />
      <Tabs.Screen name="seatingPlan" />
      <Tabs.Screen name="student" />
    </Tabs>
  );
}
