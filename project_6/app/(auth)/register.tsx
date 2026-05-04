import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await register(email, password);
      router.replace('/(app)');
    } catch (e: any) {
      Alert.alert('Помилка реєстрації', e.message);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Створити акаунт</Text>
          <Text style={styles.subtitle}>Приєднуйтесь до нас сьогодні</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity style={styles.primaryButton} onPress={handleRegister} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Зареєструватися</Text>
          </TouchableOpacity>
          
          <View style={styles.footer}>
            <Text style={styles.textMuted}>Вже маєте акаунт?</Text>
            <Link href="/login" style={styles.link}>Увійти</Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f3f4f6' },
  card: { backgroundColor: '#ffffff', padding: 24, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 5 },
  title: { fontSize: 28, fontWeight: '800', color: '#111827', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6b7280', textAlign: 'center', marginBottom: 24 },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', padding: 14, marginBottom: 16, borderRadius: 10, fontSize: 16, color: '#1f2937' },
  primaryButton: { backgroundColor: '#10b981', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 8, shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 4 },
  primaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  footer: { marginTop: 24, flexDirection: 'row', justifyContent: 'center', gap: 6 },
  textMuted: { color: '#6b7280', fontSize: 15 },
  link: { color: '#10b981', fontSize: 15, fontWeight: '600' }
});
