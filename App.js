import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dayOfMonth, setDayOfMonth] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
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
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          });
          const data = await response.json();
          setApiData(data);
        } catch (error) {
          console.error(error);
        }
    }
    fetchData();
  }, []);
  console.log(apiData)
  return (
    <View style={styles.container}>
      <Text>For Tahazzud Salat:</Text>
      <Text style={styles.font}> Today the 1/3 (Lastthird) part of night will be at: </Text>
        {apiData && <Text style={styles.font}>{apiData.data[dayOfMonth-1].timings.Lastthird}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  font: {
    fontSize: 15,
    color: '#777'
  }
});
