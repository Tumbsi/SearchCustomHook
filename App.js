import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import useAbortableFetch from './hooks/useAbortableFetch';
import { ScrollView } from 'react-native-web';
import { API_URL } from '@env'; 

export default function App() {
  const [phrase, setPhrase] = useState('');
  const [url, setUrl] = useState(null);
  const { data, error, loading } = useAbortableFetch(url);

  const searchCocktails = (text) => {
    setPhrase(text);
    const address = API_URL + text;
    console.log('Fetching URL:', address);
    setUrl(address);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchbox}>
        <Text style={styles.heading}>Cocktails</Text>
        <TextInput
          style={styles.field}
          placeholder='Enter name...'
          value={phrase}
          onChangeText={text => searchCocktails(text)}
        />
      </View>
      <ScrollView>
        {
          data && data.drinks &&
          data.drinks.map(drink => (
            <Text key={drink.strDrink}>{drink.strDrink}</Text>
          ))
        }
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 90,
    margin: 8,
    alignItems: 'center'
  },
  searchbox: {
    width: '100%',
    padding: 16,
    alignItems: 'center'
  },
  heading: {
    fontSize: 40,
    marginTop: 16,
    marginBottom: 16,
  },
  field: {
    marginTop: 8,
    marginBottom: 16,
    width: '100%',
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4
  }
});