import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

export default function BookTabScreen() {
  const appointmentTypes = [
    { id: 1, title: 'Individual Therapy', duration: '50 min', price: '$120', icon: 'person' },
    { id: 2, title: 'Couple Therapy', duration: '60 min', price: '$180', icon: 'people' },
    { id: 3, title: 'Group Session', duration: '90 min', price: '$80', icon: 'people-circle' },
    { id: 4, title: 'Crisis Support', duration: '30 min', price: '$100', icon: 'medical' },
  ];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
      
      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={[styles.container, { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 16 : 60 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Book Appointment</Text>
        <Text style={styles.subtitle}>Choose your preferred therapy session</Text>

        <View style={styles.appointmentList}>
          {appointmentTypes.map((appointment) => (
            <TouchableOpacity key={appointment.id} style={styles.appointmentCard}>
              <LinearGradient
                colors={['#1A1A1A', '#2A2A2A']}
                style={styles.cardGradient}
              >
                <View style={styles.cardContent}>
                  <View style={styles.iconContainer}>
                    <Ionicons name={appointment.icon as any} size={24} color="#9D4EDD" />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{appointment.title}</Text>
                    <Text style={styles.cardDuration}>{appointment.duration}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>{appointment.price}</Text>
                    <Ionicons name="chevron-forward" size={20} color="#666" />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.emergencySection}>
          <LinearGradient
            colors={['#6A0DAD', '#9D4EDD']}
            style={styles.emergencyCard}
          >
            <View style={styles.emergencyContent}>
              <Ionicons name="warning" size={32} color="#FFFFFF" />
              <View style={styles.emergencyText}>
                <Text style={styles.emergencyTitle}>Need Immediate Help?</Text>
                <Text style={styles.emergencySubtitle}>24/7 Crisis Support Available</Text>
              </View>
              <TouchableOpacity style={styles.emergencyButton}>
                <Text style={styles.emergencyButtonText}>Call Now</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
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
  
  appointmentList: { gap: 16, marginBottom: 32 },
  appointmentCard: { borderRadius: 20, overflow: 'hidden' },
  cardGradient: { padding: 20 },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#0D0D0D', alignItems: 'center', justifyContent: 'center',
    marginRight: 16,
  },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#FFFFFF', marginBottom: 4 },
  cardDuration: { fontSize: 14, color: '#9D4EDD' },
  priceContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  price: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  
  emergencySection: { marginTop: 20 },
  emergencyCard: { borderRadius: 20, padding: 24 },
  emergencyContent: { flexDirection: 'row', alignItems: 'center' },
  emergencyText: { flex: 1, marginLeft: 16 },
  emergencyTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  emergencySubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  emergencyButton: {
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8,
  },
  emergencyButtonText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
});