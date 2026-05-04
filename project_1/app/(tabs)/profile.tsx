import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PROFILE_DATA } from "@/constants/profile.const";
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function ProfileScreen() {
    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            <ThemedView style={styles.container}>
                <View style={styles.header}>
                    <Image source={PROFILE_DATA.avatar} style={styles.avatar} />
                    <ThemedText style={styles.name}>
                        {PROFILE_DATA.firstName} {PROFILE_DATA.lastName}
                    </ThemedText>
                    <ThemedText style={styles.username}>{PROFILE_DATA.username}</ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.bio}>{PROFILE_DATA.bio}</ThemedText>
                </View>

                <View style={styles.statsRow}>
                    {PROFILE_DATA.stats.map((stat) => (
                        <View key={stat.label} style={styles.statItem}>
                            <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
                            <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    {PROFILE_DATA.info.map((item) => (
                        <View key={item.label} style={styles.infoRow}>
                            <Ionicons name={item.icon} size={20} color="#888" style={styles.infoIcon} />
                            <View>
                                <ThemedText style={styles.infoLabel}>{item.label}</ThemedText>
                                <ThemedText style={styles.infoValue}>{item.value}</ThemedText>
                            </View>
                        </View>
                    ))}
                </View>

                <Pressable
                    style={({ pressed }) => [styles.editButton, pressed && styles.editButtonPressed]}
                    onPress={() => Alert.alert('Edit Profile', 'Тут буде редагування профілю')}
                >
                    <Ionicons name="create-outline" size={18} color="#fff" />
                    <ThemedText style={styles.editButtonText}>Редагувати профіль</ThemedText>
                </Pressable>
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
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 12,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    username: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    bio: {
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'center',
        color: '#666',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        marginVertical: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#ddd',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
    },
    statLabel: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    section: {
        marginVertical: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#eee',
    },
    infoIcon: {
        marginRight: 12,
        width: 24,
    },
    infoLabel: {
        fontSize: 11,
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    infoValue: {
        fontSize: 15,
        marginTop: 2,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#4A90D9',
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 20,
    },
    editButtonPressed: {
        opacity: 0.8,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});