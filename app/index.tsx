import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated, Platform, StatusBar,
  StyleSheet, Text, TouchableOpacity, View, useWindowDimensions,
} from 'react-native';

export default function SplashScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const LOGO_SIZE = Math.min(width, height) * 0.40;

  const logoScale   = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const btnOpacity  = useRef(new Animated.Value(0)).current;
  const glowAnim    = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, friction: 3, tension: 60, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.timing(textOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(btnOpacity,  { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1.07, duration: 1000, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 1,    duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const logoRingSize = LOGO_SIZE + 20;

  return (
    <LinearGradient colors={['#000000', '#1a0033', '#3b0764']} style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={[styles.inner, { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 16 : 50 }]}>

        {/* TOP — Logo + Name */}
        <View style={styles.topSection}>
          <Animated.View style={{
            opacity: logoOpacity,
            transform: [{ scale: Animated.multiply(logoScale, glowAnim) }],
          }}>
            <View style={[styles.logoRing, { width: logoRingSize, height: logoRingSize, borderRadius: logoRingSize / 2 }]}>
              <View style={[styles.logoInner, { width: LOGO_SIZE, height: LOGO_SIZE, borderRadius: LOGO_SIZE / 2 }]}>
                <Image
                  source={require('@/assets/images/logo.png')}
                  style={styles.logoImage}
                  contentFit="cover"
                />
              </View>
            </View>
          </Animated.View>

          <Animated.View style={{ opacity: textOpacity, alignItems: 'center', marginTop: 24 }}>
            <Text style={[styles.appName, { fontSize: Math.min(width * 0.08, 34) }]}>ManamCare</Text>
            <Text style={styles.tagline}>Your Mental Wellness Companion</Text>
          </Animated.View>
        </View>

        {/* BOTTOM — Buttons */}
        <Animated.View style={[styles.bottomSection, { opacity: btnOpacity }]}>
          <TouchableOpacity style={styles.loginBtn} activeOpacity={0.85} onPress={() => router.push('/login')}>
            <LinearGradient colors={['#9B30FF', '#6A0DAD']} style={styles.btnGradient}>
              <Text style={styles.loginBtnText}>Login to Continue</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/register')} activeOpacity={0.7}>
            <Text style={styles.registerBtnText}>
              New here? <Text style={styles.registerBtnBold}>Create an account</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 48,
    paddingHorizontal: 32,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 430,
  },
  topSection: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoRing: {
    borderWidth: 3, borderColor: '#9B30FF',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#9B30FF', shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9, shadowRadius: 24, elevation: 20,
  },
  logoInner: { overflow: 'hidden', backgroundColor: '#1a0033' },
  logoImage: { width: '100%', height: '100%' },
  appName: { fontWeight: '800', color: '#FFFFFF', letterSpacing: 2 },
  tagline: { fontSize: 13, color: '#C084FC', marginTop: 8, letterSpacing: 0.4 },
  bottomSection: { width: '100%', alignItems: 'center', gap: 14 },
  loginBtn: {
    width: '100%', borderRadius: 14, overflow: 'hidden',
    shadowColor: '#9B30FF', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5, shadowRadius: 12, elevation: 10,
  },
  btnGradient: { paddingVertical: 16, alignItems: 'center' },
  loginBtnText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700', letterSpacing: 0.5 },
  registerBtnText: { color: '#C084FC', fontSize: 14 },
  registerBtnBold: { color: '#FFFFFF', fontWeight: '700' },
});
