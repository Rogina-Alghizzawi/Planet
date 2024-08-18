import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const CustomCheckBox = ({ value, onValueChange }) => (
  <TouchableOpacity
    style={[styles.checkbox, value && styles.checkboxChecked]}
    onPress={onValueChange}
  >
    {value && <View style={styles.checkmark} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#CC3399', 
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, 
  },

  checkmark: {
    width: 14,
    height: 14,
    backgroundColor: '#333366',
    borderRadius: 2,
  },
});

export default CustomCheckBox;
