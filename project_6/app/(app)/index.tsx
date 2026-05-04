import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function ProfileScreen() {
  const { user, logout, deleteAccount } = useAuth();
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setName(data.name || '');
            setAge(data.age || '');
            setCity(data.city || '');
          }
        } catch (e: any) {
          console.error('Failed to fetch profile', e);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, { name, age, city });
      Alert.alert('Успіх', 'Дані успішно оновлено!');
    } catch (e: any) {
      Alert.alert('Помилка', e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.prompt(
      'Видалення акаунту',
      'Введіть ваш пароль для підтвердження видалення:',
      [
        { text: 'Скасувати', style: 'cancel' },
        { 
          text: 'Видалити', 
          style: 'destructive',
          onPress: async (pwd) => {
            if (!pwd) {
              Alert.alert('Помилка', 'Пароль обов\'язковий!');
              return;
            }
            try {
              await deleteAccount(pwd);
              Alert.alert('Акаунт видалено');
            } catch (e: any) {
              Alert.alert('Помилка', e.message);
            }
          }
        }
      ],
      'secure-text'
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        
        <View style={styles.header}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{name ? name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.emailText}>{user?.email}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Персональні дані</Text>
          
          <Text style={styles.label}>Ім'я</Text>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
            placeholder="Введіть ваше ім'я"
            placeholderTextColor="#9ca3af"
          />
          
          <Text style={styles.label}>Вік</Text>
          <TextInput 
            style={styles.input} 
            value={age} 
            onChangeText={setAge} 
            keyboardType="numeric" 
            placeholder="Скільки вам років?"
            placeholderTextColor="#9ca3af"
          />
          
          <Text style={styles.label}>Місто</Text>
          <TextInput 
            style={styles.input} 
            value={city} 
            onChangeText={setCity} 
            placeholder="Де ви живете?"
            placeholderTextColor="#9ca3af"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saving} activeOpacity={0.8}>
            {saving ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.saveButtonText}>Зберегти зміни</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.8}>
            <Text style={styles.logoutButtonText}>Вийти з системи</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} activeOpacity={0.8}>
            <Text style={styles.deleteButtonText}>Видалити акаунт</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' },
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f3f4f6' },
  
  header: { alignItems: 'center', marginTop: 20, marginBottom: 30 },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#3b82f6', justifyContent: 'center', alignItems: 'center', marginBottom: 12, shadowColor: '#3b82f6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#ffffff' },
  emailText: { fontSize: 16, color: '#4b5563', fontWeight: '500' },
  
  card: { backgroundColor: '#ffffff', padding: 24, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 20 },
  
  label: { fontSize: 14, fontWeight: '600', color: '#4b5563', marginBottom: 6, marginLeft: 4 },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', padding: 14, marginBottom: 16, borderRadius: 10, fontSize: 16, color: '#1f2937' },
  
  saveButton: { backgroundColor: '#10b981', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 10, shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 4 },
  saveButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  
  actionsContainer: { gap: 12, marginBottom: 40 },
  logoutButton: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#d1d5db', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  logoutButtonText: { color: '#4b5563', fontSize: 16, fontWeight: '600' },
  
  deleteButton: { backgroundColor: '#fee2e2', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  deleteButtonText: { color: '#ef4444', fontSize: 16, fontWeight: '700' }
});
