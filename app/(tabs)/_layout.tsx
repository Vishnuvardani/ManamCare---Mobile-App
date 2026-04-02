import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0D0D0D',
          borderTopColor: '#2d0057',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 90 : 75,
          paddingBottom: Platform.OS === 'ios' ? 30 : 15,
          paddingTop: 10,
          paddingHorizontal: 10,
        },
        tabBarActiveTintColor: '#9D4EDD',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: { 
          fontSize: 12, 
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIconStyle: { 
          marginBottom: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={26} 
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          title: 'Book',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "calendar" : "calendar-outline"} 
              size={26} 
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "compass" : "compass-outline"} 
              size={26} 
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Resources',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "library" : "library-outline"} 
              size={26} 
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
