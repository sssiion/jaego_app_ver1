// screens/ProductDetailScreen.js
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import ApiService from '../services/ApiService';

const ProductDetailScreen = ({ route }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);

    // 더미 데이터
    const dummyProduct = {
        id: 1,
        name: '우유 500ml',
        totalQuantity: 25,
        batches: [
            { id: 1, quantity: 5, expiryDate: null, label: '무제한' },
            { id: 2, quantity: 8, expiryDate: '2025-08-16', daysLeft: 2 },
            { id: 3, quantity: 12, expiryDate: '2025-08-20', daysLeft: 6 },
        ]
    };

    useEffect(() => {
        loadProductDetail();
    }, []);

    const loadProductDetail = async () => {
        try {
            // 실제 API 연동 시 상품 상세 정보를 가져옴
            setProduct(dummyProduct);
            setBatches(dummyProduct.batches);
        } catch (error) {
            Alert.alert('오류', '상품 정보를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleReduceStock = async (quantity) => {
        try {
            await ApiService.reduceStockFIFO(productId, quantity);
            Alert.alert('성공', `재고 ${quantity}개가 차감되었습니다.`);
            loadProductDetail(); // 새로고침
        } catch (error) {
            Alert.alert('오류', '재고 차감에 실패했습니다.');
        }
    };

    if (loading || !product) {
        return (
            <View style={styles.centerContainer}>
                <Text>로딩중...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.totalQuantity}>총 보유량: {product.totalQuantity}개</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>기한별 재고 현황</Text>
                {batches.map((batch, index) => (
                    <View key={batch.id} style={styles.batchCard}>
                        <View style={styles.batchInfo}>
                            <Text style={styles.batchLabel}>
                                {batch.expiryDate ? batch.expiryDate : '무제한'}
                            </Text>
                            <Text style={styles.batchQuantity}>{batch.quantity}개</Text>
                        </View>
                        {batch.daysLeft !== undefined && (
                            <View style={[
                                styles.daysLeftBadge,
                                { backgroundColor: batch.daysLeft <= 3 ? '#ff4444' : '#44aa44' }
                            ]}>
                                <Text style={styles.daysLeftText}>
                                    {batch.daysLeft}일 남음
                                </Text>
                            </View>
                        )}
                    </View>
                ))}
            </View>

            <View style={styles.actionSection}>
                <Text style={styles.sectionTitle}>재고 관리</Text>
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.reduceButton]}
                        onPress={() => handleReduceStock(1)}
                    >
                        <Text style={styles.buttonText}>1개 차감</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.reduceButton]}
                        onPress={() => handleReduceStock(5)}
                    >
                        <Text style={styles.buttonText}>5개 차감</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 12,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    totalQuantity: {
        fontSize: 18,
        color: '#666',
    },
    section: {
        backgroundColor: 'white',
        margin: 12,
        padding: 16,
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    batchCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    batchInfo: {
        flex: 1,
    },
    batchLabel: {
        fontSize: 16,
        marginBottom: 4,
    },
    batchQuantity: {
        fontSize: 14,
        color: '#666',
    },
    daysLeftBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    daysLeftText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    actionSection: {
        backgroundColor: 'white',
        margin: 12,
        padding: 16,
        borderRadius: 8,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    actionButton: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        minWidth: 100,
    },
    reduceButton: {
        backgroundColor: '#ff4444',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ProductDetailScreen;
