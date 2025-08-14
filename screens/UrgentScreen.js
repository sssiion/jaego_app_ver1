import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { getUrgentInventories } from '../services/inventories';

export default function UrgentScreen() {
    const [urgentItems, setUrgentItems] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        getUrgentInventories(3).then(res => setUrgentItems(res.data));
    }, []);

    const filtered = urgentItems.filter(item =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
    );

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                placeholder="검색"
                style={styles.input}
                value={keyword}
                onChangeText={setKeyword}
            />
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                        <Text>{item.remainingDays}일 남음</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
    item: { padding: 15, borderBottomWidth: 1, borderColor: '#ddd' }
});
