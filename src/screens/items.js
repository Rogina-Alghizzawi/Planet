
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const ItemCard = ({ itemName, initialQuantity, image, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(initialQuantity.toString());

    const increment = () => {
        const newQuantity = (parseInt(quantity) + 1).toString();
        setQuantity(newQuantity);
        if (onQuantityChange) onQuantityChange(newQuantity);
    };

    const decrement = () => {
        const newQuantity = (parseInt(quantity) > 0 ? parseInt(quantity) - 1 : 0).toString();
        setQuantity(newQuantity);
        if (onQuantityChange) onQuantityChange(newQuantity);
    };

    const handleQuantityChange = (value) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        const newQuantity = numericValue === '' ? '0' : numericValue;
        setQuantity(newQuantity);
        if (onQuantityChange) onQuantityChange(newQuantity);
    };

    return (
        <View style={styles.card}>
            <Image source={image} style={styles.image} />
            <Text style={styles.itemName}>{itemName}</Text>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton} onPress={decrement}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.quantityInput}
                    value={quantity}
                    onChangeText={handleQuantityChange}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.quantityButton} onPress={increment}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '45%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        alignItems: 'center',
        borderColor: '#333366',
        borderWidth: 1,
    },
    image: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333366',
    },
    quantityLabel: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16,
        color: '#333366',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    quantityInput: {
        marginHorizontal: 10,
        fontSize: 18,
        color: '#333366',
        textAlign: 'center',
        width: 40,
        borderColor: '#333366',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#f0f0f0',
    },
    quantityButton: {
        backgroundColor: '#FFCC00',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    submitButton: {
        width: '100%',
        backgroundColor: '#CC3399',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ItemCard;
