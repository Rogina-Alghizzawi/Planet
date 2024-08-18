import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
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
    },
    {
      id: '2',
      orderedOn: '2024-08-14',
      factoryPhone: '+0987654321',
      quantity: 5,
      note: 'Regular order.',
      status: 'Delivered',
    },
  ]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = orders.filter(order =>
    selectedStatus === 'All' ? true : order.status === selectedStatus
  );

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
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
      <Picker
        selectedValue={item.status}
        style={styles.picker}
        onValueChange={(itemValue) => handleStatusChange(item.id, itemValue)}
      >
        <Picker.Item label="Pending" value="Pending" />
        <Picker.Item label="Delivered" value="Delivered" />
        <Picker.Item label="Canceled" value="Canceled" />
      </Picker>
    </View>
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
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedStatus}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedStatus(itemValue)}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="Delivered" value="Delivered" />
          <Picker.Item label="Canceled" value="Canceled" />
        </Picker>
      </View>
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  dropdownContainer: {
    marginBottom: 20,
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
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFCC00', 
    borderColor: '#DDD',
    borderWidth: 1,
  },
});

export default OrdersScreen;
