import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, TextInput, View, FlatList, Image } from 'react-native';
import AsyncStorage  from  '@react-native-async-storage/async-storage';




export default function App() {
  
  const [text, setText] = useState('');
  const [aika, setDate] = useState('');
  const [paikka, setLocation] = useState('');
  const [data, setData] = useState([]);
  const [titleText, setTitleText] = useState("Lintumuistio");

  useEffect(() => {
    // Nouda tallennetut linnut sovelluksen käynnistyessä
    getData();
  }, []);

  useEffect(() => {
    // Tallenna linnut aina kun data-muuttuja päivittyy
    saveData();
  }, [data]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('linnut');
      const savedData = JSON.parse(jsonValue);
      if (savedData) {
        setData(savedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveData = async () => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('linnut', jsonValue);
    } catch (error) {
      console.log(error);
    }
  };


  const buttonPressed = () => {
    const entry = {
      text: text,
      aika: aika,
      paikka: paikka
    };
    setData([...data,  entry ]);
    setText('');
    setDate('');
    setLocation('');
  };

  
  const clearButtonPressed = () => {
    setData(prevData => {
      const newData = [...prevData];
      newData.pop();
      return newData;
    
  });
};


  return (
    <View style={styles.container}>
      
      
      <StatusBar style="auto" />
      <Text style={styles.header}> {titleText} </Text>
      <Image style={styles.image} source={{uri: 'https://images.unsplash.com/photo-1597974540993-d50a6b955c2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'}} 
      />
      
   

      <View style={styles.inputContainer}>
      <TextInput style={styles.input}
       onChangeText={text => setText(text)}
      value={text}
      placeholder="Laji"
      />

      <TextInput
          style={styles.input}
          onChangeText={text => setDate(text)}
          value={aika}
          placeholder="Päivämäärä"
        />

      <TextInput
          style={styles.input}
          onChangeText={text => setLocation(text)}
          value={paikka}
          placeholder="Paikka"
        /> 
      </View>
      <View style={styles.button}>
      <Button onPress={buttonPressed} color='green' title="Lisää lintu"/>
      </View>
      <View style={styles.button2}>
      <Button onPress={clearButtonPressed} color="red" title="Poista viimeinen" />
      </View>

      <FlatList style={styles.list}
        data={data}
        renderItem={({item})  => (
          <View style={styles.listItem}>
          
          <Text> {item.text} </Text>
          
          <Text> {item.aika} </Text>
          
          <Text> {item.paikka} </Text>
          </View>
         )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  input : {
    marginTop: 10,
    marginBottom: 10,
    width: 105, 
    borderColor: 'black', 
    borderWidth: 1,
    flexDirection: 'row',
    
    
    
  },
  image : {
    marginTop: 5,
    width: 350,
    height: 115
    
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  listItem: {
    flexDirection: 'row',
    marginVertical: 10,
    marginBottom: 1,
    marginTop: 1,
    

  },
  list: {
    marginTop: 1,
    
    
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 3,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4
   
  },
  button2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4
    
  }

});
