
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
// import Dashboard from './src/screens/dashbord'; 
import OrdersScreen from './src/screens/OrdersScreen';
import StartNewOrderScreen from './src/screens/StartNewOrderScreen';
import ReviewOrderScreen from './src/screens/ReviewOrderScreen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard">
          {/* Uncomment and add your screens here */}
          {/* <Stack.Screen
            name="StoreCard"
            component={StoreCard}
          />
          <Stack.Screen
            name="ItemsScreen"
            component={ItemsScreen}
          /> */}
          {/* <Stack.Screen
            name="Dashboard"
            component={Dashboard}
          /> */}
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="StartNewOrderScreen" component={StartNewOrderScreen} />
          <Stack.Screen name="ReviewOrderScreen" component={ReviewOrderScreen} />




        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
