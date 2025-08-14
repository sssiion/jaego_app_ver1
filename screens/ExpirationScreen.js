// screens/ExpirationScreen.js
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert
} from 'react-native';
import ApiService from '../services/ApiService';

const ExpirationScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // 더미 카테고리 데이터 (실제로는 API에서 가져와야 함)
    const dummyCategories = [
        { id: 1, name: '유제품', count: 15 },
        { id: 2, name: '과자류', count: 23 },
        { id: 3, name: '음료수', count: 8 },
        { id: 4, name: '육류', count: 12 },
        { id: 5, name: '야채류', count: 19 },
        { id: 6, name: '냉동식품', count: 7 },
    ];

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            // 실제 API 연동 시 여기서 카테고리 목록을 가져옴
            // const data = await ApiService.getCategories();
            setCategories(dummyCategories);
        } catch (error) {
            Alert.alert('오류', '카테고리를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryPress = (category) => {
        navigation.navigate('ProductList', {
            categoryName: category.name,
            type: 'expiration'
        });
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <Text>로딩중...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.grid}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={styles.categoryCard}
                        onPress={() => handleCategoryPress(category)}
                    >
                        <Text style={styles.categoryName}>{category.name}</Text>
                        <Text style={styles.categoryCount}>{category.count}개</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: '48%',
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 12,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    categoryCount: {
        fontSize: 14,
        color: '#666',
    },
});

export default ExpirationScreen;
