import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

export default function ResourcesTabScreen() {
  const resourceCategories = [
    { id: 1, title: 'Meditation & Mindfulness', icon: 'leaf', color: '#6A0DAD', count: '12 resources' },
    { id: 2, title: 'Breathing Exercises', icon: 'fitness', color: '#9D4EDD', count: '8 exercises' },
    { id: 3, title: 'Sleep & Relaxation', icon: 'moon', color: '#C77DFF', count: '15 guides' },
    { id: 4, title: 'Anxiety Management', icon: 'heart', color: '#6A0DAD', count: '10 techniques' },
    { id: 5, title: 'Depression Support', icon: 'sunny', color: '#9D4EDD', count: '18 articles' },
    { id: 6, title: 'Crisis Resources', icon: 'shield-checkmark', color: '#C77DFF', count: '24/7 support' },
  ];

  const featuredResources = [
    { title: '5-Minute Meditation', type: 'Audio', duration: '5 min' },
    { title: 'Anxiety Relief Guide', type: 'Article', duration: '10 min read' },
    { title: 'Sleep Stories', type: 'Audio', duration: '20 min' },
  ];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
      
      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={[styles.container, { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 16 : 60 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Resources</Text>
        <Text style={styles.subtitle}>Tools and guides for your mental wellness journey</Text>

        {/* Featured Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Today</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
            {featuredResources.map((resource, index) => (
              <TouchableOpacity key={index} style={styles.featuredCard}>
                <LinearGradient
                  colors={['#6A0DAD', '#9D4EDD']}
                  style={styles.featuredGradient}
                >
                  <Text style={styles.featuredTitle}>{resource.title}</Text>
                  <Text style={styles.featuredType}>{resource.type}</Text>
                  <Text style={styles.featuredDuration}>{resource.duration}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>
          <View style={styles.categoriesGrid}>
            {resourceCategories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <View style={styles.categoryContent}>
                  <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                    <Ionicons name={category.icon as any} size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryCount}>{category.count}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Access */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickAccessGrid}>
            <TouchableOpacity style={styles.quickAccessCard}>
              <LinearGradient colors={['#1A1A1A', '#2A2A2A']} style={styles.quickAccessGradient}>
                <Ionicons name="play-circle" size={32} color="#9D4EDD" />
                <Text style={styles.quickAccessText}>Start Meditation</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAccessCard}>
              <LinearGradient colors={['#1A1A1A', '#2A2A2A']} style={styles.quickAccessGradient}>
                <Ionicons name="book" size={32} color="#9D4EDD" />
                <Text style={styles.quickAccessText}>Daily Journal</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D0D0D' },
  scroll: { flex: 1 },
  container: { paddingHorizontal: 24, paddingBottom: 100 },
  title: { fontSize: 28, fontWeight: '700', color: '#FFFFFF', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#9D4EDD', marginBottom: 32 },
  
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 16 },
  
  // Featured Section
  featuredScroll: { marginHorizontal: -24 },
  featuredCard: { width: 200, marginLeft: 24, borderRadius: 20, overflow: 'hidden' },
  featuredGradient: { padding: 20, height: 120, justifyContent: 'space-between' },
  featuredTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  featuredType: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  featuredDuration: { fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: '600' },
  
  // Categories Section
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  categoryCard: {
    width: '48%', backgroundColor: '#1A1A1A', borderRadius: 20, padding: 20,
    borderWidth: 1, borderColor: '#2A2A2A',
  },
  categoryContent: { alignItems: 'center' },
  categoryIcon: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  categoryTitle: { fontSize: 14, fontWeight: '600', color: '#FFFFFF', textAlign: 'center', marginBottom: 4 },
  categoryCount: { fontSize: 12, color: '#9D4EDD', textAlign: 'center' },
  
  // Quick Access
  quickAccessGrid: { flexDirection: 'row', gap: 12 },
  quickAccessCard: { flex: 1, borderRadius: 20, overflow: 'hidden' },
  quickAccessGradient: { padding: 24, alignItems: 'center', gap: 12 },
  quickAccessText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF', textAlign: 'center' },
});