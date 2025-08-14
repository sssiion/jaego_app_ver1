import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { getCategoriesWithCount } from '../services/categories';

export default function CategoryScreen({ navigation }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategoriesWithCount().then(res => setCategories(res.data));
    }, []);

    return (
        <FlatList
            data={categories}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate('ProductList', { categoryId: item.id })}
                >
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.count}>{item.count}개</Text>
                </TouchableOpacity>
            )}
        />
    );
}

const styles = StyleSheet.create({
    btn: { flex: 1, margin: 10, padding: 20, backgroundColor: '#eee', borderRadius: 10, alignItems: 'center' },
    title: { fontSize: 16, fontWeight: 'bold' },
    count: { color: '#666' }
});
