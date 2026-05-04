import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { products, Product } from '../../data/products';

export default function CatalogScreen() {
  const { logout } = useAuth();

  const renderItem = ({ item }: { item: Product }) => (
    <Link href={`/details/${item.id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Вийти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  list: { padding: 10 },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 8, elevation: 2 },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 15 },
  info: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: 'green', marginTop: 5 },
  logoutBtn: { margin: 15, padding: 15, backgroundColor: '#ff4444', borderRadius: 8, alignItems: 'center' },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
