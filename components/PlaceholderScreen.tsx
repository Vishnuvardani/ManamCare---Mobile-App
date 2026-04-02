import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  title: string;
  icon: string;
  description: string;
}

export default function PlaceholderScreen({ title, icon, description }: Props) {
  const router = useRouter();
  return (
    <LinearGradient colors={['#0D0D0D', '#1a0033']} style={styles.root}>
      <View style={[styles.inner, { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 16 : 60 }]}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#C084FC" />
        </TouchableOpacity>
        <View style={styles.center}>
          <View style={styles.iconCircle}>
            <Ionicons name={icon as any} size={48} color="#9B30FF" />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{description}</Text>
          <Text style={styles.coming}>Coming Soon 🚀</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 28, maxWidth: 430, alignSelf: 'center', width: '100%' },
  back: { marginBottom: 32 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  iconCircle: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#1a0033', borderWidth: 2, borderColor: '#6A0DAD',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#9B30FF', shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8, shadowRadius: 20, elevation: 12,
  },
  title: { fontSize: 26, fontWeight: '800', color: '#FFFFFF' },
  desc: { fontSize: 14, color: '#C084FC', textAlign: 'center' },
  coming: { fontSize: 16, color: '#9B30FF', fontWeight: '700', marginTop: 8 },
});
