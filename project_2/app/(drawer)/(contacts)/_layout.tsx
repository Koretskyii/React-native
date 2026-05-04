import { Stack } from "expo-router";

export default function ContactsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ title: 'Контакти' }}
            />
            <Stack.Screen
                name="[id]"
                options={{ title: 'Контакт' }}
            />
        </Stack>
    );
}