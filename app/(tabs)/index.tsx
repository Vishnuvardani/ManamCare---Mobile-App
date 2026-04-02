import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Animated, Platform, ScrollView, StatusBar,
  StyleSheet, Text, TouchableOpacity, View, useWindowDimensions,
} from 'react-native';
import { getProfile } from '@/services/api';

// Simple circular progress component without SVG dependency
const SimpleCircularProgress = ({ percentage, size, color, label }: any) => {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#2A2A2A',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        {/* Background circle */}
        <View style={{
          position: 'absolute',
          width: size - 8,
          height: size - 8,
          borderRadius: (size - 8) / 2,
          borderWidth: 6,
          borderColor: '#1A1A1A',
        }} />
        
        {/* Progress circle */}
        <View style={{
          position: 'absolute',
          width: size - 8,
          height: size - 8,
          borderRadius: (size - 8) / 2,
          borderWidth: 6,
          borderColor: 'transparent',
          borderTopColor: color,
          transform: [
            { rotate: `${(percentage / 100) * 360 - 90}deg` }
          ],
        }} />
        
        {/* Percentage text */}
        <Text style={{ 
          fontSize: 18, 
          fontWeight: '800', 
          color: color,
          textAlign: 'center'
        }}>
          {percentage}%
        </Text>
      </View>
      
      <Text style={{ 
        fontSize: 13, 
        color: '#FFFFFF', 
        marginTop: 12, 
        textAlign: 'center',
        fontWeight: '600'
      }}>
        {label}
      </Text>
    </View>
  );
};

const AnimatedCard = ({ children, onPress, style }: any) => {
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={1}
    >
      <Animated.View style={[style, { transform: [{ scale: scaleAnim }] }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Fetching user profile...');
        const data = await getProfile();
        console.log('Profile data received:', data);
        setUserData(data);
      } catch (error) {
        console.error('Profile fetch error:', error);
        // Set fallback user data
        setUserData({
          name: 'User',
          email: 'user@manamcare.com',
          source: 'fallback'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  const greeting = () => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 5 && hour < 12) {
      return 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
      return 'Good Afternoon';
    } else if (hour >= 17 && hour < 21) {
      return 'Good Evening';
    } else {
      return 'Good Night';
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  };

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
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.greetingContainer}>
              {loading ? (
                <ActivityIndicator color="#9D4EDD" size="small" />
              ) : (
                <>
                  <Text style={styles.greeting}>
                    {greeting()}, {userData?.name || 'User'}
                  </Text>
                  {userData?.source === 'database-authenticated' && (
                    <Text style={styles.userInfo}>
                      📱 {userData?.phone} • 🎂 {userData?.age} years
                    </Text>
                  )}
                </>
              )}
              <Text style={styles.quote}>
                Take care of your mind, it's the only place you have to live.
              </Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => router.push('/settings' as any)}
              >
                <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Main Cards */}
        <View style={styles.cardsSection}>
          {/* AI Chat Card */}
          <AnimatedCard
            style={styles.mainCard}
            onPress={() => router.push('/(tabs)/chat' as any)}
          >
            <LinearGradient
              colors={['#6A0DAD', '#9D4EDD']}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardIcon}>
                  <Ionicons name="chatbubble-ellipses" size={28} color="#FFFFFF" />
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>Start AI Chat</Text>
                  <Text style={styles.cardSubtitle}>
                    Talk to our empathetic AI companion anytime
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </AnimatedCard>

          {/* Daily Progress Card */}
          <AnimatedCard
            style={styles.mainCard}
            onPress={() => router.push('/screening' as any)}
          >
            <LinearGradient
              colors={['#9D4EDD', '#C77DFF']}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardIcon}>
                  <Ionicons name="trending-up" size={28} color="#FFFFFF" />
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>Daily Progress</Text>
                  <Text style={styles.cardSubtitle}>
                    Track your mental wellness journey
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </AnimatedCard>
        </View>

        {/* Today's Overview Section */}
        <View style={styles.overviewSection}>
          <Text style={styles.sectionTitle}>Today's Overview</Text>
          <Text style={styles.dateText}>{getCurrentDate()}</Text>
          
          {userData?.source === 'database-authenticated' ? (
            <View style={styles.userStatsCard}>
              <Text style={styles.userStatsTitle}>Your Profile</Text>
              <View style={styles.userStatsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Email</Text>
                  <Text style={styles.statValue}>{userData.email}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Gender</Text>
                  <Text style={styles.statValue}>{userData.gender}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Date of Birth</Text>
                  <Text style={styles.statValue}>{userData.dob}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Member Since</Text>
                  <Text style={styles.statValue}>Today</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.progressContainer}>
              <View style={styles.progressItem}>
                <SimpleCircularProgress
                  percentage={75}
                  size={100}
                  color="#6A0DAD"
                  label="Mental Wellness"
                />
              </View>
              
              <View style={styles.progressItem}>
                <SimpleCircularProgress
                  percentage={60}
                  size={100}
                  color="#9D4EDD"
                  label="Activity Score"
                />
              </View>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/resources' as any)}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="library-outline" size={24} color="#9D4EDD" />
              </View>
              <Text style={styles.actionText}>Resources</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/counselling' as any)}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="calendar-outline" size={24} color="#9D4EDD" />
              </View>
              <Text style={styles.actionText}>Book Session</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/profile' as any)}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="person-outline" size={24} color="#9D4EDD" />
              </View>
              <Text style={styles.actionText}>Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Ionicons name="help-circle-outline" size={24} color="#9D4EDD" />
              </View>
              <Text style={styles.actionText}>Help</Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: Platform.OS === 'ios' ? 130 : 110 
  },
  
  // Header Styles
  header: { 
    marginBottom: 32 
  },
  headerTop: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start' 
  },
  greetingContainer: { 
    flex: 1, 
    marginRight: 16 
  },
  greeting: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: '#FFFFFF', 
    marginBottom: 4 
  },
  userInfo: {
    fontSize: 13,
    color: '#C77DFF',
    marginBottom: 4,
  },
  quote: { 
    fontSize: 14, 
    color: '#9D4EDD', 
    lineHeight: 20, 
    fontStyle: 'italic' 
  },
  headerIcons: { 
    flexDirection: 'row', 
    gap: 12 
  },
  iconButton: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: '#1A1A1A', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  
  // Cards Section
  cardsSection: { 
    gap: 16, 
    marginBottom: 32 
  },
  mainCard: { 
    borderRadius: 24, 
    overflow: 'hidden',
    shadowColor: '#6A0DAD',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  cardGradient: { 
    padding: 24 
  },
  cardContent: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  cardIcon: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: 'rgba(255,255,255,0.15)', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 16 
  },
  cardText: { 
    flex: 1 
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#FFFFFF', 
    marginBottom: 4 
  },
  cardSubtitle: { 
    fontSize: 14, 
    color: 'rgba(255,255,255,0.8)', 
    lineHeight: 18 
  },
  
  // Overview Section
  overviewSection: { 
    marginBottom: 32 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#FFFFFF', 
    marginBottom: 8 
  },
  dateText: { 
    fontSize: 14, 
    color: '#9D4EDD', 
    marginBottom: 24 
  },
  progressContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    backgroundColor: '#1A1A1A', 
    borderRadius: 20, 
    padding: 24 
  },
  progressItem: { 
    alignItems: 'center' 
  },
  
  // User Stats
  userStatsCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 24,
  },
  userStatsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  userStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    width: '48%',
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#9D4EDD',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  
  // Quick Actions
  quickActions: { 
    marginBottom: 32 
  },
  actionGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 12 
  },
  actionCard: { 
    width: '48%', 
    backgroundColor: '#1A1A1A', 
    borderRadius: 16, 
    padding: 20, 
    alignItems: 'center' 
  },
  actionIcon: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    backgroundColor: '#2A2A2A', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 12 
  },
  actionText: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#FFFFFF', 
    textAlign: 'center' 
  },
});