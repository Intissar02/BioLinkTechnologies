// NotificationsListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NotificationsListScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  const handleSaveChanges = async (itemId, num) => {
    const db = getFirestore();
    const docRef = doc(db, 'Order', itemId);
  
    // Update the document
    try {
      await updateDoc(docRef, {
        ordered: num,
        // Add more fields as needed
      });
      fetchCartItems();
      console.log('Document successfully updated!');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  useEffect(() => {
    // Fetch cart items from Firebase when the component mounts
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const db = getFirestore();
      const q = query(
        collection(db, 'Order'),
        where('manufacturerId', '==', FIREBASE_AUTH.currentUser.uid),
        where('ordered', 'in', [2])
      );
      const querySnapshot = await getDocs(q);

      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
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
      fetchCartItems();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Notifications:</Text>
        {cartItems.length > 0 ? (
          <View style={{ flex: 1 }}>
            <FlatList style={{ flex: 1 }}
              data={cartItems}
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
                    <TouchableOpacity onPress={() => handleSaveChanges(item.id,1)} style={{ flex: 0.3, padding: 8, alignItems: 'center' }}>
                      <Icon name="check-circle" size={20} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSaveChanges(item.id,0)} style={{ flex: 0.3, padding: 8, alignItems: 'center' }}>
                      <Icon name="times-circle" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        ) : (
          <Text style={styles.emptyText}>You don't have any new notifications!</Text>
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
  cartItem: {
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

export default NotificationsListScreen;
