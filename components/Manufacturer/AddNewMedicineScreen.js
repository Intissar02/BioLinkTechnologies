//AddNewMedicineScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ToastAndroid } from 'react-native';
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';


const AddNewMedicineScreen = () => {
  const [medicineName, setMedicineName] = useState('');
  const [moleculeName, setMoleculeName] = useState('');
  const [inStock, setInStock] = useState('');
  const [selectedAvailability, setAvailability] = useState('available');

  const navigation = useNavigation()

  const user = FIREBASE_AUTH.currentUser;


  const addNewMedicine = async () => {
    if (medicineName.trim() === '') {
      ToastAndroid.show('Medecine name is required!', ToastAndroid.SHORT);
      return;
    }
    if (moleculeName.trim() === '') {
      ToastAndroid.show('Molecule name is required!', ToastAndroid.SHORT);
      return;
    }
    if (inStock.trim() === '') {
      ToastAndroid.show('Stock is required!', ToastAndroid.SHORT);
      return;
    }
    try {
      const db = getFirestore();
      const medicineCollection = collection(db, 'medicine');
      await addDoc(medicineCollection, {
        medicineName,
        moleculeName,
        price: parseInt(inStock),
        availability: selectedAvailability,
        userId: user.uid,
      });
      navigation.navigate('MedicationsList')
      Alert.alert('Success', 'New medicine added successfully');
    } catch (error) {
      console.error('Error adding new medicine:', error.message);
      Alert.alert('Error', 'Failed to add new medicine');
    }
  };

  return (
    <SafeAreaView style={styles.Allcontainer}>

      <Text style={styles.title}>Add New Medicine</Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput value={medicineName} onChangeText={text => setMedicineName(text)} placeholder='Medicine Name' style={styles.input} />
          <TextInput value={moleculeName} onChangeText={text => setMoleculeName(text)} placeholder='Molecule Name' style={styles.input} />
          <TextInput value={inStock} onChangeText={text => setInStock(text)} placeholder='Price in $' keyboardType='number-pad' style={styles.input} />
          <View style={{ borderRadius: 50, backgroundColor: 'white', width: '100' }}>
            <Picker
              selectedValue={selectedAvailability}
              onValueChange={(itemValue) => setAvailability(itemValue)}
            >
              <Picker.Item label="Available" value={true} />
              <Picker.Item label="Unavailable" value={false} />
            </Picker>
          </View>

          <TouchableOpacity style={styles.button} onPress={addNewMedicine}>
            <Text style={styles.buttonText}>Add Medicine</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View >
        <TouchableOpacity onPress={() => navigation.navigate('MedicationsList')} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" />
          <Text style={styles.navTitle}>Medications List</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Allcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2dbfc5', // Change the background color as per your preference
    paddingHorizontal: 16,
    height: 60, // Adjust the height based on your design
    borderBottomWidth: 1,
    borderBottomColor: 'black', // Change the border color as per your preference
  },
  backButton: {
    marginRight: 10,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: "red"
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Change the text color as per your preference
  },
  container: {
    display: "flex",
    width: "100%",
    alignItems: 'center'
  },
  title: {
    fontSize: 35,
    alignContent: 'center',
    fontWeight: 'bold',
    textShadowColor: 'black'
  },
  inputContainer: {
    width: "80%",
    display: "flex",
    gap: 12,
    marginBottom: 20
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    gap: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    alignContent: 'center',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#2dbfc5',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50
  }
})
export default AddNewMedicineScreen;
