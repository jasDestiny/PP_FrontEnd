import React from 'react'
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

export default function SchItem({ pressHandler, item }) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => pressHandler(item.key)}>
      <Text style={styles.texts}>{item.text}</Text>
      <MaterialIcons size={20} style={styles.icons} name="delete"/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
    flexDirection: 'row',
  },
  texts:{
    flexDirection: 'row',
    flex:5,
  },
  icons:{
    flexDirection: 'row',
    flex:1,
    color: '#777',
  },
});