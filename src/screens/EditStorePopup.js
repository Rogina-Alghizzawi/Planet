import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Dialog, Portal, Text, Button } from 'react-native-paper';

const EditStorePopup = ({ visible, storeData, onSave, onClose }) => {
  const [name, setName] = useState(storeData.name);
  const [address, setAddress] = useState(storeData.address);
  const [phone, setPhone] = useState(storeData.phone);
  const [openTime, setOpenTime] = useState(storeData.openTime);
  const [closeTime, setCloseTime] = useState(storeData.closeTime);

  const handleSave = () => {
    onSave({ name, address, phone, openTime, closeTime });
    onClose();
  };

  return (
    <Portal>
      <Dialog 
        visible={visible} 
        onDismiss={onClose} 
        style={styles.dialog} 
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <Text style={styles.title}>Edit Store Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Store Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              style={styles.input}
              placeholder="Open Time"
              value={openTime}
              onChangeText={setOpenTime}
            />
            <TextInput
              style={styles.input}
              placeholder="Close Time"
              value={closeTime}
              onChangeText={setCloseTime}
            />
            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
                Save
              </Button>
              <Button 
                mode="contained" 
                onPress={onClose} 
                style={styles.cancelButton} 
                labelStyle={styles.cancelButtonText} 
              >
                Cancel
              </Button>
            </View>
          </View>
        </ScrollView>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: 'white', 
    borderRadius: 10,
  },
  container: {
    padding: 20,
    backgroundColor: 'white', 
    borderRadius: 10,
  },
  scrollView: {
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333366',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderColor: '#ddd', 
    borderWidth: 1, 
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#333366', 
    marginRight: 10,
    width:'29%'
  },
  cancelButton:{
    backgroundColor: '#CC3399',
  },
  cancelButtonText: {
    color: '#FFF', 
  },
});

export default EditStorePopup;
