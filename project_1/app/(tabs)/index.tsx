import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

const FEATURES = [
  { icon: 'person-outline' as const, title: 'Профіль', description: 'Переглянь та редагуй свій профіль', tab: '/profile' },
  { icon: 'settings-outline' as const, title: 'Налаштування', description: 'Теми, сповіщення та приватність', tab: '/settings' },
  { icon: 'code-slash-outline' as const, title: 'React Native', description: 'Побудовано з Expo SDK 54', tab: null },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <ThemedView style={styles.container}>
        <View style={styles.heroSection}>
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.heroImage}
          />
          <View style={styles.titleRow}>
            <ThemedText style={styles.title}>Вітаю!</ThemedText>
            <HelloWave />
          </View>
          <ThemedText style={styles.subtitle}>MobileLabsRN2026</ThemedText>
          <ThemedText style={styles.description}>
            Лабораторна робота №1 — базовий React Native додаток з навігацією, профілем та
            налаштуваннями.
          </ThemedText>
        </View>

        <View style={styles.featuresSection}>
          <ThemedText style={styles.sectionTitle}>Що в додатку</ThemedText>
          {FEATURES.map((feature) => (
            <Pressable
              key={feature.title}
              style={({ pressed }) => [styles.featureCard, pressed && feature.tab && styles.featureCardPressed]}
              onPress={feature.tab ? () => router.push(feature.tab as any) : undefined}
            >
              <View style={styles.featureIconWrap}>
                <Ionicons name={feature.icon} size={24} color="#4A90D9" />
              </View>
              <View style={styles.featureText}>
                <ThemedText style={styles.featureTitle}>{feature.title}</ThemedText>
                <ThemedText style={styles.featureDescription}>{feature.description}</ThemedText>
              </View>
              {feature.tab && (
                <Ionicons name="chevron-forward" size={18} color="#ccc" />
              )}
            </Pressable>
          ))}
        </View>

        <View style={styles.infoSection}>
          <ThemedText style={styles.sectionTitle}>Технології</ThemedText>
          <View style={styles.techRow}>
            {['React Native', 'Expo', 'TypeScript', 'expo-router'].map((tech) => (
              <View key={tech} style={styles.techBadge}>
                <ThemedText style={styles.techText}>{tech}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Корецький Юрій • ДУ «Житомирська політехніка» • 2026
          </ThemedText>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroImage: {
    width: 120,
    height: 100,
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90D9',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  featuresSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(74, 144, 217, 0.06)',
  },
  featureCardPressed: {
    opacity: 0.7,
  },
  featureIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(74, 144, 217, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  featureDescription: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  infoSection: {
    marginBottom: 28,
  },
  techRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(74, 144, 217, 0.1)',
  },
  techText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4A90D9',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
  footerText: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
  },
});
