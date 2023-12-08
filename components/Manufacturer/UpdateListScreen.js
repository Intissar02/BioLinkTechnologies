// UpdateListScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

const UpdateListScreen = () => {
  const [medicineName, setMedicineName] = useState('');
  const [moleculeName, setMoleculeName] = useState('');
  const [inStock, setInStock] = useState('');
  const [availability, setAvailability] = useState('');

  const updateList = async () => {
    try {
      const db = getFirestore();
      const medicineDocRef = doc(db, 'medicine', 'ZrngWYyqEG5lTqETL5SV');
      await setDoc(medicineDocRef, {
        medicineName,
        moleculeName,
        inStock: parseInt(inStock),
        availability: availability.toLowerCase() === 'true',
      });
      Alert.alert('Success', 'Medicine list updated successfully');
    } catch (error) {
      console.error('Error updating medicine list:', error.message);
      Alert.alert('Error', 'Failed to update medicine list');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Update Medicine List</Text>
      <TextInput
        style={styles.input}
        placeholder="Medicine Name"
        value={medicineName}
        onChangeText={setMedicineName}
      />
      <TextInput
        style={styles.input}
        placeholder="Molecule Name"
        value={moleculeName}
        onChangeText={setMoleculeName}
      />
      <TextInput
        style={styles.input}
        placeholder="In Stock"
        keyboardType="numeric"
        value={inStock}
        onChangeText={setInStock}
      />
      <TextInput
        style={styles.input}
        placeholder="Availability (true/false)"
        value={availability}
        onChangeText={setAvailability}
      />
      <TouchableOpacity style={styles.button} onPress={updateList}>
        <Text style={styles.buttonText}>Update List</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UpdateListScreen;
