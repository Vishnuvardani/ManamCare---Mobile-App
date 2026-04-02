import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

export default function AudioScreen() {
  const router = useRouter();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  const audioContent = [
    {
      id: '1',
      title: 'Ocean Waves',
      description: 'Gentle ocean sounds for deep relaxation',
      duration: '10:00',
      category: 'Nature Sounds',
      gradient: ['#6A0DAD', '#9D4EDD']
    },
    {
      id: '2',
      title: 'Forest Rain',
      description: 'Peaceful rain in a forest setting',
      duration: '15:00',
      category: 'Nature Sounds',
      gradient: ['#9D4EDD', '#C77DFF']
    },
    {
      id: '3',
      title: 'Guided Meditation',
      description: 'Expert-led mindfulness session',
      duration: '20:00',
      category: 'Meditation',
      gradient: ['#C77DFF', '#E0AAFF']
    },
    {
      id: '4',
      title: 'White Noise',
      description: 'Consistent sound for focus and sleep',
      duration: '30:00',
      category: 'Sleep Aid',
      gradient: ['#E0AAFF', '#F3E8FF']
    },
    {
      id: '5',
      title: 'Tibetan Bowls',
      description: 'Healing sounds of singing bowls',
      duration: '12:00',
      category: 'Healing',
      gradient: ['#6A0DAD', '#9D4EDD']
    },
    {
      id: '6',
      title: 'Piano Meditation',
      description: 'Soft piano melodies for relaxation',
      duration: '18:00',
      category: 'Music',
      gradient: ['#9D4EDD', '#C77DFF']
    }
  ];

  const togglePlay = (id: string) => {
    if (currentlyPlaying === id) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(id);
    }
  };

  const renderAudioCard = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.audioCard}
      onPress={() => togglePlay(item.id)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={item.gradient}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.playButton}>
              <Ionicons 
                name={currentlyPlaying === item.id ? 'pause' : 'play'} 
                size={24} 
                color="#FFFFFF" 
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
              <Text style={styles.cardCategory}>{item.category}</Text>
            </View>
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>
          </View>
          
          {currentlyPlaying === item.id && (
            <View style={styles.playerControls}>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
              <View style={styles.controlButtons}>
                <TouchableOpacity style={styles.controlButton}>
                  <Ionicons name="play-back" size={20} color="rgba(255,255,255,0.8)" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                  <Ionicons name="pause" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                  <Ionicons name="play-forward" size={20} color="rgba(255,255,255,0.8)" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
      
      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 16 : 60 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#9D4EDD" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Relaxation Audio</Text>
            <Text style={styles.subtitle}>Listen to calming sounds and guided meditation</Text>
          </View>
        </View>

        {/* Featured Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Today</Text>
          <TouchableOpacity style={styles.featuredCard}>
            <LinearGradient
              colors={['#6A0DAD', '#9D4EDD', '#C77DFF']}
              style={styles.featuredGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.featuredContent}>
                <View style={styles.featuredIcon}>
                  <Ionicons name="headset" size={32} color="#FFFFFF" />
                </View>
                <View style={styles.featuredText}>
                  <Text style={styles.featuredTitle}>Daily Mix</Text>
                  <Text style={styles.featuredDescription}>
                    Curated selection of relaxing sounds
                  </Text>
                </View>
                <TouchableOpacity style={styles.featuredPlayButton}>
                  <Ionicons name="play" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Audio Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Audio Content</Text>
          <View style={styles.audioList}>
            {audioContent.map(renderAudioCard)}
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Listening Tips</Text>
          <View style={styles.tipsCard}>
            <View style={styles.tip}>
              <Ionicons name="headset-outline" size={20} color="#9D4EDD" />
              <Text style={styles.tipText}>Use headphones for the best experience</Text>
            </View>
            <View style={styles.tip}>
              <Ionicons name="volume-low-outline" size={20} color="#9D4EDD" />
              <Text style={styles.tipText}>Keep volume at a comfortable level</Text>
            </View>
            <View style={styles.tip}>
              <Ionicons name="bed-outline" size={20} color="#9D4EDD" />
              <Text style={styles.tipText}>Find a quiet, comfortable space</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9D4EDD',
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  featuredCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#6A0DAD',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  featuredGradient: {
    padding: 24,
  },
  featuredContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featuredIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredText: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featuredDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  featuredPlayButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioList: {
    gap: 16,
  },
  audioCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#6A0DAD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  cardGradient: {
    padding: 20,
  },
  cardContent: {
    gap: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  durationBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  playerControls: {
    gap: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipsCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
});