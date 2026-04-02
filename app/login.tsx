import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
  ScrollView, StatusBar, StyleSheet, Text,
  TextInput, TouchableOpacity, View,
} from 'react-native';
import { loginUser } from '@/services/api';

export default function LoginScreen() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Email validation
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }
    
    // Password validation
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      newErrors.password = 'Include uppercase, lowercase, and number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      await loginUser({
        email: form.email.trim(),
        password: form.password
      });
      
      // Success - navigate to home
      router.replace('/(tabs)');
      
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Handle specific error codes
      if (err.code === 'INVALID_CREDENTIALS') {
        setErrors({ 
          email: 'Invalid email or password',
          password: 'Invalid email or password'
        });
      } else if (err.status === 429) {
        Alert.alert('Too Many Attempts', 'Please wait before trying again.');
      } else {
        Alert.alert('Login Failed', err.message || 'Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  return (
    <LinearGradient colors={['#000000', '#1a0033']} style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.kav}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.card, { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 12 : 24 }]}>

            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#C084FC" />
            </TouchableOpacity>

            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your ManamCare account</Text>

            {/* Email */}
            <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
              <Ionicons name="mail-outline" size={20} color="#9B30FF" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#6B7280"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={form.email}
                onChangeText={(text) => updateForm('email', text)}
                underlineColorAndroid="transparent"
                selectionColor="#9B30FF"
                cursorColor="#9B30FF"
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Password */}
            <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
              <Ionicons name="lock-closed-outline" size={20} color="#9B30FF" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#6B7280"
                secureTextEntry={!showPass}
                autoComplete="password"
                value={form.password}
                onChangeText={(text) => updateForm('password', text)}
                underlineColorAndroid="transparent"
                selectionColor="#9B30FF"
                cursorColor="#9B30FF"
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color="#9B30FF" />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.btn, loading && styles.btnDisabled]} 
              onPress={handleLogin} 
              disabled={loading} 
              activeOpacity={0.85}
            >
              <LinearGradient colors={['#9B30FF', '#6A0DAD']} style={styles.btnGradient}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnText}>Login</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={styles.googleBtn}
              activeOpacity={0.85}
              onPress={() => Alert.alert('Coming Soon', 'Google Sign-In will be available soon.')}
            >
              <Ionicons name="logo-google" size={20} color="#EA4335" />
              <Text style={styles.googleBtnText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/register')} style={styles.registerRow}>
              <Text style={styles.registerText}>
                Don't have an account? <Text style={styles.registerBold}>Register</Text>
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  kav: { flex: 1 },
  scroll: { flexGrow: 1, alignItems: 'center' },
  card: {
    width: '100%',
    maxWidth: 430,
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  backBtn: { marginBottom: 28 },
  title: { fontSize: 30, fontWeight: '800', color: '#FFFFFF', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#C084FC', marginBottom: 32 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1a0033', borderRadius: 12,
    borderWidth: 1.5, borderColor: '#6A0DAD',
    marginBottom: 4, paddingHorizontal: 14, height: 54,
  },
  inputError: { borderColor: '#EF4444' },
  icon: { marginRight: 10 },
  input: {
    flex: 1, color: '#FFFFFF', fontSize: 15,
    backgroundColor: 'transparent', paddingVertical: 0,
  },
  errorText: { 
    color: '#EF4444', fontSize: 12, marginBottom: 12, marginLeft: 4 
  },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 24, marginTop: 8 },
  forgotText: { color: '#C084FC', fontSize: 13 },
  btn: {
    borderRadius: 14, overflow: 'hidden',
    shadowColor: '#9B30FF', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5, shadowRadius: 12, elevation: 10,
  },
  btnDisabled: { opacity: 0.7 },
  btnGradient: { paddingVertical: 16, alignItems: 'center' },
  btnText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#3b0764' },
  dividerText: { color: '#9B30FF', marginHorizontal: 12, fontSize: 13 },
  googleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#0f0020', borderRadius: 14, paddingVertical: 14,
    borderWidth: 1.5, borderColor: '#6A0DAD', gap: 10,
  },
  googleBtnText: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  registerRow: { alignItems: 'center', marginTop: 28 },
  registerText: { color: '#C084FC', fontSize: 14 },
  registerBold: { color: '#FFFFFF', fontWeight: '700' },
});