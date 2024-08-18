import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Pressable, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
const OrdersScreen = ({ navigation }) => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderedOn: '2024-08-15',
      factoryPhone: '+1234567890',
      quantity: 10,
      note: 'Urgent order, please prioritize.',
      status: 'Pending',
      items: [
        'Boston Cream - 1 piece',
        'Ferrero Rocher - 1 piece',
        'Lotus Filling - 1 piece',
        'Nutella Shell - 1 piece',
      ],
    },
    {
      id: '2',
      orderedOn: '2024-08-14',
      factoryPhone: '+0987654321',
      quantity: 5,
      note: 'Regular order.',
      status: 'Delivered',
      items: [
        'Caramel Crunch - 2 pieces',
        'Milk Chocolate - 3 pieces',
      ],
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleOrderPress = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const filteredOrders = orders.filter(order =>
    selectedStatus === 'All' ? true : order.status === selectedStatus
  );

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOrderPress(item)} style={styles.orderItem}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.textHeader}>Ordered On:</Text>
          <Text style={styles.textValue}>{item.orderedOn}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.textHeader}>Factory Phone:</Text>
          <Text style={styles.textValue}>{item.factoryPhone}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.textHeader}>Quantity:</Text>
          <Text style={styles.textValue}>{item.quantity}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.textHeader}>Note:</Text>
          <Text style={styles.textValue}>{item.note}</Text>
        </View>
      </View>
      <Text style={styles.textHeader}>Status:</Text>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => handleStatusChange(item.id, item.status === 'Pending' ? 'Delivered' : 'Pending')}
      >
        <Text style={styles.pickerText}>{item.status}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StartNewOrderScreen')}
        >
          <Text style={styles.buttonText}>Start New Order</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedStatus}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedStatus(itemValue)}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="Delivered" value="Delivered" />
        </Picker>
      </View>
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {selectedOrder && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeaderContainer}>
                <Text style={styles.modalHeader}>{selectedOrder.factoryPhone}</Text>
                <Text style={styles.modalSubHeader}>{selectedOrder.orderedOn}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButton}>X</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.scrollView}>
                <View style={styles.modalBody}>
                  <View style={styles.promoContainer}>
                    <Image source={require('C:/Users/Rojena/Desktop/Planet/assets/Double Nutella.jpg')} style={styles.promoImage} />
                  </View>
                  <View style={styles.itemsContainer}>
                    {selectedOrder.items.map((item, index) => (
                      <Text key={index} style={styles.itemText}>{item}</Text>
                    ))}
                  </View>
                </View>
              </ScrollView>
              <Pressable
                style={[styles.button, styles.modalButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F4F4',
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#333366',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 100,
  },
  orderItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  textHeader: {
    fontWeight: 'bold',
    color: '#CC3399',
    marginBottom: 4,
  },
  textValue: {
    color: '#333366',
    marginBottom: 10,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFCC00',
    borderColor: '#DDD',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 16,
    color: '#333366',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '90%',
    padding: 10,
  },
  modalHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  modalHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#CC3399',
  },
  modalSubHeader: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  closeButton: {
    fontSize: 18,
    color: '#CC3399',
  },
  scrollView: {
    maxHeight: 300,
  },
  modalBody: {
    padding: 10,
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  promoImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  itemsContainer: {
    marginTop: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333366',
    marginBottom: 5,
  },
  modalButton: {
    marginTop: 20,
  },
});

export default OrdersScreen;
