import { useLocalSearchParams, Stack } from "expo-router";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { generateNews } from "@/data/news";

export default function NewsDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const numericId = parseInt(Array.isArray(id) ? id[0] : id, 10);
    const news = generateNews(1, numericId)[0];

    const formattedDate = news?.date
        ? new Date(news.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })
        : '';

    return (
        <>
            <Stack.Screen options={{ title: news?.title ?? 'Новина', headerBackTitle: 'Назад' }} />

            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                {news?.image && (
                    <Image source={{ uri: news.image }} style={styles.image} resizeMode="cover" />
                )}

                <View style={styles.body}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{news?.category}</Text>
                    </View>

                    <Text style={styles.title}>{news?.title}</Text>

                    <Text style={styles.date}>🗓 {formattedDate}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.description}>{news?.description}</Text>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fc',
    },
    content: {
        paddingBottom: 40,
    },
    image: {
        width: '100%',
        height: 240,
    },
    body: {
        padding: 20,
        gap: 12,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#eef1ff',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    categoryText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#4a6cf7',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1a1a2e',
        lineHeight: 32,
        letterSpacing: -0.3,
    },
    date: {
        fontSize: 13,
        color: '#999',
    },
    divider: {
        height: 1,
        backgroundColor: '#e8ecf7',
    },
    description: {
        fontSize: 16,
        color: '#444',
        lineHeight: 26,
    },
});
