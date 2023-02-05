import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {TextInput, Button, Subheading} from 'react-native-paper'
import React from 'react'
import firebase from 'firebase/app'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
// import "firebase/auth"
// import "firebase/firestore"

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const createAccount = async () => {
    setIsLoading(true);
    try {
      const response = await auth
        .createUserWithEmailAndPassword(email, password);
      await response.user.updateProfile({ displayName: name });
      navigation.popToTop();
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <View style={styles.signUp}>
      {!!error && (<Subheading style={styles.subheading}>{error}</Subheading>)}
      <TextInput label="Name" value={name} onChangeText={text => setName(text)} />
      <TextInput label="Email" value={email} onChangeText={text => setEmail(text)} style={styles.ti} keyboardType='email-address' />
      <TextInput label="Password" value={password} onChangeText={text => setPassword(text)} style={styles.ti} secureTextEntry/>

      <View style={styles.buttons}>
        <Button mode="outlined" onPress={() => navigation.navigate("SignIn")} >Sign In</Button>
        <Button mode='contained' onPress={()=>createAccount()} loading={isloading} >Register</Button>
      </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  signUp: {
    flex: 1,
    // alignItems: 'center',
    margin: 16,
    // width: '90%',
  },

  ti: {
    marginTop: 16,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  subheading: {
    color: "red",
    textAlign: "center",
    marginBottom: 16,
  }
})