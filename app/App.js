// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '/Users/ataesaggarwal/code/copycat/app/screens/HomeScreen.js';
// import AddToDatabase from './screens/HomeScreen.js';


// AppRegistry.registerComponent('X', () => App);

const navigator = createStackNavigator({
  Home: HomeScreen,
}, 
{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerShown: false 
  }
});

export default createAppContainer(navigator);

