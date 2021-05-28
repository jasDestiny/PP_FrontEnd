import React, { useState } from 'react';
import { StyleSheet, Image, TextInput, Button, View, FlatList, Alert, Text, TouchableOpacity ,TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import SchItem from './components/addTodo';
import Pheader from "./src/components/Pheader";
import { MaterialIcons } from "@expo/vector-icons";
import PomodoroTimer from "./src/components/pomodoroTimer";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'attend classes', key: '1' },
    { text: 'create an app', key: '2' },
    { text: 'read a book', key: '3' },
    { text: 'excercise', key: '4' },
  ]);
  const [pomoModal, openPomo]=useState(false);
  const closePomo=()=>{
    let x= pomoModal;
    x= !x;
    openPomo(x);
  }
  const [tierModal, openTier]=useState(false);
  const closeTier=()=>{
    let x= tierModal;
    x= !x;
    openTier(x);
  }

  const [signUp, closeSignup]= useState(true);
  const revSignUp=()=>{
    closeSignup(false);
  }
  



  const pressHandler = (key) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key != key);
    });
  };

  const submitHandler = (text) => {
    if(text.length > 3){
      setTodos(prevTodos => {
        return [
          { text, key: Math.random().toString() },
          ...prevTodos
        ];
      });
    } else {
      Alert.alert('OOPS', 'Item name must be over 3 characters long', [
        {text: 'Understood', onPress: () => console.log('alert closed') }
      ]);
    }
  };

  return (
      <View style={styles.container}>
      <Modal visible={pomoModal}>
        <View style={styles.pomo}>
        <MaterialIcons style={styles.closeButton} size={40} onPress={()=>closePomo()} name="arrow-back"/>
        <PomodoroTimer displayText={todos[0].text}/>
      </View>
      </Modal>
      <Modal visible={tierModal}>
        <View style={styles.tierList}>
          <MaterialIcons style={styles.tierBack} size={40} onPress={()=>closeTier()} name="arrow-back"/>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: 'https://i.redd.it/o7ojchld48e41.jpg',
            }}
          />
        </View>
      </Modal>
      <Modal visible={signUp}>
      <View style={styles.containerV}>
        <TextInput
          style={styles.inputV}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
        />
        <TextInput
          style={styles.inputV}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
        />
        <TextInput
          style={styles.inputV}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
        />
        <TextInput
          style={styles.inputV}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='white'
        />


        <TouchableOpacity onPress={()=>revSignUp()} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>SIGN UP LATER</Text>
        </TouchableOpacity>


      </View>
      </Modal>
        <Header />
        <View style={styles.content}>
          <SchItem submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
        <View style={styles.tierButtonContainer}> 
          <TouchableOpacity style={styles.editTierButtons} onPress={()=>closePomo()}>
            <Text style={styles.fFont}>
              OPEN POMODORO
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editTierButtons} onPress={()=>closeTier()}>
            <Text style={styles.fFont}>SEE TIER LIST</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
  pomo:{
    flex: 1,
    backgroundColor: "#E84C3D",
  },
  closeButton:{
    color:'white',
    backgroundColor: "#E84C3D",
  },
  tierButtonContainer:{
    flexDirection:'row',
  },
  editTierButtons:{
    flex:1,
    flexDirection:'row',
    backgroundColor: 'coral',
    padding: 6,
    color: 'white',
    margin: 8,
    justifyContent: 'center',
  },
  containerV:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputV:{
    width: 350,
    height: 55,
    backgroundColor: 'coral',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 20,
    fontSize: 18,
    fontWeight: '500',
    borderColor: 'red'
  },
  buttonV:{
    height: 50,
    color:'red',
  },
  appButtonContainer:{
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 30,
  },
  appButtonText:{
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  fFont:{
    color: 'white',
  },
  tierList:{
    backgroundColor:'black',
    flex: 1,
    flexDirection: 'column'
  },
  tierBack:{
    backgroundColor: 'black',
    color:'white'
  },
  tierElement:{
    flex: 1,
    flexDirection:'column',
  },
  tinyLogo:{
    height: 400,
    width: 500,
    marginTop: 100
  }

});