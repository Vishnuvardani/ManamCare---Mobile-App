import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
  ScrollView, StatusBar, StyleSheet, Text,
  TextInput, TouchableOpacity, View,
} from 'react-native';
import { registerUser } from '@/services/api';

const GENDERS = ['Male', 'Female', 'Prefer not to say'];

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    dob: '', age: '', gender: '',
    password: '', confirmPassword: '',
  });

  const set = (key: string, value: string) => {
    // Apply input filtering based on field type
    if (key === 'name') {
      // Only allow letters and spaces for name
      value = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (key === 'phone') {
      // Only allow numbers for phone
      value = value.replace(/[^0-9]/g, '');
    }
    setForm(prev => ({ ...prev, [key]: value }));
    
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleDOB = (text: string) => {
    let d = text.replace(/[^0-9]/g, '');
    if (d.length > 2 && d.length <= 4) d = d.slice(0, 2) + '/' + d.slice(2);
    else if (d.length > 4)             d = d.slice(0, 2) + '/' + d.slice(2, 4) + '/' + d.slice(4, 8);

    let age = '';
    if (d.length === 10) {
      const [dd, mm, yyyy] = d.split('/').map(Number);
      const dob = new Date(yyyy, mm - 1, dd);
      if (!isNaN(dob.getTime()) && yyyy > 1900) {
        const today = new Date();
        let a = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) a--;
        if (a >= 0) age = String(a);
      }
    }
    setForm(prev => ({ ...prev, dob: d, age }));
    
    // Clear DOB error when user starts typing
    if (errors.dob) {
      setErrors(prev => ({ ...prev, dob: '' }));
    }
  };

  const validate = () => {
    const { name, email, phone, dob, age, gender, password, confirmPassword } = form;
    const newErrors: {[key: string]: string} = {};
    
    // Full Name validation
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      newErrors.name = 'Name must contain only letters';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    
    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }
    
    // Phone Number validation
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length !== 10) {
        newErrors.phone = 'Enter a valid 10-digit phone number';
      }
    }
    
    // Date of Birth validation
    if (!dob.trim()) {
      newErrors.dob = 'Date of birth is required';
    } else if (dob.length !== 10) {
      newErrors.dob = 'Enter a valid date';
    } else if (!age) {
      newErrors.dob = 'Invalid date of birth';
    } else if (Number(age) < 18) {
      newErrors.dob = 'You must be at least 18 years old';
    }
    
    // Gender validation
    if (!gender) {
      newErrors.gender = 'Please select your gender';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Include uppercase, lowercase, and number';
    }
    
    // Confirm Password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return; // Show errors in form, don't proceed
    
    setLoading(true);
    try {
      await registerUser({
        name: form.name.trim(), age: Number(form.age),
        gender: form.gender,   dob: form.dob,
        email: form.email.trim(), phone: form.phone.trim(),
        password: form.password,
      });
      Alert.alert('Success 🎉', 'Account created successfully!', [
        { text: 'Login Now', onPress: () => router.replace('/login') },
      ]);
    } catch (err: any) {
      Alert.alert('Registration Failed', err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
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

            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join ManamCare today</Text>

            <Field icon="person-outline" placeholder="Full Name (letters only)" value={form.name} onChangeText={v => set('name', v)} error={errors.name} />
            <Field icon="mail-outline" placeholder="Email Address" value={form.email} onChangeText={v => set('email', v)} keyboardType="email-address" autoCapitalize="none" error={errors.email} />
            <Field icon="call-outline" placeholder="Phone Number (10 digits)" value={form.phone} onChangeText={v => set('phone', v)} keyboardType="numeric" maxLength={10} error={errors.phone} />

            {/* DOB */}
            <View style={[styles.inputWrapper, errors.dob && styles.inputError]}>
              <Ionicons name="calendar-outline" size={20} color="#9B30FF" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Date of Birth  DD/MM/YYYY"
                placeholderTextColor="#6B7280"
                value={form.dob}
                onChangeText={handleDOB}
                keyboardType="numeric"
                maxLength={10}
                underlineColorAndroid="transparent"
                selectionColor="#9B30FF"
                cursorColor="#9B30FF"
              />
            </View>
            {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

            {/* Age — read only */}
            <View style={styles.inputWrapper}>
              <Ionicons name="hourglass-outline" size={20} color="#9B30FF" style={styles.icon} />
              <Text style={[styles.inputText, !form.age && styles.placeholder]}>
                {form.age ? `Age: ${form.age} years` : 'Age  (auto-calculated)'}
              </Text>
            </View>

            {/* Gender */}
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderRow}>
              {GENDERS.map(g => (
                <TouchableOpacity
                  key={g}
                  style={[styles.genderChip, form.gender === g && styles.genderChipActive]}
                  onPress={() => {
                    set('gender', g);
                    if (errors.gender) {
                      setErrors(prev => ({ ...prev, gender: '' }));
                    }
                  }}
                >
                  <Text style={[styles.genderChipText, form.gender === g && styles.genderChipTextActive]}>
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

            {/* Password */}
            <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
              <Ionicons name="lock-closed-outline" size={20} color="#9B30FF" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#6B7280"
                secureTextEntry={!showPass}
                value={form.password}
                onChangeText={v => set('password', v)}
                underlineColorAndroid="transparent"
                selectionColor="#9B30FF"
                cursorColor="#9B30FF"
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color="#9B30FF" />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            {/* Confirm Password */}
            <View style={[styles.inputWrapper, errors.confirmPassword && styles.inputError]}>
              <Ionicons name="lock-closed-outline" size={20} color="#9B30FF" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#6B7280"
                secureTextEntry={!showPass}
                value={form.confirmPassword}
                onChangeText={v => set('confirmPassword', v)}
                underlineColorAndroid="transparent"
                selectionColor="#9B30FF"
                cursorColor="#9B30FF"
              />
            </View>
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

            <TouchableOpacity style={styles.btn} onPress={handleRegister} disabled={loading} activeOpacity={0.85}>
              <LinearGradient colors={['#9B30FF', '#6A0DAD']} style={styles.btnGradient}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Create Account</Text>}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/login')} style={styles.loginRow}>
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginBold}>Login</Text>
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

function Field({ icon, placeholder, value, onChangeText, keyboardType = 'default', autoCapitalize = 'words', maxLength, error }: any) {
  return (
    <>
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        <Ionicons name={icon} size={20} color="#9B30FF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          underlineColorAndroid="transparent"
          selectionColor="#9B30FF"
          cursorColor="#9B30FF"
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
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
  backBtn: { marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#C084FC', marginBottom: 24 },
  label: { color: '#C084FC', fontSize: 13, marginBottom: 10 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1a0033', borderRadius: 12,
    borderWidth: 1.5, borderColor: '#6A0DAD',
    marginBottom: 4, paddingHorizontal: 14, height: 54,
  },
  inputError: { borderColor: '#EF4444' },
  errorText: { 
    color: '#EF4444', fontSize: 12, marginBottom: 12, marginLeft: 4 
  },
  icon: { marginRight: 10 },
  input: {
    flex: 1, color: '#FFFFFF', fontSize: 15,
    backgroundColor: 'transparent', paddingVertical: 0,
  },
  inputText: { flex: 1, color: '#FFFFFF', fontSize: 15 },
  placeholder: { color: '#6B7280' },
  genderRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },
  genderChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1.5, borderColor: '#6A0DAD', backgroundColor: '#1a0033',
  },
  genderChipActive: { backgroundColor: '#6A0DAD', borderColor: '#9B30FF' },
  genderChipText: { color: '#C084FC', fontSize: 13 },
  genderChipTextActive: { color: '#FFFFFF', fontWeight: '700' },
  btn: {
    borderRadius: 14, overflow: 'hidden', marginTop: 8,
    shadowColor: '#9B30FF', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5, shadowRadius: 12, elevation: 10,
  },
  btnGradient: { paddingVertical: 16, alignItems: 'center' },
  btnText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  loginRow: { alignItems: 'center', marginTop: 20 },
  loginText: { color: '#C084FC', fontSize: 14 },
  loginBold: { color: '#FFFFFF', fontWeight: '700' },
});
