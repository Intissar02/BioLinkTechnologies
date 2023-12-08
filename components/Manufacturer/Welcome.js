//welcome.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();
  const [aboutModalVisible, setAboutModalVisible] = useState(false);

  const handleAboutPress = () => {
    setAboutModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcome}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>Let's Get Started!</Text>
        <Image style={{ width: 200, height: 200 }} source={require('../assets/welcome.png')} />

        <View style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            <Text>You don't have an Account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ color: 'red' }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* About button in the top right corner */}
      <TouchableOpacity style={styles.aboutButton} onPress={handleAboutPress}>
        <Text style={styles.aboutButtonText}>About</Text>
      </TouchableOpacity>

      {/* About Modal */}
      <Modal animationType="slide" transparent={true} visible={aboutModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>About BioLink Technologies</Text>
            {/* Add your app information and guidelines here */}
            <Text>Your app description and information go here.</Text>
            <Text>Usage guidelines and instructions.</Text>
            {/* ... */}
            <TouchableOpacity onPress={() => setAboutModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.aboutButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2dbfc5',
    flex: 1,
  },
  welcome: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'white',
    width: '60%',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2dbfc5',
    fontSize: 20,
  },
  aboutButton: {
    position: 'absolute',
    top: 30,
    right: 16,
    padding: 8,
    backgroundColor: 'white', 
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  aboutButtonText: {
    color: '#2dbfc5',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
    width: '80%',
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
});

export default Welcome;