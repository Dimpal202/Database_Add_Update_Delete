import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

let db = openDatabase({ name: 'UserDatabase2.db' });

const Main = ({ navigation }) => {
  const [userlist, setuserlist] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    db.transaction((txn) => {
      txn.executeSql(
        'SELECT * FROM table_user',
        [],
        (tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            // console.log(results.rows.item(i))
            temp.push(results.rows.item(i));
          setuserlist(temp);
        }
      );
    });
  }

  const UserDelete = (id) => {
    db.transaction((txn) => {
      txn.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [id],
        (tx, results) => {
          getData();
        },
      );
    })
  }
  return (
    <View style={styles.Container} >
      <Text style={{ margin: 10, fontSize: 30 ,color:"white",textAlign:"center",}}>main</Text>
      <FlatList
        keyExtractor={(item) => item.user_id}
        data={userlist}
        renderItem={({ item }) => (
          <View style={styles.nameemailview}>
            <TouchableOpacity  >
              <Text style={styles.nametxt}>{'Name:' + item.user_name}</Text>
              <Text style={styles.nametxt}>{'Email:' + item.user_email}</Text>
            </TouchableOpacity>
            <View style={styles.editdeleteview}>
              <TouchableOpacity onPress={()=>{
                navigation.navigate("UpdateData",{
                  data:{
                    name:item.user_name,
                    email:item.user_email,
                    id:item.user_id,
                  }
                })
              }}>
                <Text style={styles.textedit}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                UserDelete(item.user_id);
              }}>
                <Text style={styles.textedit}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.buttonnext}>
        <TouchableOpacity onPress={() => navigation.navigate("AddData")}>
          <Text style={styles.textnext}>AddData</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#04023c",
    flex: 1
  },
  nameemailview: {
    margin: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius:10
  },
  nametxt: {
    fontSize: 20,
    fontWeight:"bold"
  },
  editdeleteview: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    backgroundColor: "#87CEEB",
    borderRadius:10,
    padding:10
  },
  textedit: {
    fontSize: 20,
    fontWeight: "bold"
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
  },
});


export default Main;