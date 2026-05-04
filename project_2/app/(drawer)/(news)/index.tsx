import { generateNews, initialNews } from "@/data/news";
import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import NewsCard from "@/components/news/NewsCard";
import ListHeader from "@/components/news/ListHeader";
import ListFooter from "@/components/news/ListFooter";

export default function NewsIndex() {
    const [news, setNews] = useState(initialNews);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setNews(generateNews(10)); // скидаємо до свіжих 10
            setRefreshing(false);
        }, 1500);
    };

    const handleLoadMore = () => {
        if (loadingMore) return; // захист від подвійного виклику
        setLoadingMore(true);
        setTimeout(() => {
            setNews(prev => [...prev, ...generateNews(10, prev.length)]); // ДОДАЄМО до існуючих
            setLoadingMore(false);
        }, 1000);
    };

    return (
        <FlatList
            data={news}
            renderItem={({ item }) => <NewsCard item={item} />}
            keyExtractor={item => item.id}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={<ListHeader />}
            ListFooterComponent={<ListFooter loading={loadingMore} />}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={10}
            style={styles.list}
            contentContainerStyle={styles.content}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: '#f7f8fc',
    },
    content: {
        paddingBottom: 16,
    },
});