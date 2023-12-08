//EditProfile.js
import React, { useState, useEffect, useFocusEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebase';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import Profile from './Profile';

const EditProfile = () => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');

  const navigation = useNavigation();

  const fetchUserData = async () => {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', FIREBASE_AUTH.currentUser.uid);

    try {
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setFullName(userData.fullName);
        setCompanyName(userData.companyName);
        setAddress(userData.adress);
        setRole(userData.role)
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

  const handleSaveChanges = async () => {
    const db = FIREBASE_DB;
    const userDocRef = doc(db, 'users', FIREBASE_AUTH.currentUser.uid);

    try {
      await setDoc(userDocRef, {
        fullName: fullName,
        companyName :companyName,
        adress: address,
        role: role
      });

      // Navigate back to the profile screen after saving changes
      navigation.goBack();
    } catch (error) {
      console.error('Error updating user data:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          value={companyName}
          onChangeText={(text) => setCompanyName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#2dbfc5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditProfile;
