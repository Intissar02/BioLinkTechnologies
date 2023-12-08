//MedicationsListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getFirestore, collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../firebase';
import { useFocusEffect } from '@react-navigation/native';

const MedicationsListScreen = () => {
  const [medicine, setMedicine] = useState([]);
  const navigation = useNavigation();

  const fetchMedicine = async () => {
    const db = getFirestore();
    const q = query(collection(db, 'medicine'), where('userId', '==', FIREBASE_AUTH.currentUser.uid));
    const medicineSnapshot = await getDocs(q);
    const medicineList = [];
    medicineSnapshot.forEach((doc) => {
      medicineList.push({ id: doc.id, ...doc.data() });
    });
    setMedicine(medicineList);
  };

  const confirmDeleteProduct = (medicineId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this medicine?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteProduct(medicineId) },
      ],
      { cancelable: false }
    );
  };

  const deleteProduct = async (medicineId) => {
    const firestore = getFirestore();
    const medicineRef = doc(firestore, 'medicine', medicineId);

    try {
      await deleteDoc(medicineRef);
      fetchMedicine();
    } catch (error) {
      console.error('Delete product error:', error.message);
      // Handle error
    }
  };

  useEffect(() => {
    fetchMedicine();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchMedicine();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => { navigation.navigate('AddNewMedicine') }} style={styles.addButton}>
        <Icon name="plus" size={20} color="white" />
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Add a New Medicine</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Your Medicine List</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableCell}>Medicine Name</Text>
        <Text style={styles.tableCell}>Molecule Name</Text>
        <Text style={styles.tableCell}>Price</Text>
        <Text style={styles.tableCell}>Availability</Text>
        <Text style={{flex: 0.3,padding: 8 , textAlign: 'center'}}></Text>
      </View>
      <FlatList
        data={medicine}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.medicineName}</Text>
            <Text style={styles.tableCell}>{item.moleculeName}</Text>
            <Text style={styles.tableCell}>{item.price} $</Text>
            <Text style={styles.tableCell}>{item.availability ? 'Available' : 'Not Available'}</Text>
            <TouchableOpacity onPress={() => confirmDeleteProduct(item.id)} style={{flex: 0.3,padding: 8 , alignItems: 'center'}}>
              <Icon name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  addButton: {
    paddingVertical: 10,
    width: "40%",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    backgroundColor: "#2dbfc5",
    marginTop: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  tableCell: {
    flex: 1,
    padding: 8,
  },
});

export default MedicationsListScreen;