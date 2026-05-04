import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { products } from '../../../data/products';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Товар не знайдено</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  image: { width: '100%', height: 300, borderRadius: 10, marginBottom: 20, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 22, color: 'green', marginBottom: 15 },
  description: { fontSize: 16, lineHeight: 24, color: '#333' },
  error: { fontSize: 18, color: 'red', textAlign: 'center', marginTop: 50 }
});
