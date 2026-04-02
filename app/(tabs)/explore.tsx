import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

export default function ExploreScreen() {
  const router = useRouter();

  const exploreItems = [
    {
      title: 'Mental Health Articles',
      subtitle: 'Expert insights and tips',
      icon: 'document-text-outline',
      color: ['#6A0DAD', '#9D4EDD'],
      onPress: () => router.push('/resources' as any),
    },
    {
      title: 'Meditation & Mindfulness',
      subtitle: 'Guided sessions for peace',
      icon: 'leaf-outline',
      color: ['#9D4EDD', '#C77DFF'],
      onPress: () => {},
    },
    {
      title: 'Community Support',
      subtitle: 'Connect with others',
      icon: 'people-outline',
      color: ['#C77DFF', '#E0AAFF'],
      onPress: () => {},
    },
    {
      title: 'Crisis Resources',
      subtitle: 'Immediate help available',
      icon: 'medical-outline',
      color: ['#E0AAFF', '#F3E8FF'],
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
      
      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={[
          styles.container,
          { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 16 : 60 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>Discover resources for your mental wellness journey</Text>
        </View>

        <View style={styles.itemsContainer}>
          {exploreItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemCard}
              onPress={item.onPress}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={item.color}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardContent}>
                  <View style={styles.cardIcon}>
                    <Ionicons name={item.icon as any} size={28} color="#FFFFFF" />
                  </View>
                  <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonTitle}>More Features Coming Soon</Text>
          <Text style={styles.comingSoonText}>
            We're working on bringing you more tools and resources for your mental wellness journey.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    backgroundColor: '#0D0D0D' 
  },
  scroll: { 
    flex: 1 
  },
  container: { 
    paddingHorizontal: 24, 
    paddingBottom: Platform.OS === 'ios' ? 120 : 100 
  },
  
  header: { 
    marginBottom: 32 
  },
  title: { 
    fontSize: 32, 
    fontWeight: '800', 
    color: '#FFFFFF', 
    marginBottom: 8 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#9D4EDD', 
    lineHeight: 22 
  },
  
  itemsContainer: { 
    gap: 16, 
    marginBottom: 32 
  },
  itemCard: { 
    borderRadius: 20, 
    overflow: 'hidden',
    shadowColor: '#6A0DAD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  cardGradient: { 
    padding: 20 
  },
  cardContent: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  cardIcon: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: 'rgba(255,255,255,0.15)', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 16 
  },
  cardText: { 
    flex: 1 
  },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#FFFFFF', 
    marginBottom: 4 
  },
  cardSubtitle: { 
    fontSize: 13, 
    color: 'rgba(255,255,255,0.8)' 
  },
  
  comingSoon: { 
    backgroundColor: '#1A1A1A', 
    borderRadius: 16, 
    padding: 24, 
    alignItems: 'center' 
  },
  comingSoonTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#FFFFFF', 
    marginBottom: 8 
  },
  comingSoonText: { 
    fontSize: 14, 
    color: '#9D4EDD', 
    textAlign: 'center', 
    lineHeight: 20 
  },
});