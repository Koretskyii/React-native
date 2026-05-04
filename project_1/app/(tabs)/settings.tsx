import { SettingRow } from '@/components/setting-row';
import { ThemedText } from '@/components/themed-text';
import { SETTINGS_LIST, SettingItem } from '@/constants/settings.const';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, Animated, StyleSheet, View } from 'react-native';

type ToggleState = Record<string, boolean>;

export default function SettingsScreen() {
  const [toggles, setToggles] = useState<ToggleState>({
    darkMode: false,
    notifications: true,
  });

  const handleToggle = useCallback((key: string, value: boolean) => {
    setToggles(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleAction = useCallback((actionId: string) => {
    switch (actionId) {
      case 'about':
        Alert.alert('About', 'MobileLabsRN2026\nVersion 1.0.0\n\nReact Native Lab 1');
        break;
      case 'logout':
        Alert.alert(
          'Вихід',
          'Ви дійсно хочете вийти?',
          [
            { text: 'Скасувати', style: 'cancel' },
            { text: 'Вийти', style: 'destructive', onPress: () => console.log('Logged out') },
          ]
        );
        break;
    }
  }, []);

  const handleNavigate = useCallback((screen: string, title: string) => {
    router.push({ pathname: screen as any, params: { title } });
  }, []);

  const renderItem = useCallback(({ item }: { item: SettingItem }) => {
    switch (item.type) {
      case 'toggle':
        return (
          <SettingRow
            item={item}
            toggleValue={toggles[item.stateKey]}
            onToggle={(value) => handleToggle(item.stateKey, value)}
          />
        );
      case 'navigate':
        return (
          <SettingRow
            item={item}
            onPress={() => handleNavigate(item.screen, item.title)}
          />
        );
      case 'action':
        return (
          <SettingRow
            item={item}
            onPress={() => handleAction(item.actionId)}
          />
        );
    }
  }, [toggles, handleToggle, handleNavigate, handleAction]);

  return (
    <Animated.FlatList
      data={SETTINGS_LIST}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={
        <View>
          <Image
            source={require('@/assets/images/settings_header.jpg')}
            style={styles.headerImage}
          />
          <ThemedText style={styles.headerTitle}>Settings</ThemedText>
        </View>
      }
      style={styles.flatList}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  headerImage: {
    width: '100%',
    height: 180,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
});
