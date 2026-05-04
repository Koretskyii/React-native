import { Stack } from "expo-router";

export default function NewsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ title: 'Новини' }}
            />
            <Stack.Screen
                name="[id]"
                options={{ title: 'Новина' }}
            />
        </Stack>
    );
}