// PharmacyHome.js
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase';
import { useFocusEffect } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import ShortageList from '../ShortageList';

const PharmacyHome = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const fetchUserData = async () => {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', FIREBASE_AUTH.currentUser.uid);

    try {
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        setUserData(userDocSnapshot.data());
      } else {
        console.error('User document not found in Firestore');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

useEffect(() => {
  fetchUserData();
}, []);

useFocusEffect(
  React.useCallback(() => {
    fetchUserData();
  }, [])
);


  return (
    <SafeAreaView style={styles.Allcontainer}>
      <Image style={styles.image} source={require("../../assets/doctor.png")} />
      {userData ? (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to your pharmacist home page,</Text>
        <Text style={styles.title}>{userData.fullName} !</Text>

        <Text style={styles.subTitle}>What would you like to do?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Search')}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('NotificationsList')}>
              <Text style={styles.buttonText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Cart')}>
              <Text style={styles.buttonText}>Order History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ShortageList')}>
              <Text style={styles.buttonText}>Shortage List</Text>
            </TouchableOpacity>
          </View>
      </View>
       ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

export default PharmacyHome;

const styles = StyleSheet.create({
  Allcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  image: {
    width: 300,
    height: 300,
  },
  container: {
    display: "flex",
    width: "100%",
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    gap: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2dbfc5',
    paddingHorizontal: 80,
    paddingVertical: 10,
    borderRadius: 15,
    width: 'auto'
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    alignContent: 'center',
    textShadowColor: 'black',
    display: 'flex',
  },
  title: {
    justifyContent: 'space-around',
    fontSize: 18,
    alignContent: 'center',
    textShadowColor: 'black',
    display: 'flex',
  },
  subTitle: {
    justifyContent: 'space-around',
    fontSize: 15,
    fontWeight: 'bold',
    alignContent: 'center',
    justifyContent: "center",
    display: 'flex',
    marginBottom: 1,
  },
});