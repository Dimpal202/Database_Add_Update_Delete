import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, TextInput } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
let db = openDatabase({ name: 'UserDatabase2.db' });
const AddData = ({ navigation }) => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');

    useEffect(() => {
        db.transaction((txn)=> {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
                 (tx, res)=> {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT,user_name VARCHAR(255), user_email VARCHAR(255))',
                            [],
                        );
                    }
                    else {
                        console.log("already created table")
                    }
                }
            );
        });
    }, []);

    const saveData = () => {
        // Alert.alert("hello")
        db.transaction((txn) => {
            txn.executeSql(
                'INSERT INTO table_user (user_name, user_email) VALUES (?,?)',
                [name, email],
                (tx, results) => {
                    if (results.rowsAffected == 1) {
                        navigation.navigate("Main")
                    } else {
                        console.log(results)
                    }
                },
                error => {
                    console.log(error);
                },
            );
        })
    }
    return (
        <View style={styles.Container} >
           <Text style={{ margin: 10, fontSize: 30 ,color:"white",textAlign:"center",}}>Add Data</Text>
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
                <TouchableOpacity onPress={() => saveData()}>
                    <Text style={styles.textnext}>Add</Text>
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


export default AddData;