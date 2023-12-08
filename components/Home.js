//Home
import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FIREBASE_AUTH } from '../firebase'
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PharmacyHome from './Pharmacist/PharmacyHome';
import ManufacturerHome from './Manufacturer/ManufacturerHome';
import Profile from './Profile';
import EditProfile from './EditProfile'
import OrderHistoryScreen from '../components/Manufacturer/OrderHistoryScreen';
import NotificationsListScreen from '../components/Manufacturer/NotificationsListScreen';
import MedicationsListScreen from '../components/Manufacturer/MedicationsListScreen';
import MakeOrderPage from './Pharmacist/MakeOrderPage';
import NotificationsList from './Pharmacist/NotificationsList';
import Search from './Pharmacist/Search';
import Cart from './Pharmacist/Cart';
import { TouchableOpacity, ScrollView } from 'react-native';
import AddNewMedicineScreen from './Manufacturer/AddNewMedicineScreen';
import ShortageList from './ShortageList';

const Tab = createBottomTabNavigator()
const TabPharmacy = createBottomTabNavigator()
const TabManufacturer = createBottomTabNavigator()
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "white"
  }
}

function PharmacistLayout() {
  return (
    <TabPharmacy.Navigator screenOptions={screenOptions}>
      <TabPharmacy.Screen options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon name='home' size={24} color={focused ? "#2dbfc5" : "black"} />
            </View>
          )
        }
      }} name="PharmacyHome"
        component={PharmacyHome} />

      <TabPharmacy.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon name='user' size={24} color={focused ? '#2dbfc5' : 'black'} />
              </View>
            );
          },
        }}
        name='Profile'
        component={Profile}
      />
      <TabPharmacy.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon name='columns' size={24} color={focused ? '#2dbfc5' : 'black'} />
              </View>
            );
          },
        }}
        name='ShortageList'
        component={ShortageList}
      />

      <TabPharmacy.Screen options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='bars' size={24} color={focused ? '#2dbfc5' : 'black'} />
          </View>
        ),
      }} name='Cart' component={Cart} />
      <TabPharmacy.Screen options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='bell' size={24} color={focused ? '#2dbfc5' : 'black'} />
          </View>
        ),
      }} name='NotificationsList' component={NotificationsList} />
      <TabPharmacy.Screen options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='search' size={24} color={focused ? '#2dbfc5' : 'black'} />
          </View>
        ),
      }} name='Search' component={Search} />
      {/* <TabPharmacy.Screen name='MakeOrderPage' component={MakeOrderPage} /> */}
    </TabPharmacy.Navigator>
  );
}

function ManufacturerLayout({ navigation }) {
  return (
    <TabManufacturer.Navigator screenOptions={screenOptions}>
      <TabManufacturer.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon name='home' size={24} color={focused ? '#2dbfc5' : 'black'} />
            </View>
          ),
        }}
        name='ManufacturerHome'
        component={ManufacturerHome}
      />
      <TabManufacturer.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon name='user' size={24} color={focused ? '#2dbfc5' : 'black'} />
            </View>
          ),
        }}
        name='Profile'
        component={Profile}
      />
      <TabManufacturer.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon name='columns' size={24} color={focused ? '#2dbfc5' : 'black'} />
              </View>
            );
          },
        }}
        name='ShortageList'
        component={ShortageList}
      />
      <TabManufacturer.Screen options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='history' size={24} color={focused ? '#2dbfc5' : 'black'} />
          </View>
        ),
      }} name='OrderHistory' component={OrderHistoryScreen} />
      <TabManufacturer.Screen options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='bell' size={24} color={focused ? '#2dbfc5' : 'black'} />
          </View>
        ),
      }} name='NotificationsList' component={NotificationsListScreen} />
      <TabManufacturer.Screen options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='bars' size={24} color={focused ? '#2dbfc5' : 'black'} />
          </View>
        ),
      }} name='MedicationsList' component={MedicationsListScreen} />
      <TabManufacturer.Screen
        name='AddNewMedicine'
        component={AddNewMedicineScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddNewMedicine')}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon name='plus' size={24} color={focused ? '#2dbfc5' : 'black'} />
            </TouchableOpacity>
          ),
        }}
      />

    </TabManufacturer.Navigator>
  );
}


const Home = () => {

  const auth = getAuth()
  const db = getFirestore();
  const [user, setUser] = useState(null);
  const userRole = "";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            setUser(userDocSnapshot.data());
          } else {
            console.error('User document not found in Firestore');
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth, db]);


  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator screenOptions={{ tabBarStyle: { display: 'none' } }}>
        {user?.role == "pharmacist" ?
          (<Tab.Screen name="PharmacistLayout" options={{ headerShown: false }} component={PharmacistLayout} />
          ) : (
            <Tab.Screen name="ManufacturerLayout" options={{ headerShown: false }} component={ManufacturerLayout} />
          )}
        <Tab.Screen name="EditProfile" options={{ headerShown: false }} component={EditProfile} />
        <Tab.Screen name="MakeOrderPage" options={{ headerShown: false }} component={MakeOrderPage} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Home

const styles = StyleSheet.create({})