import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { List, Avatar, Divider, FAB, Portal, Dialog, Button, TextInput } from 'react-native-paper'
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore'
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { QuerySnapshot } from 'firebase/firestore';


const ChatList = () => {
  
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSecondary, setEmailSecondary] = useState('');
  const [chats, setChats] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    // db.collection("chats").add({
    //   users: ['first@gmail.com', 'second@gmail.com'],
    auth.onAuthStateChanged((user) => {
      setEmail(user.email ?? "");
    })
  }, []);

  const createChat = () => {
    if(!email || !emailSecondary) return;
    db.collection("chats").add({users:[email, emailSecondary]})
    setIsDialogVisible(false);
    navigation.navigate('Chat');
  }

  useEffect(() => {
    return db.collection("chats").where('users', 'array-contains', email).onSnapshot((QuerySnapshot) => {
      console.warn(querySnapshot.docs.map((x) => x.data().users));
    });
  }, [email])

  return (
    <View style={{flex: 1}} >

      {chats.map(chat => (
        <>
          <List.Item
            title={chat.data().useers.find(x => x !== email)}
            description="Item description"
            left={() => <Avatar.Icon size={55} icon="account" />}
          />
          <Divider bold />
        </>
      ))}

      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={()=>setIsDialogVisible(false)}>
          <Dialog.Title>New Chat</Dialog.Title>
          <Dialog.Content>
            <TextInput label='Enter User Mail' value={emailSecondary} onChangeText={text => setEmailSecondary} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={()=>createChat()}>Save</Button>
            <Button onPress={()=>setIsDialogVisible(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB 
        icon='account-plus'
        style={styles.fab}
        onPress={() => setIsDialogVisible(true)} />
    </View>
  )
}

export default ChatList;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
})