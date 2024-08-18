import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Pressable, TextInput, Image, TouchableOpacity } from 'react-native';

const ReviewOrderScreen = ({ route, navigation }) => {
  const [editedItems, setEditedItems] = useState(route.params.selectedItems); 
  const [editingMode, setEditingMode] = useState({}); 

  const handleQuantityChange = (id, newQuantity) => {
    setEditedItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
  };

  const handleNameChange = (id, newName) => {
    setEditedItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setEditedItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const toggleEditingMode = (id) => {
    setEditingMode(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        {editingMode[item.id] ? (
          <>
            <TextInput
              style={styles.itemNameInput}
              value={item.name}
              onChangeText={(text) => handleNameChange(item.id, text)}
            />
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => handleQuantityChange(item.id, item.quantity - 1)}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                value={item.quantity.toString()}
                keyboardType="numeric"
                onChangeText={(text) => handleQuantityChange(item.id, parseInt(text, 10))}
              />
              <TouchableOpacity onPress={() => handleQuantityChange(item.id, item.quantity + 1)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
          </>
        )}
      </View>
      <View style={styles.actionButtons}>
        <Pressable style={styles.editButton} onPress={() => toggleEditingMode(item.id)}>
          <Text style={styles.editButtonText}>{editingMode[item.id] ? 'Save' : 'Edit'}</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={() => handleDeleteItem(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Review Your Order</Text>
      <FlatList
        data={editedItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.confirmButton}
          onPress={() => {
            navigation.goBack(); 
          }}
        >
          <Text style={styles.buttonText}>Confirm Order</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F4F4',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemNameInput: {
    fontSize: 16,
    color: '#333366',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    color: '#333366',
    marginBottom: 8,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#333366',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    width: 40,
    height: 35,
    textAlign: 'center',
    borderColor: '#333366',
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 8,
    fontSize: 14,
  },
  quantityButton: {
    fontSize: 16,
    color: '#333366',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FFCC00',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#CC3399',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#333366',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  }
});

export default ReviewOrderScreen;
