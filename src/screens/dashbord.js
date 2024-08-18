
import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ItemCard from './items';

const Dashboard = () => {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState('Donuts');
  const [items, setItems] = useState([
    { name: 'Double Nutella', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
    { name: 'Oreo', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
    { name: 'Kinder & Nutella', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
    { name: 'Vanilla Cake', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
    { name: 'Ferrero Rocher', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
    { name: 'Louts & Nutella', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
    { name: 'Boston Cream', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
    { name: 'Galaxy', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
    { name: 'Eclair Custard', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
    { name: 'Louts Filling', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
    { name: 'Pistachio', quantity: 0, image: require('D:/internship/Donuts/assets/Double Nutella.jpg') },
  ]);

  const sections = [
    { key: 'Donuts' },
    { key: 'Drinks' },
    { key: 'Offers' },
    { key: 'Special' },
    { key: 'Ice Cream' },
  ];

  const handleQuantityChange = (index, newQuantity) => {
    setItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.navItem, item.key === activeSection && styles.activeNavItem]}
            onPress={() => {
              setActiveSection(item.key);
              navigation.navigate(item.key);
            }}
          >
            <Text style={styles.navText}>{item.key}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        style={styles.navBar}
      />

      <ScrollView>
        <View style={styles.itemsGrid}>
          {items.map((item, index) => (
            <ItemCard 
              key={index} 
              itemName={item.name} 
              initialQuantity={item.quantity} 
              image={item.image}
              onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  navBar: {
    marginBottom: 10,
  },
  navItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#333366',
    borderRadius: 20,
    marginRight: 10,
  },
  activeNavItem: {
    backgroundColor: '#CC3399',
  },
  navText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default Dashboard;
