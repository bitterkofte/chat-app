import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Settings, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons} from '@expo/vector-icons'
import { Provider } from 'react-native-paper';
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore'
import { auth } from './firebase';

import ChatList from './screens/ChatList';
import ChatSettings from './screens/ChatSettings';
import Chat from './screens/Chat';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

// const firebaseConfig = {
//   apiKey: "AIzaSyBTmQ2XEY3KGQRAlZH_GSEGJPW3rziDK0o",
//   authDomain: "chatter-d873d.firebaseapp.com",
//   projectId: "chatter-d873d",
//   storageBucket: "chatter-d873d.appspot.com",
//   messagingSenderId: "886973914506",
//   appId: "1:886973914506:web:233c02e19a4b23c3e8bc73"
// };

// firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {

  const navigation = useNavigation();
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(!user){navigation.navigate("SignUp")}
    });
    // const isLoggedIn = false;
    // if(!isLoggedIn){navigation.navigate('SignUp');}
  }, []);

  return (
    <Tabs.Navigator>
      <Tabs.Screen name='ChatList'component={ChatList} options={chatBubbles} />
      <Tabs.Screen name='Settings'component={ChatSettings} options={settings} />
    </Tabs.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider>
        <Stack.Navigator>

          <Stack.Screen name='Home'
            component={TabsNavigator}
            options={{headerShown: false}} />

          <Stack.Screen name='Chat' component={Chat} />
          <Stack.Screen name='SignUp' component={SignUp} options={full} />
          <Stack.Screen name='SignIn' component={SignIn} options={full} />
          
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

// const tabOptions = {

// }

const full = {presentation: 'fullScreenModal'}

const chatBubbles = {
  tabBarIcon: ({focused, color, size}) => {
    return <Ionicons 
            name={'chatbubbles'} 
            color={color} 
            size={size} />
  },
}

const settings = {
  tabBarIcon: ({focused, color, size}) => {
    return <Ionicons 
            name={'settings'} 
            color={color} 
            size={size} />
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
