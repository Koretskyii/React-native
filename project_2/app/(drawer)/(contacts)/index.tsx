import ContactItem from "@/components/news/ContactItem";
import { contactSections } from "@/data/contacts";
import React from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";

export default function ContactsScreen() {
    return (
        <SectionList
            sections={contactSections}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ContactItem contact={item} />}
            renderSectionHeader={({ section: { title } }) => (
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{title}</Text>
                </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    );
}

const styles = StyleSheet.create({
    sectionHeader: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0',
    },
});
