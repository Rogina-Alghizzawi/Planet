import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddedItemsPopup from './AddedItemsPopup';
import EditStorePopup from './EditStorePopup';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const StoreCard = () => {
  const navigation = useNavigation();
  const [addedItems, setAddedItems] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isEditPopupVisible, setEditPopupVisible] = useState(false);

  const [storeData, setStoreData] = useState({
    name: 'Planet Donut - Main Street',
    address: '123 Main Street',
    phone: '123-456-7890',
    openTime: '8:00 AM',
    closeTime: '8:00 PM',
  });

  const handleAddItems = (newItems) => {
    setAddedItems(prevItems => [...prevItems, ...newItems]);
  };

  const handleEditSave = (updatedData) => {
    setStoreData(updatedData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('D:/internship/planetDonut/assets/Clippathgroup.jpg')} 
            style={styles.image} 
          />
          <View style={styles.details}>
            <Text style={styles.title}>{storeData.name}</Text>
            <Text style={styles.address}>{storeData.address}</Text>
            <Text style={styles.phone}>{storeData.phone}</Text>
            <Text style={styles.hours}>
              Opens at: {storeData.openTime} | Closes at: {storeData.closeTime}
            </Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.addButton]}
            onPress={() => navigation.navigate('ItemsScreen', { onItemsAdded: handleAddItems })}
            accessibilityLabel="Add items"
            accessibilityHint="Navigate to the ItemsScreen to add items."
          >
            <MaterialIcons name="add" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.infoButton]}
            onPress={() => setPopupVisible(true)}
            accessibilityLabel="View added items"
            accessibilityHint={`View the ${addedItems.length} added items.`}
          >
            <Fontisto name="info" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.editButton]}
            onPress={() => setEditPopupVisible(true)}
            accessibilityLabel="Edit store details"
            accessibilityHint="Open the edit popup to update store details."
          >
            <FontAwesome6 name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <AddedItemsPopup 
        visible={isPopupVisible} 
        items={addedItems} 
        onClose={() => setPopupVisible(false)} 
      />
      <EditStorePopup 
        visible={isEditPopupVisible} 
        storeData={storeData} 
        onSave={handleEditSave} 
        onClose={() => setEditPopupVisible(false)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    overflow: 'hidden',
    padding: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    color:'#333366'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'#333366'

  },
  address: {
    fontSize: 16,
    marginBottom: 3,
    color:'#333366'

  },
  phone: {
    fontSize: 16,
    marginBottom: 3,
    color:'#333366'

  },
  hours: {
    fontSize: 14,
    color: '#666',
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    margin: 5,
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'center',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#FFCC00',
  },
  infoButton: {
    backgroundColor: '#333366',
  },
  editButton: {
    backgroundColor: '#CC3399',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default StoreCard;
