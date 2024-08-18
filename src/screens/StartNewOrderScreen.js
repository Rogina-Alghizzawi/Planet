import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Modal, Pressable, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomCheckBox from './CustomCheckBox'; 

const itemsData = [
  {id: 1, name: 'Double Nutella', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
  {id: 2, name: 'Oreo', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
  {id: 3, name: 'Kinder & Nutella', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
  {id: 4, name: 'Vanilla Cake', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
  {id: 5, name: 'Ferrero Rocher', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
  {id: 6, name: 'Louts & Nutella', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
  {id: 7, name: 'Boston Cream', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
  {id: 8, name: 'Galaxy', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
  {id: 9, name: 'Eclair Custard', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
  {id: 10, name: 'Louts Filling', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
  {id: 11, name: 'Pistachio', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
];

const StartNewOrderScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState(itemsData.map(item => ({ ...item, selected: false })));
  const [selectAll, setSelectAll] = useState(false);
  const [shift, setShift] = useState('Morning');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectAllQuantity, setSelectAllQuantity] = useState('');
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [savedOrder, setSavedOrder] = useState(false); 

  useEffect(() => {
    const allSelected = items.every(item => item.selected);
    setSelectAll(allSelected);
  }, [items]);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectAllQuantity(''); 
    setItems(prevItems => prevItems.map(item => ({ ...item, selected: newSelectAll })));
  };

  const handleItemSelection = (id) => {
    setItems(prevItems => prevItems.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const handleQuantityChange = (id, delta) => {
    setItems(prevItems => prevItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ));
  };

  const handleQuantityInputChange = (id, text) => {
    const numericQuantity = parseInt(text, 10);
    const validQuantity = isNaN(numericQuantity) ? 0 : Math.max(0, numericQuantity);
    setItems(prevItems => prevItems.map(item =>
      item.id === id ? { ...item, quantity: validQuantity } : item
    ));
  };

  const handleSelectAllQuantityChange = (text) => {
    const numericQuantity = parseInt(text, 10);
    const validQuantity = isNaN(numericQuantity) ? 0 : Math.max(0, numericQuantity);
    setSelectAllQuantity(validQuantity.toString());
    setItems(prevItems => prevItems.map(item =>
      item.selected ? { ...item, quantity: validQuantity } : item
    ));
  };

  const handleIncrementSelectAllQuantity = () => {
    const newQuantity = Math.max(0, parseInt(selectAllQuantity, 10) + 1);
    setSelectAllQuantity(newQuantity.toString());
    handleSelectAllQuantityChange(newQuantity.toString());
  };

  const handleDecrementSelectAllQuantity = () => {
    const newQuantity = Math.max(0, parseInt(selectAllQuantity, 10) - 1);
    setSelectAllQuantity(newQuantity.toString());
    handleSelectAllQuantityChange(newQuantity.toString());
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSelectedItems = () => {
    return items.filter(item => item.selected && item.quantity > 0);
  };

  const numberOfOrders = getSelectedItems().length;

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.checkboxContainer}>
        <CustomCheckBox
          value={item.selected}
          onValueChange={() => handleItemSelection(item.id)}
        />
      </View>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.id, -1)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.quantityInput}
          value={item.quantity.toString()}
          keyboardType='numeric'
          onChangeText={(text) => handleQuantityInputChange(item.id, text)}
          maxLength={4}
        />
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.id, 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search items..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <View style={styles.dropdownAndSelectAllContainer}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Shift:</Text>
          <Picker
            selectedValue={shift}
            style={styles.picker}
            onValueChange={(itemValue) => setShift(itemValue)}
          >
            <Picker.Item label="Morning" value="Morning" />
            <Picker.Item label="Night" value="Night" />
            <Picker.Item label="Support" value="Support" />
          </Picker>
        </View>
        <View style={styles.selectAllContainer}>
          <CustomCheckBox
            value={selectAll}
            onValueChange={handleSelectAll}
          />
          <Text style={styles.selectAllText}>Select All</Text>
          {selectAll && (
            <View style={styles.selectAllQuantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleDecrementSelectAllQuantity}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.selectAllQuantityInput}
                value={selectAllQuantity}
                keyboardType='numeric'
                placeholder="Quantity for all"
                onChangeText={handleSelectAllQuantityChange}
                maxLength={4}
              />
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleIncrementSelectAllQuantity}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.add}
          onPress={() => {
            setSavedOrder(true);
          }}
        >
          <Text style={styles.buttonText}>Add Order</Text>
        </TouchableOpacity>
        {savedOrder && (
          <TouchableOpacity
            style={styles.review}
            onPress={() => {
              const selectedItems = getSelectedItems();
              if (selectedItems.length > 0) {
                navigation.navigate('ReviewOrderScreen', { selectedItems });
              }
            }}
            disabled={numberOfOrders === 0}
          >
            <Text style={styles.buttonText}>Review ({numberOfOrders})</Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        transparent={true}
        visible={reviewModalVisible}
        onRequestClose={() => setReviewModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Review Your Orders</Text>
            {getSelectedItems().length > 0 ? (
              <FlatList
                data={getSelectedItems()}
                renderItem={({ item }) => (
                  <View style={styles.modalItemContainer}>
                    <Text style={styles.modalItemText}>{item.name} x {item.quantity}</Text>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.modalListContainer}
              />
            ) : (
              <Text style={styles.emptyOrdersText}>No orders to review.</Text>
            )}
            <Pressable
              style={styles.closeButton}
              onPress={() => setReviewModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#F9F9F9',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    height: 35,
    paddingHorizontal: 8,
    borderColor: '#333366',
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 8,
    fontSize: 14,
  },
  dropdownAndSelectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '90%',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  selectAllText: {
    fontSize: 14,
    color: '#333366',
    marginLeft: 8,
  },
  selectAllQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  selectAllQuantityInput: {
    width: 60,
    height: 35,
    borderColor: '#333366',
    borderWidth: 1,
    borderRadius: 4,
    textAlign: 'center',
    marginHorizontal: 8,
    fontSize: 14,
  },
  label: {
    marginRight: 8,
    fontSize: 14,
    color: '#333366',
  },
  picker: {
    flex: 1,
    height: 35,
    borderColor: '#333366',
    borderWidth: 1,
  },
  listContainer: {
    paddingBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderColor: '#333366',
    borderWidth: 1,
  },
  checkboxContainer: {
    marginRight: 8,
  },
  itemImage: {
    width: 35,
    height: 35,
    borderRadius: 4,
    marginRight: 8,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: '#333366',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 25,
    height: 25,
    backgroundColor: '#FFCC00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333366',
  },
  modalItemContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333366',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#CC3399',
    borderRadius: 4,
  },
  closeButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  emptyOrdersText: {
    fontSize: 14,
    color: '#FFCC00',
    textAlign: 'center',
  },
  add: {
    backgroundColor: '#CC3399',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    width: 150,
  },
  review: {
    backgroundColor: '#FFCC00', 
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    width: 150,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default StartNewOrderScreen;
