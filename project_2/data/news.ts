export interface NewsItem {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;
    category: string;
}

export function generateNews(count: number, startId: number = 0): NewsItem[] {
    return Array.from({ length: count }, (_, index) => ({
        id: (startId + index).toString(),
        title: `Новина ${startId + index}`,
        description: `Опис новини ${startId + index}`,
        image: `https://picsum.photos/800/450?random=${startId + index}`,
        date: new Date(Date.now() - index * 1000 * 60 * 60 * 24).toISOString(),
        category: index % 2 === 0 ? 'Спорт' : 'Політика',
    }));
}

export const initialNews = generateNews(10);