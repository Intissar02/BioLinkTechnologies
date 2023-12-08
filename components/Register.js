import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebase';

const Register = () => {
  const db = FIREBASE_DB;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [adress, setAdress] = useState('');
  const [selectedRole, setSelectedRole] = useState('pharmacist');
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const signUp = async () => {
    if (password !== confirmPassword) {
      ToastAndroid.show('Passwords do not match!', ToastAndroid.SHORT);
      return;
    }

    if (fullName.trim() === '') {
      showToast('Full Name is required!');
      return;
    }

    if (companyName.trim() === '') {
      showToast('Company Name is required!');
      return;
    }

    if (adress.trim() === '') {
      showToast('Address is required!');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password).then(async () => {
        const userDocRef = doc(db, 'users', FIREBASE_AUTH.currentUser.uid);
        await setDoc(userDocRef, {
          fullName: fullName,
          companyName: companyName,
          adress: adress,
          role: selectedRole,
        });
      });

      showToast('You are registered successfully!');
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.logo} source={require('../assets/register-user.png')} />
      <View style={styles.inputContainer}>
        <TextInput
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          placeholder="Full Name"
          style={styles.input}
        />
        <TextInput
          value={companyName}
          onChangeText={(text) => setCompanyName(text)}
          placeholder="Company Name"
          style={styles.input}
        />
        <TextInput value={adress} onChangeText={(text) => setAdress(text)} placeholder="Address" style={styles.input} />
        <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" style={styles.input} />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.input}
        />
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedRole} onValueChange={(itemValue) => setSelectedRole(itemValue)}>
            <Picker.Item label="Pharmacist" value="pharmacist" />
            <Picker.Item label="Manufacturer" value="manufacturer" />
          </Picker>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={signUp} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  inputContainer: {
    width: '80%',
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    marginVertical: 10,
  },
  pickerContainer: {
    borderRadius: 50,
    backgroundColor: 'white',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2dbfc5',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50,
  },
});

export default Register;
