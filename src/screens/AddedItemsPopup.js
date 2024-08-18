import React from 'react';
import { Modal, View, Text, Image, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Info = ({ visible, items, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.title}>Added Items</Text>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {items.map(item => (
              <View key={item.id} style={styles.item}>
                <Image 
                  source={require('D:/internship/planetDonut/assets/Double Nutella.jpg')}  
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '80%', 
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    maxHeight: '70%', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333366',
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#333366',
    borderRadius: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    color: 'white',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#CC3399',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Info;
