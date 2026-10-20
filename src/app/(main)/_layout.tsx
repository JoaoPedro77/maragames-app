import { TopTabs } from 'expo-router/js-top-tabs';

export default function MainLayout() {
  return (
    <TopTabs
      backBehavior="none"
      tabBar={() => null}
      screenOptions={{
        swipeEnabled: true,
        animationEnabled: true,
      }}
    >
      <TopTabs.Screen name="register" />
      <TopTabs.Screen name="institutions" />
      <TopTabs.Screen name="rank" />
    </TopTabs>
  );
}
