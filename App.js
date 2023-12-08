// App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Register from './components/Register';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_APP } from './firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import MedicationsListScreen from './components/Manufacturer/MedicationsListScreen';
import AddNewMedicineScreen from './components/Manufacturer/AddNewMedicineScreen';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';

const Stack = createNativeStackNavigator();

const insideStack = createNativeStackNavigator();

const outsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <insideStack.Navigator initialRouteName='Home'>
      <insideStack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <insideStack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
      <insideStack.Screen options={{ headerShown: false }} name="EditProfile" component={EditProfile} />
      <insideStack.Screen options={{ headerShown: false }} name="MedicationsList" component={MedicationsListScreen} />
      <insideStack.Screen options={{ headerShown: false }} name="AddNewMedicine" component={AddNewMedicineScreen} />
    </insideStack.Navigator>
  );
}

function OutSideLayout() {
  return (
    <outsideStack.Navigator initialRouteName='Welcome'>
      <outsideStack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
      <outsideStack.Screen name="Login" component={Login} />
      <outsideStack.Screen name="Register" component={Register} />
    </outsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    FIREBASE_APP;
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen options={{ headerShown: false }} name="InsideLayout" component={InsideLayout} />
        ) : (
          <Stack.Screen options={{ headerShown: false }} name="OutSideLayout" component={OutSideLayout} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
