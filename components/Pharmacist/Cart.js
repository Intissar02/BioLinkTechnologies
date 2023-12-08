// OrderHistory.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const OrderHistory = () => {
  const [OrderHistoryItems, setOrderHistoryItems] = useState([]);
  const navigation = useNavigation();

  const deleteProduct = async (medicineId) => {
    const firestore = getFirestore();
    const medicineRef = doc(firestore, 'Order', medicineId);
    try {
      await deleteDoc(medicineRef);
      fetchOrderHistoryItems();
    } catch (error) {
      console.error('Delete product error:', error.message);
      // Handle error
    }
  };

  useEffect(() => {
    // Fetch OrderHistory items from Firebase when the component mounts
    fetchOrderHistoryItems();
  }, []);

  const fetchOrderHistoryItems = async () => {
    try {
      const db = getFirestore();
      const q = query(
        collection(db, 'Order'),
        where('pharmacistId', '==', FIREBASE_AUTH.currentUser.uid),
        where('ordered', 'in', [2])
      );
      const querySnapshot = await getDocs(q);

      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setOrderHistoryItems(items);
    } catch (error) {
      console.error('Error fetching OrderHistory items:', error.message);
    }
  };

  const getStyleForValue = (value) => {
    let textStyle;

    // Define styles based on the const value
    if (value === 0) {
      textStyle = styles.styleForValue0;
    } else if (value === 1) {
      textStyle = styles.styleForValue1;
    } else{
      textStyle = styles.styleForValue2;
    }

    return textStyle;
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchOrderHistoryItems();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Order History:</Text>
        {OrderHistoryItems.length > 0 ? (
          <View style={{ flex: 1 }}>
            <FlatList style={{ flex: 1 }}
              data={OrderHistoryItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={getStyleForValue(item.ordered)}>
                  <View style={{ flex: 1 }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold' }}>Molecule : </Text>
                      <Text>{item.moleculeName}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold' }}>Medicine : </Text>
                      <Text>{item.medicineName}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold' }}>Quantity : </Text>
                      <Text>{item.quantity}</Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => deleteProduct(item.id)} style={{ flex: 0.3, padding: 8, alignItems: 'center' }}>
                      <Icon name="trash" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        ) : (
          <Text style={styles.emptyText}>Your Order History is empty</Text>
        )}

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'start',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 4
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  OrderHistoryItem: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 20,
    // borderColor: '#2dbfc5',
    padding: 10,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  styleForValue0:{
    borderColor: 'red',
    width: "100%",
    borderWidth: 1,
    borderRadius: 20,
    // borderColor: '#2dbfc5',
    padding: 10,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  styleForValue1:{
    borderColor: 'green',
    width: "100%",
    borderWidth: 1,
    borderRadius: 20,
    // borderColor: '#2dbfc5',
    padding: 10,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  styleForValue2:{
    borderColor: 'orange',
    width: "100%",
    borderWidth: 1,
    borderRadius: 20,
    // borderColor: '#2dbfc5',
    padding: 10,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default OrderHistory;