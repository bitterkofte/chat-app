import { StyleSheet, Text, View } from 'react-native'
import { Title, Avatar, Subheading, Button } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { auth } from '../firebase';

const ChatSettings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setName(user.displayName);
      setEmail(user.email);
    })
  }, [])

  return (
    <View style={styles.settings}>
      <Avatar.Icon size={90} icon="account" />
      <Title style={styles.name}>{name.toUpperCase()}</Title>
      <Subheading>{email}</Subheading>
      <Button textColor='red' onPress={() => auth.signOut()}>Sign Out</Button>
    </View>
  )
}

export default ChatSettings

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  name: {
    fontWeight: 'bold',
  },


})