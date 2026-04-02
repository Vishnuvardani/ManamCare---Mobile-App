import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Animated, FlatList, Platform, RefreshControl,
  StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { getResources } from '@/services/api';

interface Resource {
  _id: string;
  title: string;
  type: 'audio' | 'breathing' | 'video' | 'sleep';
  description: string;
  contentUrl?: string;
  duration?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  icon: string;
  gradient: string[];
}

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

export default function ResourcesScreen() {
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState('');

  const categories = ['All', 'Audio', 'Breathing', 'Video', 'Sleep'];

  const fetchResources = async () => {
    try {
      setError('');
      const data = await getResources();
      setResources(data);
      setFilteredResources(data);
    } catch (err: any) {
      console.error('Failed to fetch resources:', err);
      setError('Failed to load resources. Please try again.');
      // Set fallback data
      const fallbackData = getFallbackResources();
      setResources(fallbackData);
      setFilteredResources(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const getFallbackResources = (): Resource[] => [
    {
      _id: '1',
      title: 'Relaxation Audio',
      type: 'audio',
      description: 'Listen to calming sounds and guided meditation',
      category: 'Audio',
      icon: 'headset-outline',
      gradient: ['#6A0DAD', '#9D4EDD'],
      duration: '5-30 min',
      difficulty: 'Beginner'
    },
    {
      _id: '2',
      title: 'Breathing Exercises',
      type: 'breathing',
      description: 'Follow breathing techniques to reduce stress',
      category: 'Breathing',
      icon: 'leaf-outline',
      gradient: ['#9D4EDD', '#C77DFF'],
      duration: '3-10 min',
      difficulty: 'Beginner'
    },
    {
      _id: '3',
      title: 'Stress Management Videos',
      type: 'video',
      description: 'Watch expert videos to manage anxiety',
      category: 'Video',
      icon: 'play-circle-outline',
      gradient: ['#C77DFF', '#E0AAFF'],
      duration: '10-45 min',
      difficulty: 'Intermediate'
    },
    {
      _id: '4',
      title: 'Sleep Support',
      type: 'sleep',
      description: 'Improve sleep quality with guided content',
      category: 'Sleep',
      icon: 'moon-outline',
      gradient: ['#E0AAFF', '#F3E8FF'],
      duration: '15-60 min',
      difficulty: 'Beginner'
    }
  ];

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [searchQuery, selectedCategory, resources]);

  const filterResources = () => {
    let filtered = resources;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(resource => 
        resource.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredResources(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchResources();
    setRefreshing(false);
  };

  const navigateToResource = (resource: Resource) => {
    switch (resource.type) {
      case 'audio':
        router.push('/audio' as any);
        break;
      case 'breathing':
        router.push('/breathing' as any);
        break;
      case 'video':
        router.push('/video' as any);
        break;
      case 'sleep':
        router.push('/sleep' as any);
        break;
      default:
        console.log('Unknown resource type:', resource.type);
    }
  };

  const renderCategoryTab = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryTab,
        selectedCategory === category && styles.categoryTabActive
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[
        styles.categoryTabText,
        selectedCategory === category && styles.categoryTabTextActive
      ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderResourceCard = ({ item }: { item: Resource }) => (
    <AnimatedCard
      style={styles.resourceCard}
      onPress={() => navigateToResource(item)}
    >
      <LinearGradient
        colors={item.gradient}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIcon}>
              <Ionicons name={item.icon as any} size={32} color="#FFFFFF" />
            </View>
            <View style={styles.cardBadge}>
              <Text style={styles.badgeText}>{item.difficulty}</Text>
            </View>
          </View>
          
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          
          <View style={styles.cardFooter}>
            <View style={styles.durationContainer}>
              <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.8)" />
          </View>
        </View>
      </LinearGradient>
    </AnimatedCard>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="library-outline" size={64} color="#666" />
      <Text style={styles.emptyTitle}>No Resources Found</Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery ? 'Try adjusting your search terms' : 'Resources will appear here'}
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={fetchResources}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorState}>
      <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
      <Text style={styles.errorTitle}>Something went wrong</Text>
      <Text style={styles.errorSubtitle}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={fetchResources}>
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
        <ActivityIndicator size="large" color="#9D4EDD" />
        <Text style={styles.loadingText}>Loading resources...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
      
      {/* Header */}
      <View style={[
        styles.header,
        { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 16 : 60 }
      ]}>
        <Text style={styles.title}>Resources</Text>
        <Text style={styles.subtitle}>Relax, learn, and improve your mental well-being</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search resources..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={({ item }) => renderCategoryTab(item)}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      {/* Resources List */}
      <FlatList
        data={filteredResources}
        renderItem={renderResourceCard}
        keyExtractor={(item) => item._id}
        contentContainerStyle={[
          styles.resourcesList,
          { paddingBottom: Platform.OS === 'ios' ? 130 : 110 }
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9D4EDD']}
            tintColor="#9D4EDD"
          />
        }
        ListEmptyComponent={error ? renderError : renderEmptyState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#9D4EDD',
    fontSize: 16,
    marginTop: 16,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9D4EDD',
    lineHeight: 22,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryList: {
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333',
  },
  categoryTabActive: {
    backgroundColor: '#6A0DAD',
    borderColor: '#9D4EDD',
  },
  categoryTabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
  },
  resourcesList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  resourceCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#6A0DAD',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    marginBottom: 16,
  },
  cardGradient: {
    padding: 24,
  },
  cardContent: {
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  durationText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  errorState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EF4444',
    marginTop: 16,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#6A0DAD',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});