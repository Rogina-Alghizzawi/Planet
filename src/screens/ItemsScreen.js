import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ItemaddCard from './ItemaddCard';

const ItemsScreen = ({ route, navigation }) => {
    const { onItemsAdded } = route.params; 
    const [items, setItems] = useState([
        { id: '1', name: 'Oreo', quantity: 0, image: require('D:/internship/planetDonut/assets/Double Nutella.jpg') },
        { id: '2', name: 'Donut', quantity: 0, image: require('D:/internship/planetDonut/assets/Double Nutella.jpg') },
    ]);

    const handleQuantityChange = (id, newQuantity) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const handleItemSubmit = (id) => {
        const item = items.find(item => item.id === id);
        if (item && item.quantity > 0) {
            const addedItems = items.filter(item => item.quantity > 0);
            onItemsAdded(addedItems);
            navigation.goBack();
        }
    };

    const renderItem = ({ item }) => (
        <ItemaddCard
            key={item.id} 
            itemName={item.name}
            initialQuantity={item.quantity}
            image={item.image}
            onQuantityChange={newQuantity => handleQuantityChange(item.id, newQuantity)}
            onSubmit={() => handleItemSubmit(item.id)}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.list}
                columnWrapperStyle={styles.columnWrapper}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    list: {
        paddingBottom: 10, 
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
});

export default ItemsScreen;
