import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('Home');
  const [dayOfMonth, setDayOfMonth] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [city, setCity] = useState('Dhaka');
  const [country, setCountry] = useState('Bangladesh');

  useEffect(() => {
    const dayOfMonth = new Date().getDate();
    dayOfMonth && setDayOfMonth(dayOfMonth);
    const currentMonth = new Date().getMonth() + 1;
    currentMonth && setCurrentMonth(currentMonth);
    const currentYear = new Date().getFullYear();
    currentYear && setCurrentYear(currentYear);
    const city = 'Dhaka';
    const country = 'Bangladesh';
    const method = 3; // World Organization of Muslim League

    const fetchData = async () => {
      try {
        let url = `http://api.aladhan.com/v1/calendarByCity/${currentYear}/${currentMonth}?city=${city}&country=${country}&method=${method}`;
        const response = await fetch(url);
        const data = await response.json();
        setApiData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onBackPress = () => {
    // Handle navigation back press here
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.navbarContainer}>
          <TouchableOpacity onPress={onBackPress}>
            <Text style={styles.backButton}>&lt; Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          {/* You can add more components on the right if needed */}
        </View>
        {/* Content container */}
        <View style={styles.containerContent}>
          <Text style={styles.font}>For Tahazzud Salat:</Text>
          <Text style={styles.font}>
            Today the 1/3 (Last third) part of night will be at:
          </Text>
          {apiData && (
            <Text style={styles.font}>
              {apiData.data[dayOfMonth - 1].timings.Lastthird} AM
            </Text>
          )}
          <Text style={styles.font}>
            In City: {city} and country: {country}
          </Text>
          <StatusBar style="auto" />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerContent: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  font: {
    fontSize: 18,
    color: '#333',
    marginVertical: 10,
  },
  navbarContainer: {
    flexDirection: 'row',
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    color: '#fff',
    fontSize: 18,
  },
});
