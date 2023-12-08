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

      <TouchableOpacity style={styles.aboutButton} onPress={handleAboutPress}>
        <Text style={styles.aboutButtonText}>About</Text>
      </TouchableOpacity>


      <Modal animationType="slide" transparent={true} visible={aboutModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>About BioLink Technologies</Text>
            <Text style={styles.modalText}>Welcome to BioLinkTechnologies, the revolutionary app that bridges the communication gap between pharmaceutical manufacturers and pharmacists. Our platform is designed to streamline the supply chain, enhance collaboration, and ensure efficient management of medicines.</Text>

            <Text style={styles.modalSubtitle}>Key Features:</Text>

            <Text style={styles.modalSubtitle}>Effortless Communication:</Text>
            <Text style={styles.modalText}>Manufacturer-Pharmacist Interaction: Seamlessly connect with pharmaceutical manufacturers, fostering communication for streamlined operations.</Text>
            <Text style={styles.modalText}>Real-time Updates: Receive instant updates on product availability, new releases, and promotional offers.</Text>

            <Text style={styles.modalSubtitle}>Advanced Inventory Management:</Text>
            <Text style={styles.modalText}>Add to Cart: Effortlessly manage your inventory by adding medicines to your cart directly from manufacturers' catalogs.</Text>
            <Text style={styles.modalText}>Customized Orders: Tailor orders to your specific pharmacy needs, optimizing stock levels.</Text>

            <Text style={styles.modalSubtitle}>Comprehensive Medicine Database:</Text>
            <Text style={styles.modalText}>Add New Medicines: Easily add new medicines to your inventory, expanding your product offerings.</Text>
            <Text style={styles.modalText}>Detailed Medicine Information: Access comprehensive details about each medicine, including dosage, side effects, and manufacturer information.</Text>

            <Text style={styles.modalSubtitle}>Secure Notifications:</Text>
            <Text style={styles.modalText}>Notification Alerts: Receive timely notifications for order updates, new product releases, and important announcements.</Text>

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
  aboutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  aboutSubtitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  aboutText: {
    fontSize: 12,
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
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  modalText: {
    marginTop: 10,
  },

});

export default Welcome;