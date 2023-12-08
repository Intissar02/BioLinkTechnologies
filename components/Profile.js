// components/Profile.js
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

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

  const handleLogout = () => {
    FIREBASE_AUTH.signOut();
  };

  const handleEditProfile = () => {
    // Navigate to the edit profile screen
    navigation.navigate('EditProfile');
  };

  return (
    <SafeAreaView style={styles.container}>
      {userData ? (
        <View style={styles.profileContainer}>
          <Text style={styles.title}>User Profile</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.label}>Full Name:</Text>
              <Text style={styles.value}>{userData.fullName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Company Name:</Text>
              <Text style={styles.value}>{userData.companyName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{userData.adress}</Text>
            </View>
            <View style={styles.rowLast}>
              <Text style={styles.label}>Role:</Text>
              <Text style={styles.value}>{userData.role}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleEditProfile} style={styles.editProfileButton}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    display: 'flex',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 18,
  },
  rowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: '#555',
  },
  editProfileButton: {
    backgroundColor: '#2dbfc5',
    width: '40%',
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: 'red',
    width: '40%',
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Profile;
