// MakeOrderPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase';

const MakeOrderPage = () => {
  const [quantity, setQuantity] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { medicine } = route.params;

  const confirmOrder = async () => {
    try {
      const db = getFirestore();
      const cartCollection = collection(db, 'Order');
      const medicineName = medicine.medicineName
      const moleculeName = medicine.moleculeName
      const manufacturerId = medicine.userId
      const pharmacistId = FIREBASE_AUTH.currentUser.uid

      await addDoc(cartCollection, {
        moleculeName: moleculeName,
        medicineName: medicineName,
        manufacturerId: manufacturerId,
        pharmacistId: pharmacistId,
        quantity: parseInt(quantity),
        ordered: 2
      });

      Alert.alert('Success', 'Order sent to manufacturer successfully');
      navigation.navigate('Cart'); 
    } catch (error) {
      console.error('Error making order:', error.message);
      Alert.alert('Error', 'Failed to make order');
    }
  };

  const Cancel = () => {
    navigation.navigate('Search');
  }



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make Order</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Molecule:</Text>
        <Text style={styles.infoText}>{medicine.moleculeName}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Medicine:</Text>
        <Text style={styles.infoText}>{medicine.medicineName}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Price:</Text>
        <Text style={styles.infoText}>{medicine.price} $</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
      />

      <TouchableOpacity style={styles.confirmButton} onPress={confirmOrder}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => Cancel()}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#2dbfc5',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#2dbfc5',
    width: "40%",
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
    width: "40%",
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MakeOrderPage;
