import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, TextInput } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
let db = openDatabase({ name: 'UserDatabase2.db' });
// import {useRoute}from '@react-navigation/native';

const UpdateData = ({ navigation ,route}) => {
  // const route = useRoute();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');

  useEffect(() => {
    setname(route.params.data.name);
    setemail(route.params.data.email);
  }, []);

  const Update=()=>{
    db.transaction((txn) => {
      txn.executeSql(
        'UPDATE table_user set user_name=?, user_email=? where user_id=?',
          [name, email, route.params.data.id],
          (tx, results) => {
            navigation.navigate("Main");
          },
      );
  })
  }
  return (
    <View style={styles.Container} >
       <Text style={{ margin: 10, fontSize: 30 ,color:"white",textAlign:"center",}}>UpdateData</Text>
      <View>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={txt => setname(txt)}
          placeholder="Enter Name"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={txt => setemail(txt)}
          placeholder="Enter Email"
        />
      </View>
      <View style={styles.buttonnext}>
        <TouchableOpacity onPress={()=>{
          Update();
        }}>
          <Text style={styles.textnext}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#04023c",
    flex: 1,
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    padding:12,
    backgroundColor: "white"
  },
  buttonnext: {
    backgroundColor: "#87CEEB",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  textnext: {
    fontSize: 20,
    margin: 10
  }
});


export default UpdateData;