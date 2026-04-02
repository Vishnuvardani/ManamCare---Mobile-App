import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

export default function BreathingScreen() {
  const router = useRouter();
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale, pause
  const [countdown, setCountdown] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  const breathingExercises = [
    {
      id: '1',
      name: '4-7-8 Breathing',
      description: 'Inhale for 4, hold for 7, exhale for 8 seconds',
      difficulty: 'Beginner',
      duration: '5 min',
      pattern: { inhale: 4, hold: 7, exhale: 8, pause: 2 },
      gradient: ['#6A0DAD', '#9D4EDD'],
      benefits: ['Reduces anxiety', 'Improves sleep', 'Calms nervous system']
    },
    {
      id: '2',
      name: 'Box Breathing',
      description: 'Equal counts for inhale, hold, exhale, hold',
      difficulty: 'Intermediate',
      duration: '8 min',
      pattern: { inhale: 4, hold: 4, exhale: 4, pause: 4 },
      gradient: ['#9D4EDD', '#C77DFF'],
      benefits: ['Improves focus', 'Reduces stress', 'Enhances performance']
    },
    {
      id: '3',
      name: 'Belly Breathing',
      description: 'Deep diaphragmatic breathing technique',
      difficulty: 'Beginner',
      duration: '6 min',
      pattern: { inhale: 6, hold: 2, exhale: 8, pause: 2 },
      gradient: ['#C77DFF', '#E0AAFF'],
      benefits: ['Lowers blood pressure', 'Reduces tension', 'Improves oxygen flow']
    },
    {
      id: '4',
      name: 'Coherent Breathing',
      description: 'Balanced 5-second inhale and exhale',
      difficulty: 'Beginner',
      duration: '10 min',
      pattern: { inhale: 5, hold: 0, exhale: 5, pause: 0 },
      gradient: ['#E0AAFF', '#F3E8FF'],
      benefits: ['Balances nervous system', 'Improves heart rate variability', 'Enhances calm']
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && selectedExercise) {
      const pattern = selectedExercise.pattern;
      let currentPhase = phase;
      let currentCount = countdown;
      
      interval = setInterval(() => {
        if (currentCount > 0) {
          currentCount--;
          setCountdown(currentCount);
        } else {
          // Move to next phase
          switch (currentPhase) {
            case 'inhale':
              currentPhase = pattern.hold > 0 ? 'hold' : 'exhale';
              currentCount = pattern.hold > 0 ? pattern.hold : pattern.exhale;
              break;
            case 'hold':
              currentPhase = 'exhale';
              currentCount = pattern.exhale;
              break;
            case 'exhale':
              currentPhase = pattern.pause > 0 ? 'pause' : 'inhale';
              currentCount = pattern.pause > 0 ? pattern.pause : pattern.inhale;
              break;
            case 'pause':
              currentPhase = 'inhale';
              currentCount = pattern.inhale;
              break;
          }
          setPhase(currentPhase);
          setCountdown(currentCount);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, selectedExercise, phase, countdown]);

  useEffect(() => {
    if (isActive) {
      // Animate breathing circle
      const duration = selectedExercise?.pattern[phase as keyof typeof selectedExercise.pattern] * 1000 || 4000;
      
      if (phase === 'inhale') {
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.8,
            duration,
            useNativeDriver: true,
          }),
        ]).start();
      } else if (phase === 'exhale') {
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.3,
            duration,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  }, [phase, isActive, selectedExercise]);

  const startExercise = (exercise: any) => {
    setSelectedExercise(exercise);
    setPhase('inhale');
    setCountdown(exercise.pattern.inhale);
    setIsActive(true);
  };

  const stopExercise = () => {
    setIsActive(false);
    setSelectedExercise(null);
    setPhase('inhale');
    setCountdown(0);
    scaleAnim.setValue(1);
    opacityAnim.setValue(0.3);
  };

  const toggleExercise = () => {
    setIsActive(!isActive);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'pause': return 'Pause';
      default: return 'Breathe';
    }
  };

  const renderExerciseCard = (exercise: any) => (
    <TouchableOpacity
      key={exercise.id}
      style={styles.exerciseCard}
      onPress={() => startExercise(exercise)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={exercise.gradient}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIcon}>
              <Ionicons name="leaf" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.difficultyBadge}>
              <Text style={styles.badgeText}>{exercise.difficulty}</Text>
            </View>
          </View>
          
          <Text style={styles.cardTitle}>{exercise.name}</Text>
          <Text style={styles.cardDescription}>{exercise.description}</Text>
          
          <View style={styles.cardFooter}>
            <View style={styles.durationContainer}>
              <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
              <Text style={styles.durationText}>{exercise.duration}</Text>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.benefitsList}>
            {exercise.benefits.slice(0, 2).map((benefit: string, index: number) => (
              <Text key={index} style={styles.benefitText}>• {benefit}</Text>
            ))}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (selectedExercise) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
        
        <LinearGradient
          colors={selectedExercise.gradient}
          style={styles.exerciseContainer}
        >
          <View style={[
            styles.exerciseContent,
            { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 16 : 60 }
          ]}>
            {/* Header */}
            <View style={styles.exerciseHeader}>
              <TouchableOpacity style={styles.backButton} onPress={stopExercise}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.exerciseTitle}>{selectedExercise.name}</Text>
              <View style={styles.placeholder} />
            </View>

            {/* Breathing Circle */}
            <View style={styles.breathingContainer}>
              <Animated.View
                style={[
                  styles.breathingCircle,
                  {
                    transform: [{ scale: scaleAnim }],
                    opacity: opacityAnim,
                  },
                ]}
              >
                <View style={styles.innerCircle}>
                  <Text style={styles.phaseText}>{getPhaseText()}</Text>
                  <Text style={styles.countdownText}>{countdown}</Text>
                </View>
              </Animated.View>
            </View>

            {/* Controls */}
            <View style={styles.controls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={toggleExercise}
              >
                <Ionicons 
                  name={isActive ? 'pause' : 'play'} 
                  size={32} 
                  color="#FFFFFF" 
                />
              </TouchableOpacity>
            </View>

            {/* Instructions */}
            <View style={styles.instructions}>
              <Text style={styles.instructionText}>
                Follow the circle's movement with your breathing
              </Text>
              <Text style={styles.patternText}>
                Inhale {selectedExercise.pattern.inhale}s • 
                {selectedExercise.pattern.hold > 0 && ` Hold ${selectedExercise.pattern.hold}s • `}
                Exhale {selectedExercise.pattern.exhale}s
                {selectedExercise.pattern.pause > 0 && ` • Pause ${selectedExercise.pattern.pause}s`}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

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
            <Text style={styles.title}>Breathing Exercises</Text>
            <Text style={styles.subtitle}>Follow breathing techniques to reduce stress</Text>
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits of Breathing Exercises</Text>
          <View style={styles.benefitsGrid}>
            <View style={styles.benefitCard}>
              <Ionicons name="heart" size={24} color="#9D4EDD" />
              <Text style={styles.benefitTitle}>Reduces Stress</Text>
            </View>
            <View style={styles.benefitCard}>
              <Ionicons name="brain" size={24} color="#9D4EDD" />
              <Text style={styles.benefitTitle}>Improves Focus</Text>
            </View>
            <View style={styles.benefitCard}>
              <Ionicons name="moon" size={24} color="#9D4EDD" />
              <Text style={styles.benefitTitle}>Better Sleep</Text>
            </View>
            <View style={styles.benefitCard}>
              <Ionicons name="fitness" size={24} color="#9D4EDD" />
              <Text style={styles.benefitTitle}>Lowers Anxiety</Text>
            </View>
          </View>
        </View>

        {/* Exercises */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose an Exercise</Text>
          <View style={styles.exercisesList}>
            {breathingExercises.map(renderExerciseCard)}
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
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  benefitCard: {
    width: '48%',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  exercisesList: {
    gap: 16,
  },
  exerciseCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#6A0DAD',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  difficultyBadge: {
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
    fontSize: 18,
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
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitsList: {
    gap: 4,
    marginTop: 8,
  },
  benefitText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  
  // Exercise Screen Styles
  exerciseContainer: {
    flex: 1,
  },
  exerciseContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  exerciseTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 44,
  },
  breathingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathingCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  countdownText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  controls: {
    alignItems: 'center',
    marginBottom: 40,
  },
  controlButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 40,
  },
  instructionText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  patternText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
});