// SearchPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const searchMedicines = async () => {
    try {
      const db = getFirestore();
      const medicinesRef = collection(db, 'medicine');
      const searchQueryLower = searchQuery.toLowerCase();

      // Create a query for case-insensitive substring search
      const q = query(
        medicinesRef,
        where('medicineName', '>=', searchQuery),
        where('medicineName', '<=', searchQuery + '\uf8ff')
      );

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => doc.data());

      setSearchResults(results);
    } catch (error) {
      console.error('Error searching for medicines:', error.message);
    }
  };

  const handleMakeOrderPage = (medicine) => {
    // Navigate to the MakeOrderPage with the selected medicine details
    navigation.navigate('MakeOrderPage', { medicine });
  };


  useFocusEffect(
    React.useCallback(() => {
      searchMedicines();
    }, [])
  );
  

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require("../../assets/plus.png")} />
      <View>
        <Text style={styles.title}>Search by Medicine Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Medicine Name"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.searchButton} onPress={searchMedicines}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.title}>Results:</Text>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.moleculeName}
          renderItem={({ item }) => (
            <View style={styles.resultRow}>
              <Text style={styles.resultText}>{item.moleculeName}</Text>
              <Text style={styles.resultText}>{item.medicineName}</Text>

              {/* Make Order button for each entry */}
              <TouchableOpacity
                style={styles.makeOrderButton}
                onPress={() => handleMakeOrderPage(item)}
              >
                <Text style={styles.buttonText}>Make Order</Text>
              </TouchableOpacity>
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={styles.headerRow}>
              <Text style={styles.headerText}>Molecule Name</Text>
              <Text style={styles.headerText}>Medicine Name</Text>
              <Text style={styles.headerText}> </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 60,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 200,
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 35,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 100,
    width: '100%',
    textAlign: 'center'
  },
  searchButton: {
    backgroundColor: '#2dbfc5',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    gap: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlignVertical: 'center'
  },
  resultsContainer: {
    width: '100%',
    height: '100%',
    paddingVertical: 100,
    marginTop: -70
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#2dbfc5',
    paddingVertical: 18,
  },
  headerText: {
    flex: 1,
    color: '#2dbfc5',
    fontWeight: 'bold',
  },
  resultText: {
    flex: 1,
    textAlignVertical: 'center'
  },
  actionsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: 30
  },
  makeOrderButton: {
    backgroundColor: '#2dbfc5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    textAlignVertical: 'center'
  },
});

export default SearchPage;
