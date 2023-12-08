import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ShortageList = () => {
  const [medicineData, setMedicineData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const rawData = `
      Pazenir, Paclitaxel
      Hycamtin, Topotecan
      Trulicity, Dulaglutide
      Nulojix, Belatacept
      Kevzara, Sarilumab
      Abraxane, Paclitaxel
      Saxenda, Liraglutide
      Tresiba, Insulin, Degludec
      Methotrexate, Methotrexate
      Victoza, Liraglutide
      Amoxicillin, Amoxicillin
      Insuman Rapid Basal and Comb 25, Insulin Human
      Rybelsus, Semaglutide
      Visudyne, Verteporfin
      Ixiaro, Japanese Encephalitis Vaccine Inactivated And Absorbed
      Metalyse, Tenecteplase
      Actilyse, Alteplase
      Menopur, Menotropin
      Zerbaxa, Ceftolozane / Tazobactam
      DepoCyte, Cytarabine
      Ozempic, Semaglutide
      Fasturtec, Rasburicase
      Cetrotide, Cetrorelix Acetate
      Orgalutran, Ganirelix
      Natpar, Parathyroid Hormone
      Champix, Varenicline
      RoActemra, Tocilizumab
      Vfend, Voriconazole
      Respreeza, Human Alpha1-Proteinase Inhibitor
      Nucala, Mepolizumab
      Cinryze, C1 Inhibitor, Human
      Tygacil, Tigecycline
      Maci, Matrix Applied Characterised Autologous Cultured Chondrocytes
      Cerezyme, Imiglucerase
      Trisenox, Arsenic Trioxide
      Arixtra, Fondaparinux Sodium
      Cinryze, Dibotermin Alfa
      Inductos, Insulin Human
      Insuman Basal and Comb 25, Docetaxel
      Taxotere, Agalsidase Beta
      Fabrazyme, Insulin Human
      Inductos, Dibotermin Alfa
      Xofigo, Radium-223 Dichloride
      Buccolam, Midazolam
      Enbrel, Etanercept
      Increlex, Mecasermin
      Vistide, Cidofovir
    `;
    const rows = rawData.trim().split('\n').map(row => row.trim().split(', '));
    const sortedData = rows.sort((a, b) => a[0].localeCompare(b[0]));

    const dataWithStatus = sortedData.map(item => [item[0], item[1], 'In Shortage']);
    setMedicineData(dataWithStatus);
  }, []);

  const filteredData = medicineData.filter(
    item =>
      item[0].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item[1].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>Medicine Shortage List</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for medicine..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <View style={styles.tableHeader}>
          <Text style={styles.tableCell}>Medicine Name</Text>
          <Text style={styles.tableCell}>Molecule Name</Text>
          <Text style={styles.tableCell}>Status</Text>
        </View>
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item[0]}</Text>
              <Text style={styles.tableCell}>{item[1]}</Text>
              <Text style={styles.tableCell}>{item[2]}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#2dbfc5',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  tableCell: {
    flex: 1,
    padding: 8,
  },
});

export default ShortageList;
