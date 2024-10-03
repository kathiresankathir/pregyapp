import React from 'react';
import { View, Text, StyleSheet, ScrollView,Image } from 'react-native';

const GeneralReportscreen = ({ route }) => {
  const { reportItem } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header1} >
        <Image source={require('../../../src/images/img2.png')}/>
        </View>
        <View style={styles.header}>
          <Text style={styles.title1}>General Report </Text>
        </View>
       
      <View style={styles.reportBox}>

        {/* Report Date */}
        <View style={styles.section}>
          <Text style={styles.label}>Report Date:</Text>
          <Text style={styles.value}>{new Date(reportItem.date).toLocaleDateString()}</Text>
        </View>

        {/* Hemoglobin and Blood Data */}
        <View style={styles.section}>
          <Text style={styles.subTitle}>Hemoglobin and Blood Data</Text>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Difficulty in Breathing:</Text>
            <Text style={styles.value}>{reportItem.difficultyinbreathing }</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Feeling Tired:</Text>
            <Text style={styles.value}>{reportItem.feelingtired}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Chest Pain:</Text>
            <Text style={styles.value}>{reportItem.chestpain}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Palpitation:</Text>
            <Text style={styles.value}>{reportItem.palpitation }</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Indigestion:</Text>
            <Text style={styles.value}>{reportItem.indigestion}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Swelling in Legs:</Text>
            <Text style={styles.value}>{reportItem.swellinginlegs }</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>History of Bleeding:</Text>
            <Text style={styles.value}>{reportItem.bleedinghistory }</Text>
            {reportItem.bleedinghistory === '1' && (
              <>
                <Text style={styles.label}>Date of Bleeding:</Text>
                <Text style={styles.value}>{reportItem.bleedinghistorywhen}</Text>

                <Text style={styles.label}>Bleeding Managed By:</Text>
                <Text style={styles.value}>{reportItem.bleedinghistorymanage}</Text>
              </>
            )}
          </View>
        </View>

        {/* Medical and Surgery History */}
        <View style={styles.section}>
          <Text style={styles.subTitle}>Medical and Surgery History</Text>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Previous Surgeries:</Text>
            <Text style={styles.value}>{reportItem.surgeries}</Text>
            {reportItem.surgeries === '1' && (
              <>
                <Text style={styles.label}>Surgery Details:</Text>
                <Text style={styles.value}>{reportItem.surgeriesdetails}</Text>
              </>
            )}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Medical Illness:</Text>
            <Text style={styles.value}>{reportItem.medicalillness}</Text>
            {reportItem.medicalillness === '1' && (
              <>
                <Text style={styles.label}>Illness Details:</Text>
                <Text style={styles.value}>{reportItem.medicalillnessdetails}</Text>
              </>
            )}
          </View>
        </View>

        {/* Childbirth Details */}
        <View style={styles.section}>
          <Text style={styles.subTitle}>Childbirth Details</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Last Childbirth:</Text>
            <Text style={styles.value}>{reportItem.lastchildbirth}</Text>
          </View>
        </View>

     

      </View>
    </ScrollView>
  );
};

export default GeneralReportscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header1:{
 alignItems:'center'
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  reportBox: {
    backgroundColor: '#e8f5e9',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#119988',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  section: {
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 10,
  },
});
