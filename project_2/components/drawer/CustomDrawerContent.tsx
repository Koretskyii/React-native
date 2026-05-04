import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";


export default function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
                <Text style={styles.name}>Koretskyii Yurii</Text>
                <Text style={styles.group}>ІПЗ-22-1</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    header: {
        padding: 16,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#ccc'
    },
    group: {
        fontSize: 14,
        color: '#ccc',
    },
});