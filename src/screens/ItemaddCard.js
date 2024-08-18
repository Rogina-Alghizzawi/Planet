
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const ItemaddCard = ({ itemName, initialQuantity, image, onQuantityChange, onSubmit }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const increment = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    const decrement = () => {
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    };

    const handleQuantityChange = (value) => {
        const newQuantity = parseInt(value) || 0;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
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
                    keyboardType="numeric"
                    value={quantity.toString()}
                    onChangeText={handleQuantityChange}
                />
                <TouchableOpacity style={styles.quantityButton} onPress={increment}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={() => onSubmit()}>
                <Text style={styles.submitButtonText}>Submit</Text>
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
        color: '#333366'
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
        color: "#333366",
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#333366',
        borderRadius: 5,
        paddingHorizontal: 5,
        width: 50,
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
        marginTop: 10,
        backgroundColor: '#CC3399',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ItemaddCard;
